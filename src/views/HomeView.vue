<template>
  <section class="hero-section">
    <HeroVisual />
    <div class="hero-content">
      <p class="eyebrow">Medical AI · Clinical Decision · Research Platform</p>
      <h1>构建可信、可用、可落地的医学人工智能</h1>
      <p class="hero-lede">
        医智矩阵实验室聚焦医学大模型、多模态电子病历、临床决策支持与 AI for Science 工具链，让模型能力进入可审阅的真实医疗流程。
      </p>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/publications">查看研究成果</RouterLink>
        <RouterLink class="button secondary" to="/join">加入我们</RouterLink>
      </div>
    </div>
  </section>

  <section class="stats-band" aria-label="实验室概览">
    <div v-for="item in stats" :key="item.label" class="stat-item">
      <strong>{{ item.value }}</strong>
      <span>{{ item.label }}</span>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Research</p>
      <h2>核心研究方向</h2>
      <RouterLink to="/publications">全部成果</RouterLink>
    </div>
    <div class="research-grid">
      <article v-for="area in researchAreas" :key="area.slug" class="research-card">
        <span class="card-eyebrow">{{ area.eyebrow }}</span>
        <h3>{{ area.title }}</h3>
        <p>{{ area.description }}</p>
        <div class="tag-row">
          <span v-for="metric in area.metrics" :key="metric">{{ metric }}</span>
        </div>
      </article>
    </div>
  </section>

  <section class="section accent-section">
    <div class="section-heading">
      <p class="eyebrow">Updates</p>
      <h2>最新动态</h2>
      <RouterLink to="/news">全部动态</RouterLink>
    </div>
    <div class="news-preview-grid">
      <RouterLink v-for="item in latestNews" :key="item.id" class="news-preview" to="/news">
        <time>{{ formatDate(item.date) }}</time>
        <h3>{{ item.title }}</h3>
        <p>{{ item.excerpt }}</p>
      </RouterLink>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <p class="eyebrow">Publications</p>
      <h2>从论文到平台的医学 AI 研究闭环</h2>
      <p>
        团队同时推进基础模型评测、临床预测建模和面向医生的产品原型，用工程化方式缩短研究与临床实践之间的距离。
      </p>
      <RouterLink class="button primary" to="/projects">浏览项目</RouterLink>
    </div>
    <div class="publication-stack">
      <article v-for="pub in featuredPublications" :key="pub.id">
        <span>{{ pub.year }} · {{ pub.tag }}</span>
        <h3>{{ pub.title }}</h3>
        <p>{{ pub.venue }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroVisual from '../components/HeroVisual.vue'
import { newsItems, publications, researchAreas, stats } from '../data/siteData'

const latestNews = computed(() => newsItems.slice(0, 3))
const featuredPublications = computed(() => publications.filter((item) => item.featured).slice(0, 2))

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(new Date(value))
</script>
