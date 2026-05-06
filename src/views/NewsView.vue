<template>
  <PageHero
    eyebrow="News"
    title="实验室动态"
    description="跟踪研究发布、学术活动、成果接收与招募信息。"
  />

  <section class="section">
    <div class="chip-filter" aria-label="新闻分类筛选">
      <button
        v-for="item in categories"
        :key="item.id"
        type="button"
        :class="{ active: category === item.id }"
        @click="category = item.id"
      >
        {{ item.label }} <span>{{ item.count }}</span>
      </button>
    </div>

    <div v-if="filteredNews.length" class="news-list">
      <article v-for="item in filteredNews" :key="item.id" class="news-card">
        <div class="news-visual" :class="`news-visual-${item.category}`">
          <span>{{ categoryLabel(item.category) }}</span>
        </div>
        <div class="news-body">
          <div class="news-meta">
            <span>{{ categoryLabel(item.category) }}</span>
            <time>{{ formatDate(item.date) }}</time>
          </div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.excerpt }}</p>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <h2>暂无动态</h2>
      <p>该分类下暂时没有内容。</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { newsItems } from '../data/siteData'

const category = ref('all')

const labels = {
  all: '全部',
  research: '研究',
  recruiting: '招募',
  event: '活动',
  achievement: '成果',
}

const categories = computed(() => {
  const base = [{ id: 'all', label: labels.all, count: newsItems.length }]
  const rest = Object.entries(labels)
    .filter(([id]) => id !== 'all')
    .map(([id, label]) => ({ id, label, count: newsItems.filter((item) => item.category === id).length }))
  return [...base, ...rest]
})

const filteredNews = computed(() =>
  category.value === 'all' ? newsItems : newsItems.filter((item) => item.category === category.value),
)

const categoryLabel = (value) => labels[value] || value
const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))
</script>
