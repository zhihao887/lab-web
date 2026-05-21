<template>
  <section class="admin-page">
    <div class="admin-page-head">
      <div>
        <p class="admin-kicker">Settings</p>
        <h1>首页与站点基础信息</h1>
      </div>
    </div>

    <p v-if="!isSupabaseConfigured" class="admin-alert">
      当前只显示静态备用数据。配置 Supabase 后才能保存。
    </p>
    <p v-if="message" class="admin-success">{{ message }}</p>
    <p v-if="error" class="admin-alert">{{ error }}</p>

    <div class="admin-workspace single">
      <section class="admin-panel admin-editor-panel">
        <form class="admin-edit-form" @submit.prevent="saveSiteInfo">
          <label>
            <span>中文名称</span>
            <input v-model="form.name" type="text" required />
          </label>
          <label>
            <span>英文名称</span>
            <input v-model="form.nameEn" type="text" />
          </label>
          <label>
            <span>副标题</span>
            <textarea v-model="form.subtitle" rows="4"></textarea>
          </label>
          <label>
            <span>邮箱</span>
            <input v-model="form.email" type="email" />
          </label>
          <label>
            <span>位置</span>
            <input v-model="form.location" type="text" />
          </label>

          <button class="admin-primary-button" type="submit" :disabled="saving || !isSupabaseConfigured">
            {{ saving ? '保存中...' : '保存站点信息' }}
          </button>
        </form>
      </section>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { loadPublishedContent, siteInfo } from '../../services/contentStore'
import { isSupabaseConfigured, supabase } from '../../services/supabaseClient'

const form = reactive({ ...siteInfo })
const saving = ref(false)
const message = ref('')
const error = ref('')

const saveSiteInfo = async () => {
  saving.value = true
  message.value = ''
  error.value = ''

  try {
    const { error: saveError } = await supabase.from('content_entries').upsert(
      {
        content_type: 'siteInfo',
        entry_key: 'default',
        data: { ...form },
        status: 'published',
        sort_order: 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'content_type,entry_key' },
    )
    if (saveError) throw saveError
    await loadPublishedContent()
    message.value = '站点信息已保存。'
  } catch (err) {
    error.value = err.message || '保存失败。'
  } finally {
    saving.value = false
  }
}
</script>
