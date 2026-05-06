<template>
  <template v-if="project">
    <PageHero :eyebrow="project.phase" :title="project.title" :description="project.description" />

    <section class="section detail-layout">
      <article class="detail-main">
        <div class="content-block">
          <p class="eyebrow">Research Problem</p>
          <h2>研究问题</h2>
          <p>{{ project.problem }}</p>
        </div>

        <div class="content-block">
          <p class="eyebrow">Outputs</p>
          <h2>阶段产出</h2>
          <ul class="check-list">
            <li v-for="item in project.outputs" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="content-block">
          <p class="eyebrow">Milestones</p>
          <h2>近期里程碑</h2>
          <ol class="step-list">
            <li v-for="item in project.milestones" :key="item">{{ item }}</li>
          </ol>
        </div>
      </article>

      <aside class="detail-aside">
        <div class="meta-panel">
          <h2>项目状态</h2>
          <span class="status">{{ project.status }}</span>
          <dl class="meta-list">
            <div>
              <dt>负责人</dt>
              <dd>{{ project.lead }}</dd>
            </div>
            <div>
              <dt>阶段</dt>
              <dd>{{ project.phase }}</dd>
            </div>
          </dl>
        </div>

        <div class="meta-panel">
          <h2>研究方向</h2>
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

    <section class="section related-section">
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
    <PageHero eyebrow="Projects" title="未找到项目" description="该项目可能已经调整，请返回项目页查看当前列表。" />
    <section class="section">
      <div class="empty-state">
        <h2>项目不存在</h2>
        <p>请从项目列表进入当前公开的研究项目。</p>
        <RouterLink class="button primary" to="/projects">返回项目页</RouterLink>
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

const project = computed(() => projects.find((item) => item.id === route.params.id))
const linkedArea = computed(() => researchAreas.find((item) => item.slug === project.value?.researchSlug))
const linkedPublications = computed(() => publications.filter((item) => project.value?.publicationIds.includes(item.id)))
const linkedResources = computed(() => resources.filter((item) => project.value?.resourceIds.includes(item.id)))

watchEffect(() => {
  document.title = project.value ? `${project.value.title} - ${siteInfo.name}` : `项目详情 - ${siteInfo.name}`
})
</script>
