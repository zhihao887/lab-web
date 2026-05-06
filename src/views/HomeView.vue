<template>
  <section class="hero-section">
    <HeroVisual />
    <div class="hero-content">
      <p class="eyebrow">BioAI · Drug Discovery · Medical Imaging</p>
      <h1>面向生命健康问题的智能计算实验室</h1>
      <p class="hero-lede">
        智能医学与生物计算实验室围绕蛋白质设计、药物发现、医学影像、舌象多模态理解与生物分子交互预测，建设可复现、可解释、可验证的科研体系。
      </p>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/publications">查看研究成果</RouterLink>
        <RouterLink class="button secondary" to="/resources">资源与演示</RouterLink>
      </div>
    </div>
  </section>

  <section class="stats-band" aria-label="实验室概览">
    <div v-for="item in stats" :key="item.label" class="stat-item">
      <strong>{{ item.value }}</strong>
      <span>{{ item.label }}</span>
    </div>
  </section>

  <section class="section narrative-section">
    <div>
      <p class="eyebrow">Positioning</p>
      <h2>科研展示优先，兼顾资源与演示入口</h2>
    </div>
    <p>
      首版官网聚焦实验室的研究方向、代表成果、项目档案和团队信息。资源页用于集中承载数据集、代码、模型演示和流程文档入口；医学相关演示仅用于科研展示，不用于临床决策。
    </p>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Research</p>
        <h2>核心研究方向</h2>
      </div>
      <RouterLink to="/publications">全部成果</RouterLink>
    </div>
    <div class="research-grid">
      <RouterLink v-for="area in researchAreas" :key="area.slug" :to="`/research/${area.slug}`" class="research-card">
        <span class="card-eyebrow">{{ area.eyebrow }}</span>
        <h3>{{ area.title }}</h3>
        <p>{{ area.description }}</p>
        <div class="tag-row">
          <span v-for="metric in area.metrics" :key="metric">{{ metric }}</span>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="section accent-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Publications</p>
        <h2>精选成果</h2>
      </div>
      <RouterLink to="/publications">成果检索</RouterLink>
    </div>
    <div class="publication-list compact-list">
      <RouterLink v-for="pub in featuredPublications" :key="pub.id" :to="`/publications/${pub.id}`" class="publication-item">
        <div>
          <span class="pub-meta">{{ pub.year }} · {{ pub.tag }}</span>
          <h2>{{ pub.title }}</h2>
          <p class="authors">{{ pub.authors }}</p>
          <p>{{ pub.abstract }}</p>
        </div>
        <span class="button secondary small">详情</span>
      </RouterLink>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Projects</p>
        <h2>重点项目</h2>
      </div>
      <RouterLink to="/projects">全部项目</RouterLink>
    </div>
    <div class="projects-grid compact-projects">
      <RouterLink v-for="project in highlightedProjects" :key="project.id" :to="`/projects/${project.id}`" class="project-card">
        <div class="project-visual" :class="`accent-${project.accent}`">
          <span class="matrix-cell c1"></span>
          <span class="matrix-cell c2"></span>
          <span class="matrix-cell c3"></span>
          <span class="matrix-cell c4"></span>
          <i></i>
        </div>
        <div class="project-body">
          <span class="status">{{ project.status }}</span>
          <h2>{{ project.title }}</h2>
          <p>{{ project.problem }}</p>
          <div class="tag-row">
            <span v-for="tag in project.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <p class="eyebrow">Resources</p>
      <h2>数据、代码、演示与文档集中管理</h2>
      <p>
        资源页先以静态入口形式呈现，公开状态清晰标注。后续可逐步替换为真实数据集、开源仓库、模型演示或下载文档。
      </p>
      <RouterLink class="button primary" to="/resources">进入资源页</RouterLink>
    </div>
    <div class="resource-preview-grid">
      <RouterLink v-for="item in resourcePreview" :key="item.id" to="/resources" class="resource-preview">
        <span class="status">{{ item.status }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </RouterLink>
    </div>
  </section>

  <section class="section accent-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Updates</p>
        <h2>最新动态</h2>
      </div>
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

  <section class="section cta-section">
    <div>
      <p class="eyebrow">Join Us</p>
      <h2>欢迎加入智能医学与生物计算研究</h2>
      <p>如果你对深度学习、生物信息、药物发现、医学影像或多模态学习感兴趣，可以从长期研究助理、学生科研或合作项目开始。</p>
    </div>
    <RouterLink class="button primary" to="/join">了解加入方式</RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroVisual from '../components/HeroVisual.vue'
import { newsItems, projects, publications, researchAreas, resources, stats } from '../data/siteData'

const latestNews = computed(() => newsItems.slice(0, 3))
const featuredPublications = computed(() => publications.filter((item) => item.featured).slice(0, 3))
const highlightedProjects = computed(() => projects.slice(0, 4))
const resourcePreview = computed(() => resources.slice(0, 4))

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(new Date(value))
</script>
