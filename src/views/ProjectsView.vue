<template>
  <PageHero
    eyebrow="Projects"
    title="研究项目"
    description="项目页依据 lab-web.md 的研究问题整理，展示蛋白生成、医学图像、舌象识别、天然分子筛选、结合点位预测与 DTA 预测课题。"
  />

  <section class="section">
    <div class="projects-grid">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-visual" :class="`accent-${project.accent}`">
          <span class="matrix-cell c1"></span>
          <span class="matrix-cell c2"></span>
          <span class="matrix-cell c3"></span>
          <span class="matrix-cell c4"></span>
          <i></i>
        </div>
        <div class="project-body">
          <span class="status">{{ project.status }}</span>
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="project-links">
            <a
              v-for="link in project.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="button secondary small"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { projects } from '../data/siteData'
</script>
