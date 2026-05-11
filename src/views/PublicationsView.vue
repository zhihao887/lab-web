<template>
  <section class="section">
    <div class="filter-bar">
      <label class="search-field">
        <span>搜索</span>
        <input v-model.trim="query" type="search" placeholder="标题、作者、会议或期刊" />
      </label>
      <label>
        <span>年份</span>
        <select v-model="year">
          <option value="">全部年份</option>
          <option v-for="item in years" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
      <label>
        <span>类型</span>
        <select v-model="type">
          <option value="">全部类型</option>
          <option value="conference">会议</option>
          <option value="journal">期刊</option>
          <option value="preprint">预印本</option>
        </select>
      </label>
    </div>

    <div class="chip-filter" aria-label="成果标签筛选">
      <button type="button" :class="{ active: tag === '' }" @click="tag = ''">全部</button>
      <button v-for="item in tags" :key="item" type="button" :class="{ active: tag === item }" @click="tag = item">
        {{ item }}
      </button>
    </div>

    <div v-if="filteredPublications.length" class="publication-list">
      <article
        v-for="pub in filteredPublications"
        :key="pub.id"
        class="publication-item"
      >
        <div>
          <span class="pub-meta">{{ pub.year }} · {{ typeLabel(pub.type) }} · {{ pub.tag }}</span>
          <h2>{{ pub.title }}</h2>
          <p class="authors">{{ pub.authors }}</p>
          <p>{{ pub.abstract }}</p>
          <div class="tag-row publication-links">
            <span>{{ pub.paper ? 'Paper 可访问' : 'Paper 建设中' }}</span>
            <span>{{ pub.pdf ? 'PDF 可访问' : 'PDF 建设中' }}</span>
            <span>{{ pub.code ? 'Code 可访问' : 'Code 建设中' }}</span>
            <span>{{ pub.dataset ? 'Dataset 可访问' : 'Dataset 建设中' }}</span>
          </div>
        </div>
        <div class="publication-actions">
          <a
            v-if="pub.paper"
            class="button secondary small"
            :href="pub.paper"
            target="_blank"
            rel="noopener noreferrer"
          >
            Paper
          </a>
          <RouterLink class="button secondary small" :to="`/publications/${pub.id}`">查看详情</RouterLink>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <h2>暂无匹配成果</h2>
      <p>请调整搜索词、年份、类型或标签。</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { publications } from '../data/siteData'

const query = ref('')
const year = ref('')
const type = ref('')
const tag = ref('')

const years = computed(() => [...new Set(publications.map((item) => item.year))].sort((a, b) => b.localeCompare(a)))
const tags = computed(() => [...new Set(publications.map((item) => item.tag))])

const filteredPublications = computed(() => {
  const search = query.value.toLowerCase()
  return publications.filter((item) => {
    const haystack = `${item.title} ${item.authors} ${item.venue} ${item.abstract}`.toLowerCase()
    return (
      (!search || haystack.includes(search)) &&
      (!year.value || item.year === year.value) &&
      (!type.value || item.type === type.value) &&
      (!tag.value || item.tag === tag.value)
    )
  })
})

const typeLabel = (value) => {
  const labels = {
    conference: '会议',
    journal: '期刊',
    preprint: '预印本',
  }
  return labels[value] || value
}
</script>
