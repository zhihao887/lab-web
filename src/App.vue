<template>
  <div class="app-shell">
    <LabHeader v-if="!isAdminRoute" />
    <main>
      <RouterView />
    </main>
    <SiteFooter v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LabHeader from './components/LabHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { adminBasePath } from './services/supabaseClient'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith(adminBasePath))
</script>
