<template>
  <div class="app-shell">
    <LabHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import LabHeader from './components/LabHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
