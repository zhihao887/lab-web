<template>
  <section class="hero-section">
    <HeroVisual />
    <div class="hero-content">
      <p class="eyebrow">Problem Research · Control · Robotics · AI · Engineering</p>
      <h1>围绕真实问题组织研究方向与项目推进</h1>
      <p class="hero-lede">
        问题研究社以“问题是什么、为什么有价值、难在哪里、还有什么空间”为主线，沉淀控制理论、无人系统、人工智能与工程项目四个方向的长期研究问题。
      </p>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/projects">查看问题库</RouterLink>
        <RouterLink class="button secondary" to="/publications">查看研究成果</RouterLink>
      </div>
    </div>
  </section>

  <section class="stats-overview" aria-label="问题研究社概览">
    <div class="stats-intro">
      <p class="eyebrow">Lab Overview</p>
      <h2>问题驱动的研究地图</h2>
      <p>当前问题库来自实验室信息表，按四个大方向整理，持续记录愿景、价值、挑战、空间和进展。</p>
    </div>
    <div class="stats-band">
      <div v-for="item in stats" :key="item.label" class="stat-item">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </section>

  <section class="section narrative-section">
    <div>
      <p class="eyebrow">Positioning</p>
      <h2>从问题出发，而不是从题目堆砌出发</h2>
    </div>
    <p>
      每个方向都围绕一组可持续推进的问题展开：先说明现实需求和理想愿景，再拆解理论、系统、数据或工程上的难点，最后记录当前参与人和阶段进展，便于团队协作、选题迭代和成果展示。
    </p>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Research Directions</p>
        <h2>四个实验室大方向</h2>
      </div>
      <RouterLink to="/projects">全部研究问题</RouterLink>
    </div>
    <div class="research-grid">
      <RouterLink v-for="area in researchAreas" :key="area.slug" :to="`/research/${area.slug}`" class="research-card">
        <span class="card-eyebrow">{{ area.eyebrow }}</span>
        <h3>{{ area.title }}</h3>
        <p>{{ area.description }}</p>
        <div class="area-stat-row">
          <span>{{ area.problemCount }} 个问题</span>
          <span>{{ area.participantCount }} 位参与人</span>
        </div>
        <div class="tag-row">
          <span v-for="metric in area.metrics" :key="metric">{{ metric }}</span>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="section accent-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Representative Problems</p>
        <h2>代表性研究问题</h2>
      </div>
      <RouterLink to="/projects">进入问题库</RouterLink>
    </div>
    <div class="projects-grid compact-projects">
      <RouterLink
        v-for="project in representativeProjects"
        :key="project.id"
        :to="`/research/${project.researchSlug}`"
        class="project-card"
      >
        <div class="project-visual" :class="`accent-${project.accent}`">
          <span class="matrix-cell c1"></span>
          <span class="matrix-cell c2"></span>
          <span class="matrix-cell c3"></span>
          <span class="matrix-cell c4"></span>
          <i></i>
        </div>
        <div class="project-body">
          <span class="status">{{ project.direction }}</span>
          <h2>{{ project.title }}</h2>
          <p>{{ project.problem }}</p>
          <div class="project-meta-row">
            <span>参与人：{{ project.lead }}</span>
            <span>{{ project.status }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="section">
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
          <p v-if="pub.venue" class="home-publication-venue">{{ pub.venue }}</p>
        </div>
        <span class="button secondary small">详情</span>
      </RouterLink>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <p class="eyebrow">Resources</p>
      <h2>资料、代码、演示与流程文档集中管理</h2>
      <p>
        资源页继续作为数据集、代码、模型演示和文档入口。未公开内容保持“建设中”状态，后续可逐步替换为真实链接、仓库或下载入口。
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
      <RouterLink
        v-for="item in homeNews"
        :key="item.id"
        class="news-preview"
        :class="{ 'has-cover': item.cover }"
        to="/news"
      >
        <img v-if="item.cover" class="news-preview-cover" :src="item.cover" :alt="item.title" />
        <time>{{ formatDate(item.date) }}</time>
        <h3>{{ item.title }}</h3>
        <p>{{ item.excerpt }}</p>
      </RouterLink>
    </div>
  </section>

  <section class="section cta-section">
    <div>
      <p class="eyebrow">Join Us</p>
      <h2>欢迎围绕真实问题加入长期研究</h2>
      <p>如果你对控制理论、无人系统、人工智能或工程项目中的开放问题感兴趣，可以从问题库中选择方向，参与文献整理、方法设计、仿真验证或系统实现。</p>
    </div>
    <RouterLink class="button primary" to="/join">了解加入方式</RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import HeroVisual from '../components/HeroVisual.vue'
import { newsItems, projects, publications, researchAreas, resources, stats } from '../services/contentStore'

const sortByDateDesc = (items) =>
  [...items].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())

const homeNews = computed(() => {
  const featured = sortByDateDesc(newsItems.filter((item) => item.featured)).slice(0, 3)
  if (featured.length >= 3) return featured

  const featuredIds = new Set(featured.map((item) => item.id))
  const fillers = sortByDateDesc(newsItems.filter((item) => !featuredIds.has(item.id))).slice(0, 3 - featured.length)
  return [...featured, ...fillers]
})
const featuredPublications = computed(() => publications.filter((item) => item.featured).slice(0, 3))
const representativeProjects = computed(() =>
  researchAreas
    .map((area) => projects.find((project) => project.researchSlug === area.slug))
    .filter(Boolean),
)
const resourcePreview = computed(() => resources.slice(0, 4))

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(new Date(value))
</script>
