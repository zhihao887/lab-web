<template>
  <section class="admin-page">
    <div class="admin-page-head">
      <div>
        <p class="admin-kicker">Overview</p>
        <h1>内容维护概览</h1>
      </div>
      <span class="admin-source-badge" :class="{ live: contentStatus.source === 'supabase' }">
        {{ contentStatus.source === 'supabase' ? 'Supabase 数据' : '静态备用数据' }}
      </span>
    </div>

    <div class="admin-metrics">
      <RouterLink v-for="item in metrics" :key="item.to" :to="item.to" class="admin-metric-card">
        <span>{{ item.code }}</span>
        <strong>{{ item.count }}</strong>
        <small>{{ item.label }}</small>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { contentStatus, newsItems, people, projects, publications, resources } from '../../services/contentStore'

const metrics = computed(() => [
  { label: '动态', code: 'NW', count: newsItems.length, to: '/manage-lab-2026/news' },
  { label: '成员', code: 'PE', count: people.length, to: '/manage-lab-2026/people' },
  { label: '项目', code: 'PR', count: projects.length, to: '/manage-lab-2026/projects' },
  { label: '成果', code: 'PB', count: publications.length, to: '/manage-lab-2026/publications' },
  { label: '资源', code: 'RS', count: resources.length, to: '/manage-lab-2026/resources' },
])
</script>
