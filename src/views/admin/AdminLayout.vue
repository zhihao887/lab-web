<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <RouterLink class="admin-brand" to="/manage-lab-2026">
        <span class="admin-brand-mark">PR</span>
        <span>
          <strong>网站后台</strong>
          <small>Problem Research Lab</small>
        </span>
      </RouterLink>

      <nav class="admin-nav" aria-label="后台导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          <span>{{ item.code }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="admin-sidebar-footer">
        <RouterLink class="admin-ghost-link" to="/" target="_blank">查看官网</RouterLink>
        <button class="admin-ghost-link" type="button" @click="logout">退出登录</button>
      </div>
    </aside>

    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { signOutAdmin } from '../../services/adminAuth'

const router = useRouter()

const navItems = [
  { label: '概览', code: 'OV', to: '/manage-lab-2026' },
  { label: '动态', code: 'NW', to: '/manage-lab-2026/news' },
  { label: '成员', code: 'PE', to: '/manage-lab-2026/people' },
  { label: '项目', code: 'PR', to: '/manage-lab-2026/projects' },
  { label: '成果', code: 'PB', to: '/manage-lab-2026/publications' },
  { label: '资源', code: 'RS', to: '/manage-lab-2026/resources' },
  { label: '首页配置', code: 'ST', to: '/manage-lab-2026/settings' },
]

const logout = async () => {
  await signOutAdmin()
  router.push('/manage-lab-2026/login')
}
</script>
