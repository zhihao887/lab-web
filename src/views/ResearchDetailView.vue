<template>
  <template v-if="area">
    <PageHero :eyebrow="area.eyebrow" :title="area.title" :description="area.description" />

    <section class="section detail-layout">
      <article class="detail-main">
        <div class="content-block">
          <p class="eyebrow">Why It Matters</p>
          <h2>研究问题</h2>
          <p>{{ area.question }}</p>
        </div>

        <div class="content-block">
          <p class="eyebrow">How We Work</p>
          <h2>方法路线</h2>
          <ol class="step-list">
            <li v-for="item in area.approach" :key="item">{{ item }}</li>
          </ol>
        </div>

        <div class="content-block">
          <p class="eyebrow">Open Problems</p>
          <h2>开放问题</h2>
          <div class="tag-row spacious">
            <span v-for="item in area.openQuestions" :key="item">{{ item }}</span>
          </div>
        </div>
      </article>

      <aside class="detail-aside">
        <div class="meta-panel">
          <h2>方向标签</h2>
          <div class="tag-row">
            <span v-for="item in area.metrics" :key="item">{{ item }}</span>
          </div>
        </div>

        <div class="meta-panel">
          <h2>关联项目</h2>
          <RouterLink v-for="project in linkedProjects" :key="project.id" :to="`/projects/${project.id}`" class="text-link">
            {{ project.title }}
          </RouterLink>
        </div>

        <div class="meta-panel">
          <h2>资源入口</h2>
          <RouterLink to="/resources" class="button secondary small">查看全部资源</RouterLink>
          <p v-if="linkedResources.length" class="meta-note">
            已关联 {{ linkedResources.length }} 个数据、代码或文档入口，未公开项会标记为建设中。
          </p>
        </div>
      </aside>
    </section>

    <section class="section related-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Featured Work</p>
          <h2>代表成果</h2>
        </div>
        <RouterLink to="/publications">全部成果</RouterLink>
      </div>
      <div class="publication-list compact-list">
        <RouterLink
          v-for="pub in linkedPublications"
          :key="pub.id"
          :to="`/publications/${pub.id}`"
          class="publication-item"
        >
          <div>
            <span class="pub-meta">{{ pub.year }} · {{ pub.tag }}</span>
            <h2>{{ pub.title }}</h2>
            <p class="authors">{{ pub.authors }}</p>
            <p>{{ pub.abstract }}</p>
          </div>
          <span class="button secondary small">详情</span>
        </RouterLink>
      </div>
    </section>
  </template>

  <template v-else>
    <PageHero eyebrow="Research" title="未找到研究方向" description="该研究方向可能已经调整，请返回首页查看当前方向列表。" />
    <section class="section">
      <div class="empty-state">
        <h2>研究方向不存在</h2>
        <p>请从首页或项目页进入当前公开的研究方向。</p>
        <RouterLink class="button primary" to="/">返回首页</RouterLink>
      </div>
    </section>
  </template>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { projects, publications, researchAreas, resources, siteInfo } from '../data/siteData'

const route = useRoute()

const area = computed(() => researchAreas.find((item) => item.slug === route.params.slug))
const linkedProjects = computed(() => projects.filter((item) => area.value?.projectIds.includes(item.id)))
const linkedPublications = computed(() => publications.filter((item) => area.value?.publicationIds.includes(item.id)))
const linkedResources = computed(() => resources.filter((item) => area.value?.resourceIds.includes(item.id)))

watchEffect(() => {
  document.title = area.value ? `${area.value.title} - ${siteInfo.name}` : `研究方向 - ${siteInfo.name}`
})
</script>
