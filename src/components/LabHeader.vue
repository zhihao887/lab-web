<template>
  <header class="lab-header">
    <RouterLink class="brand" to="/" :aria-label="`${siteInfo.name}首页`" @click="closeMenu">
      <img src="/logo.svg" alt="" class="brand-mark" />
      <span class="brand-copy">
        <strong>{{ siteInfo.name }}</strong>
        <small>{{ siteInfo.nameEn }}</small>
      </span>
    </RouterLink>

    <button class="menu-button" type="button" :aria-expanded="menuOpen" aria-label="打开导航" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav-links" :class="{ 'is-open': menuOpen }" aria-label="主导航">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-link"
        @click="closeMenu"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { navItems, siteInfo } from '../services/contentStore'

const menuOpen = ref(false)
const closeMenu = () => {
  menuOpen.value = false
}
</script>
