<template>
  <PageHero
    eyebrow="Projects"
    title="研究项目"
    description="围绕实验室的核心研究方向，展示项目问题、阶段状态、代表成果和资源入口。"
  />

  <section class="section">
    <div class="projects-grid">
      <RouterLink v-for="project in projects" :key="project.id" :to="`/projects/${project.id}`" class="project-card">
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
          <p class="project-problem">{{ project.problem }}</p>
          <div class="project-meta-row">
            <span>负责人：{{ project.lead }}</span>
            <span>{{ project.phase }}</span>
          </div>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="project-links">
            <span class="button secondary small">项目档案</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import { projects } from '../data/siteData'
</script>
