<template>
  <!-- 学术与实验室负责人 -->
  <section class="section">
    <div class="section-heading compact directors-heading">
      <div class="heading-content">
        <p class="eyebrow">Directors</p>
        <h2>学术与实验室负责人</h2>
      </div>
      <div class="heading-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
      </div>
    </div>
    <div class="directors-grid">
      <article v-for="(person, idx) in directors" :key="person.name" class="director-card" :style="{ '--delay': idx * 100 + 'ms' }">
        <div class="director-avatar-wrapper">
          <div class="director-avatar-ring"></div>
          <div class="director-avatar">{{ initials(person.name) }}</div>
        </div>
        <div class="director-body">
          <div class="director-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            {{ person.role }}
          </div>
          <h3>{{ person.name }}</h3>
          <p v-if="person.problemTitle" class="director-problem">
            <span class="problem-icon">💡</span>
            {{ person.problemTitle }}
          </p>
        </div>
      </article>
    </div>
  </section>

  <!-- 研究方向分组 -->
  <section
    v-for="(group, idx) in categoryGroups"
    :key="group.id"
    class="section"
    :class="{ 'accent-section': idx % 2 === 1 }"
  >
    <div class="category-header">
      <div class="section-heading compact">
        <div class="category-title-wrapper">
          <span class="category-dot" :class="'dot-' + group.accent"></span>
          <div>
            <p class="eyebrow">{{ group.eyebrow }}</p>
            <h2>{{ group.title }}</h2>
          </div>
        </div>
        <p class="category-desc">{{ group.description }}</p>
      </div>
      <div class="category-stat" :class="'stat-' + group.accent">
        <span class="stat-number">{{ groupedPeople[group.id].length }}</span>
        <span class="stat-label">位成员</span>
      </div>
    </div>
    <div v-if="groupedPeople[group.id].length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p>暂无成员信息</p>
    </div>
    <div v-else class="people-grid">
      <article
        v-for="(person, personIdx) in groupedPeople[group.id]"
        :key="person.name"
        class="person-card"
        :class="'card-accent-' + group.accent"
        :style="{ '--delay': personIdx * 50 + 'ms' }"
      >
        <div class="card-header">
          <div class="avatar" :class="'avatar-' + group.accent">{{ initials(person.name) }}</div>
          <div class="card-badge" :class="'badge-' + group.accent">
            {{ group.category }}
          </div>
        </div>
        <h3>{{ person.name }}</h3>
        <div v-if="person.problemTitle" class="problem-tag">
          <span class="tag-icon">🎯</span>
          <span class="tag-text">{{ person.problemTitle }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PageHero from '../components/PageHero.vue'
import { people } from '../data/siteData'

const directors = computed(() => people.filter((p) => p.group === 'directors'))

const categoryGroups = [
  {
    id: 'control-theory',
    eyebrow: 'Control Theory',
    title: '控制理论',
    accent: 'blue',
    description: '围绕安全状态估计、攻击检测识别、多目标可靠跟踪与围捕控制，构建面向复杂系统的鲁棒控制与可信估计方法。',
  },
  {
    id: 'unmanned-systems',
    eyebrow: 'Unmanned Systems',
    title: '无人系统',
    accent: 'teal',
    description: '面向无人机、机器人、机械臂与自动驾驶，研究复杂环境中的感知、规划、控制、协同运输与语义级定位建图。',
  },
  {
    id: 'artificial-intelligence',
    eyebrow: 'Artificial Intelligence',
    title: '人工智能',
    accent: 'amber',
    description: '聚焦蛋白质生成、医学图像分类、舌象多模态大模型、天然分子筛选与 DTA 预测，探索 AI 在科研与工程中的可用性。',
  },
  {
    id: 'engineering-projects',
    eyebrow: 'Engineering Projects',
    title: '工程项目',
    accent: 'rose',
    description: '面向燃气轮机、压缩机组与工业现场建模优化，沉淀可服务真实工程问题的模型、算法与系统方案。',
  },
]

const groupedPeople = computed(() => {
  const result = {}
  for (const g of categoryGroups) {
    result[g.id] = people.filter((p) => p.group === g.id)
  }
  return result
})

const initials = (name) => name.slice(-2)
</script>
