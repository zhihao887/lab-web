<template>
  <section class="hero-section">
    <HeroVisual />
    <div class="hero-content">
      <p class="eyebrow">BioAI · Drug Discovery · Medical Imaging</p>
      <h1>面向蛋白质设计、药物发现与医学影像的智能计算</h1>
      <p class="hero-lede">
        智能医学与生物计算实验室聚焦靶点特异性蛋白生成、天然分子筛选、药物-靶标亲和力预测、医学图像分类与开放世界舌象多模态理解。
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
      <h2>从分子表征到医学智能的研究闭环</h2>
      <p>
        团队围绕数据表征、动态融合、生成建模和可信评测推进长期课题，让算法假设能够落到可复现的实验流程与可解释的验证结果中。
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
