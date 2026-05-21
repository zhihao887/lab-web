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

    <div class="admin-panel">
      <h2>上线前检查</h2>
      <ul class="admin-check-list">
        <li :class="{ done: isSupabaseConfigured }">配置 Supabase URL 和 anon key</li>
        <li :class="{ done: Boolean(adminEmail) }">配置唯一管理员邮箱 VITE_ADMIN_EMAIL</li>
        <li>在 Supabase SQL Editor 运行 `supabase/schema.sql`</li>
        <li>创建唯一管理员账号并设置密码</li>
        <li>导入现有 `siteData.js` 内容为 `content_entries` 记录</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { newsItems, people, projects, publications, resources, contentStatus } from '../../services/contentStore'
import { adminEmail, isSupabaseConfigured } from '../../services/supabaseClient'

const metrics = computed(() => [
  { label: '动态', code: 'NW', count: newsItems.length, to: '/manage-lab-2026/news' },
  { label: '成员', code: 'PE', count: people.length, to: '/manage-lab-2026/people' },
  { label: '项目', code: 'PR', count: projects.length, to: '/manage-lab-2026/projects' },
  { label: '成果', code: 'PB', count: publications.length, to: '/manage-lab-2026/publications' },
  { label: '资源', code: 'RS', count: resources.length, to: '/manage-lab-2026/resources' },
])
</script>
