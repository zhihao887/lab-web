<template>
  <template v-if="project">
    <section class="section detail-layout">
      <article class="detail-main">
        <div v-for="section in contentSections" :key="section.title" class="content-block">
          <p class="eyebrow">{{ section.eyebrow }}</p>
          <h2>{{ section.title }}</h2>
          <p>{{ section.content }}</p>
        </div>

        <div v-if="project.outputs?.length" class="content-block">
          <p class="eyebrow">Outputs</p>
          <h2>阶段产出</h2>
          <ul class="check-list">
            <li v-for="item in project.outputs" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div v-if="project.milestones?.length" class="content-block">
          <p class="eyebrow">Milestones</p>
          <h2>近期推进</h2>
          <ol class="step-list">
            <li v-for="item in project.milestones" :key="item">{{ item }}</li>
          </ol>
        </div>
      </article>

      <aside class="detail-aside">
        <div class="meta-panel">
          <h2>问题档案</h2>
          <span class="status">{{ project.status }}</span>
          <dl class="meta-list">
            <div>
              <dt>登记人</dt>
              <dd>{{ project.owner }}</dd>
            </div>
            <div>
              <dt>年度</dt>
              <dd>{{ project.year }}</dd>
            </div>
            <div v-if="project.lead">
              <dt>参与人</dt>
              <dd>{{ project.lead }}</dd>
            </div>
            <div v-if="project.phase">
              <dt>阶段</dt>
              <dd>{{ project.phase }}</dd>
            </div>
          </dl>
        </div>

        <div class="meta-panel">
          <h2>所属方向</h2>
          <RouterLink v-if="linkedArea" :to="`/research/${linkedArea.slug}`" class="text-link">
            {{ linkedArea.title }}
          </RouterLink>
        </div>

        <div class="meta-panel">
          <h2>标签</h2>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </aside>
    </section>

    <section v-if="hasRelatedWork" class="section related-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Related Work</p>
          <h2>关联成果与资源</h2>
        </div>
        <RouterLink to="/resources">资源页</RouterLink>
      </div>

      <div class="two-column-grid">
        <div class="mini-panel">
          <h3>代表成果</h3>
          <RouterLink
            v-for="pub in linkedPublications"
            :key="pub.id"
            :to="`/publications/${pub.id}`"
            class="text-link large"
          >
            {{ pub.title }}
          </RouterLink>
        </div>

        <div class="mini-panel">
          <h3>资源入口</h3>
          <div class="resource-mini-list">
            <span v-for="resource in linkedResources" :key="resource.id" class="resource-mini">
              <b>{{ resource.title }}</b>
              <small>{{ resource.status }}</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  </template>

  <template v-else>
    <section class="section">
      <div class="empty-state">
        <h2>问题记录不存在</h2>
        <p>请从问题库进入当前公开的研究问题。</p>
        <RouterLink class="button primary" to="/projects">返回问题库</RouterLink>
      </div>
    </section>
  </template>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { projects, publications, researchAreas, resources, siteInfo } from '../services/contentStore'

const route = useRoute()

const project = computed(() => projects.find((item) => item.id === route.params.id))
const linkedArea = computed(() => researchAreas.find((item) => item.slug === project.value?.researchSlug))
const linkedPublications = computed(() => publications.filter((item) => project.value?.publicationIds?.includes(item.id)))
const linkedResources = computed(() => resources.filter((item) => project.value?.resourceIds?.includes(item.id)))
const hasRelatedWork = computed(() => linkedPublications.value.length || linkedResources.value.length)

const contentSections = computed(() => {
  if (!project.value) return []

  return [
    { eyebrow: 'Research Problem', title: '问题是什么', content: project.value.problem },
    { eyebrow: 'Vision', title: '愿景', content: project.value.vision },
    { eyebrow: 'Value', title: '研究价值', content: project.value.value },
    { eyebrow: 'Challenge', title: '主要挑战', content: project.value.challenge },
    { eyebrow: 'Opportunity', title: '探索空间', content: project.value.opportunity },
    { eyebrow: 'Progress', title: '当前进展', content: project.value.progress },
  ].filter((section) => section.content)
})

watchEffect(() => {
  document.title = project.value ? `${project.value.title} - ${siteInfo.name}` : `研究问题 - ${siteInfo.name}`
})
</script>
