<template>
  <section class="admin-page">
    <div class="admin-page-head">
      <div>
        <p class="admin-kicker">Content</p>
        <h1>{{ module.title }}管理</h1>
      </div>
      <button class="admin-primary-button" type="button" :disabled="loading" @click="newItem">新增{{ module.singular }}</button>
    </div>

    <p v-if="!isSupabaseConfigured" class="admin-alert">
      当前只显示静态备用数据。配置 Supabase 后，保存、删除和上传才会生效。
    </p>
    <p v-if="message" class="admin-success">{{ message }}</p>
    <p v-if="error" class="admin-alert">{{ error }}</p>

    <div class="admin-workspace">
      <section class="admin-panel admin-list-panel">
        <div class="admin-toolbar">
          <input v-model.trim="query" type="search" placeholder="搜索标题、姓名、摘要或负责人" />
          <button type="button" :disabled="loading" @click="loadItems">刷新</button>
        </div>

        <div class="admin-table">
          <button
            v-for="entry in filteredEntries"
            :key="entry.entry_key"
            type="button"
            class="admin-row-button"
            :class="{ active: selectedKey === entry.entry_key }"
            @click="selectEntry(entry)"
          >
            <span>
              <strong>{{ entry.data[module.summaryField] || entry.entry_key }}</strong>
              <small>{{ entry.entry_key }}</small>
            </span>
            <em :class="entry.localOnly ? 'draft' : entry.status">{{ entry.localOnly ? '未保存' : entry.status }}</em>
          </button>
        </div>
      </section>

      <section class="admin-panel admin-editor-panel">
        <div class="admin-editor-head">
          <div>
            <h2>{{ selectedKey ? '编辑内容' : '新增内容' }}</h2>
            <p>修改当前内容后点“保存”。“复制并新增”只用于把当前记录复制成另一条新内容。</p>
          </div>
          <div class="admin-status-bar" :class="statusState">
            <span>状态</span>
            <strong>{{ statusLabel }}</strong>
          </div>
        </div>

        <form class="admin-edit-form" @submit.prevent="save">
          <div class="admin-form-grid">
            <label class="admin-id-field">
              <span>系统编号</span>
              <strong class="admin-id-note">{{ entryKey || '保存时自动生成' }}</strong>
            </label>
            <label>
              <span>排序</span>
              <input v-model.number="sortOrder" type="number" min="0" />
            </label>
          </div>

          <template v-for="field in module.fields" :key="field.name">
            <label v-if="field.type === 'checkbox'" class="admin-check-field">
              <input v-model="form[field.name]" type="checkbox" />
              <span>
                {{ field.label }}
                <small v-if="field.help">{{ field.help }}</small>
              </span>
            </label>

            <label v-else>
              <span>{{ field.label }}</span>
              <textarea
                v-if="field.type === 'textarea'"
                v-model="form[field.name]"
                :required="field.required"
                rows="5"
              ></textarea>
              <select v-else-if="field.type === 'select'" v-model="form[field.name]" :required="field.required">
                <option value="">请选择</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <textarea
                v-else-if="field.type === 'list'"
                :value="listToText(form[field.name])"
                rows="4"
                placeholder="每行一项"
                @input="form[field.name] = textToList($event.target.value)"
              ></textarea>
              <input
                v-else
                v-model="form[field.name]"
                :type="field.type || 'text'"
                :required="field.required"
              />
              <small v-if="field.help" class="admin-field-help">{{ field.help }}</small>
            </label>

            <div v-if="field.upload" class="admin-upload-row">
              <input :accept="field.upload === 'image' ? 'image/*' : undefined" type="file" @change="upload($event, field)" />
              <button
                v-if="form[field.name]"
                class="admin-inline-danger"
                type="button"
                @click="removeUploadedAsset(field)"
              >
                移除{{ field.upload === 'image' ? '图片' : '文件' }}
              </button>
              <small>上传后会自动填入 {{ field.label }}</small>
            </div>
          </template>

          <div class="admin-editor-actions">
            <button class="admin-primary-button" type="submit" :disabled="saving || loading || !isSupabaseConfigured">
              {{ saving ? '保存中...' : '保存' }}
            </button>
            <button class="admin-secondary-button" type="button" @click="duplicateSelected">复制并新增</button>
            <button class="admin-danger-button" type="button" :disabled="!selectedKey || !isSupabaseConfigured" @click="remove">
              删除
            </button>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  adminModules,
  deleteAdminAsset,
  deleteAdminEntry,
  listAdminEntries,
  saveAdminEntry,
  uploadAdminAsset,
} from '../../services/adminContentService'
import { isSupabaseConfigured } from '../../services/supabaseClient'

const route = useRoute()
const entries = ref([])
const selectedKey = ref('')
const entryKey = ref('')
const status = ref('published')
const sortOrder = ref(0)
const query = ref('')
const loading = ref(false)
const saving = ref(false)
const isDirty = ref(false)
const suppressDirty = ref(false)
const error = ref('')
const message = ref('')
const form = reactive({})

const module = computed(() => adminModules[route.meta.contentType])

const filteredEntries = computed(() => {
  const needle = query.value.toLowerCase()
  if (!needle) return entries.value

  return entries.value.filter((entry) => JSON.stringify(entry.data).toLowerCase().includes(needle))
})

const statusState = computed(() => {
  if (saving.value) return 'saving'
  if (isDirty.value) return 'dirty'
  return 'published'
})

const statusLabel = computed(() => {
  if (saving.value) return '保存中'
  if (isDirty.value) return '修改中'
  return '已发布'
})

const blankFormData = () => {
  const data = {}
  module.value.fields.forEach((field) => {
    if (field.type === 'checkbox') data[field.name] = false
    else if (field.type === 'list') data[field.name] = []
    else data[field.name] = ''
  })
  return data
}

const resetForm = (data = {}, dirty = false) => {
  suppressDirty.value = true
  Object.keys(form).forEach((key) => delete form[key])
  module.value.fields.forEach((field) => {
    if (field.type === 'checkbox') form[field.name] = Boolean(data[field.name])
    else if (field.type === 'list') form[field.name] = Array.isArray(data[field.name]) ? [...data[field.name]] : []
    else form[field.name] = data[field.name] ?? ''
  })
  nextTick(() => {
    suppressDirty.value = false
    isDirty.value = dirty
  })
}

const selectEntry = (entry) => {
  suppressDirty.value = true
  selectedKey.value = entry.entry_key
  entryKey.value = entry.entry_key
  status.value = entry.status || 'published'
  sortOrder.value = entry.sort_order ?? 0
  if (!entry.localOnly) entry.dirty = false
  resetForm(entry.data, Boolean(entry.localOnly && entry.dirty))
}

const makeKey = (data) => {
  const raw = data.id || data.name || data.title || `${module.value.keyPrefix}-${Date.now()}`
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const nextEntryKey = () => {
  const prefix = module.value.keyPrefix
  const pattern = new RegExp(`^${prefix}-(\\d+)$`)
  const existingKeys = new Set(entries.value.map((entry) => String(entry.entry_key)))
  const maxNumber = entries.value.reduce((max, entry) => {
    const match = String(entry.entry_key).match(pattern)
    if (!match) return max
    return Math.max(max, Number(match[1]) || 0)
  }, 0)

  let nextNumber = maxNumber + 1
  let key = `${prefix}-${String(nextNumber).padStart(3, '0')}`

  while (existingKeys.has(key)) {
    nextNumber += 1
    key = `${prefix}-${String(nextNumber).padStart(3, '0')}`
  }

  return key
}

const newItem = () => {
  if (loading.value) return
  suppressDirty.value = true
  const nextIndex = entries.value.length + 1
  const key = nextEntryKey()
  const draft = {
    content_type: route.meta.contentType,
    entry_key: key,
    data: blankFormData(),
    status: 'published',
    sort_order: nextIndex - 1,
    localOnly: true,
    dirty: true,
  }
  entries.value = [draft, ...entries.value]
  selectEntry(draft)
}

const duplicateSelected = () => {
  if (loading.value) return
  const key = nextEntryKey()
  const draft = {
    content_type: route.meta.contentType,
    entry_key: key,
    data: normalizedData(),
    status: 'published',
    sort_order: entries.value.length,
    localOnly: true,
    dirty: true,
  }
  entries.value = [draft, ...entries.value]
  selectEntry(draft)
}

const loadItems = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    entries.value = await listAdminEntries(route.meta.contentType)
    if (entries.value.length) selectEntry(entries.value[0])
    else newItem()
  } catch (err) {
    error.value = err.message || '加载失败。'
  } finally {
    loading.value = false
  }
}

const normalizedData = () => {
  const data = {}
  module.value.fields.forEach((field) => {
    data[field.name] = form[field.name]
  })

  const idField = module.value.idField
  if (idField && !data[idField]) data[idField] = entryKey.value || makeKey(data)
  return data
}

const syncSelectedLocalEntry = () => {
  if (!selectedKey.value) return
  const entry = entries.value.find((item) => item.entry_key === selectedKey.value)
  if (!entry) return
  if (!entry.localOnly) return

  entry.data = normalizedData()
  entry.sort_order = Number(sortOrder.value) || 0
  entry.dirty = true
}

const save = async () => {
  if (loading.value) return
  saving.value = true
  error.value = ''
  message.value = ''

  try {
    const data = normalizedData()
    const key = entryKey.value || makeKey(data)
    await saveAdminEntry({
      contentType: route.meta.contentType,
      entryKey: key,
      data,
      status: 'published',
      sortOrder: Number(sortOrder.value) || 0,
    })
    status.value = 'published'
    message.value = '已保存，内容已同步到前台。'
    await loadItems()
    const savedEntry = entries.value.find((entry) => entry.entry_key === key)
    if (savedEntry) selectEntry(savedEntry)
    else selectedKey.value = key
    isDirty.value = false
  } catch (err) {
    error.value = err.message || '保存失败。'
  } finally {
    saving.value = false
  }
}

const remove = async () => {
  if (!selectedKey.value) return
  const ok = window.confirm(`确认删除 ${selectedKey.value}？`)
  if (!ok) return

  try {
    const currentEntry = entries.value.find((entry) => entry.entry_key === selectedKey.value)
    if (currentEntry?.localOnly) {
      entries.value = entries.value.filter((entry) => entry.entry_key !== selectedKey.value)
      message.value = '未保存内容已移除。'
      if (entries.value.length) selectEntry(entries.value[0])
      else newItem()
      return
    }

    await deleteAdminEntry({ contentType: route.meta.contentType, entryKey: selectedKey.value })
    message.value = '已删除。'
    await loadItems()
  } catch (err) {
    error.value = err.message || '删除失败。'
  }
}

const upload = async (event, field) => {
  const file = event.target.files?.[0]
  if (!file) return

  try {
    const url = await uploadAdminAsset({ file, contentType: route.meta.contentType })
    form[field.name] = url
    message.value = '文件已上传，URL 已填入表单。'
  } catch (err) {
    error.value = err.message || '上传失败。'
  } finally {
    event.target.value = ''
  }
}

const removeUploadedAsset = async (field) => {
  const currentUrl = form[field.name]
  const ok = window.confirm(`确认移除${field.label}？`)
  if (!ok) return

  try {
    const deleted = await deleteAdminAsset(currentUrl)
    form[field.name] = ''
    message.value = deleted ? '文件已从 Storage 删除。请点击保存同步当前内容。' : '字段已清空。请点击保存同步当前内容。'
  } catch (err) {
    error.value = err.message || '移除失败。'
  }
}

const listToText = (value) => (Array.isArray(value) ? value.join('\n') : '')
const textToList = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean)

watch(
  form,
  () => {
    if (!suppressDirty.value) {
      isDirty.value = true
      syncSelectedLocalEntry()
    }
  },
  { deep: true },
)

watch(sortOrder, () => {
  if (!suppressDirty.value) {
    isDirty.value = true
    syncSelectedLocalEntry()
  }
})

watch(
  () => route.meta.contentType,
  () => {
    suppressDirty.value = true
    query.value = ''
    selectedKey.value = ''
    entryKey.value = ''
    status.value = 'published'
    sortOrder.value = 0
    resetForm({})
    loadItems()
  },
  { immediate: true },
)
</script>
