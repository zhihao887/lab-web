<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <div class="footer-brand">
          <img src="/logo.svg" alt="" />
          <span>{{ siteInfo.name }}</span>
        </div>
        <p>{{ siteInfo.subtitle }}</p>
      </div>
      <div class="footer-links">
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">{{ item.label }}</RouterLink>
      </div>
      <address>
        <a href="https://www.0006777.xyz/manage-lab-2026/login" target="_blank" rel="noopener noreferrer">
          {{ siteInfo.location }}
        </a>
        <a :href="`mailto:${siteInfo.email}`">{{ siteInfo.email }}</a>
      </address>
    </div>
  </footer>
</template>

<script setup>
import { navItems, siteInfo } from '../services/contentStore'
</script>
