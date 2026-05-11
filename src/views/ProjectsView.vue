<template>
  <PageHero
    eyebrow="Problem Bank"
    title="研究问题库"
    description="基于问题研究社信息表整理的年度问题库，按控制理论、无人系统、人工智能和工程项目四个方向持续记录问题、参与人、价值、挑战与推进状态。"
  />

  <section class="section">
    <div class="filter-bar problem-filter">
      <label class="search-field">
        <span>搜索</span>
        <input v-model.trim="query" type="search" placeholder="题目、参与人、问题描述或进展" />
      </label>
      <label>
        <span>方向</span>
        <select v-model="direction">
          <option value="">全部方向</option>
          <option v-for="area in researchAreas" :key="area.slug" :value="area.slug">{{ area.title }}</option>
        </select>
      </label>
    </div>

    <div class="chip-filter" aria-label="研究方向筛选">
      <button type="button" :class="{ active: direction === '' }" @click="direction = ''">全部</button>
      <button
        v-for="area in researchAreas"
        :key="area.slug"
        type="button"
        :class="{ active: direction === area.slug }"
        @click="direction = area.slug"
      >
        {{ area.title }}
      </button>
    </div>

    <div class="direction-summary-grid">
      <RouterLink v-for="area in researchAreas" :key="area.slug" :to="`/research/${area.slug}`" class="direction-summary-card">
        <span class="card-eyebrow">{{ area.eyebrow }}</span>
        <h2>{{ area.title }}</h2>
        <p>{{ area.description }}</p>
        <div class="area-stat-row">
          <span>{{ area.problemCount }} 个问题</span>
          <span>{{ area.participantCount }} 位参与人</span>
        </div>
      </RouterLink>
    </div>
  </section>

  <section v-for="group in groupedProjects" :key="group.area.slug" class="section project-section">
    <div class="section-heading compact">
      <div>
        <p class="eyebrow">{{ group.area.eyebrow }}</p>
        <h2>{{ group.area.title }}</h2>
      </div>
      <RouterLink :to="`/research/${group.area.slug}`">方向详情</RouterLink>
    </div>

    <div class="problem-library-grid">
      <article v-for="project in group.projects" :key="project.id" class="problem-card project-library-card">
        <div class="problem-card-head">
          <span class="status">{{ project.status }}</span>
          <span>{{ project.year }}</span>
        </div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.problem }}</p>
        <div class="problem-meta">
          <span>登记人：{{ project.owner }}</span>
          <span v-if="project.lead">参与人：{{ project.lead }}</span>
          <span v-if="project.progress">进展：{{ project.progress }}</span>
        </div>
        <div class="tag-row">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="project-card-footer">
          <RouterLink :to="`/research/${project.researchSlug}`" class="text-link">查看方向问题集</RouterLink>
        </div>
      </article>
    </div>
  </section>

  <section v-if="!groupedProjects.length" class="section">
    <div class="empty-state">
      <h2>暂无匹配问题</h2>
      <p>请调整搜索词或方向筛选，查看当前问题库中的其他记录。</p>
      <button class="button primary" type="button" @click="resetFilters">重置筛选</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { projects, researchAreas } from '../data/siteData'

const query = ref('')
const direction = ref('')

const filteredProjects = computed(() => {
  const search = query.value.toLowerCase()

  return projects.filter((project) => {
    const haystack = [
      project.title,
      project.description,
      project.problem,
      project.vision,
      project.value,
      project.challenge,
      project.opportunity,
      project.progress,
      project.owner,
      project.lead,
      project.direction,
      ...(project.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (!direction.value || project.researchSlug === direction.value) && (!search || haystack.includes(search))
  })
})

const groupedProjects = computed(() =>
  researchAreas
    .map((area) => ({
      area,
      projects: filteredProjects.value.filter((project) => project.researchSlug === area.slug),
    }))
    .filter((group) => group.projects.length),
)

const resetFilters = () => {
  query.value = ''
  direction.value = ''
}
</script>
