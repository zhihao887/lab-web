<template>
  <section class="page-hero">
    <div class="page-hero-inner">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
