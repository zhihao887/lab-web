<template>
  <template v-if="area">
    <PageHero :eyebrow="area.eyebrow" :title="area.title" :description="area.description" />

    <section class="section detail-layout">
      <article class="detail-main">
        <div class="content-block">
          <p class="eyebrow">Core Question</p>
          <h2>方向核心问题</h2>
          <p>{{ area.question }}</p>
        </div>

        <div class="content-block">
          <p class="eyebrow">How We Work</p>
          <h2>推进方式</h2>
          <ol class="step-list">
            <li v-for="item in area.approach" :key="item">{{ item }}</li>
          </ol>
        </div>

        <section class="problem-bank-block">
          <p class="eyebrow">Problem Bank</p>
          <h2>{{ area.title }}问题库</h2>
          <div class="problem-stack">
            <article v-for="problem in area.problems" :key="problem.id" class="problem-card">
              <div class="problem-card-head">
                <span class="status">{{ problem.status }}</span>
                <span>{{ problem.year }}</span>
              </div>
              <h3>{{ problem.title }}</h3>
              <p v-if="problem.problem">{{ problem.problem }}</p>

              <div class="problem-card-section" v-if="problem.vision">
                <b>愿景</b>
                <p>{{ problem.vision }}</p>
              </div>
              <div class="problem-card-section" v-if="problem.value">
                <b>价值</b>
                <p>{{ problem.value }}</p>
              </div>
              <div class="problem-card-section" v-if="problem.challenge">
                <b>挑战</b>
                <p>{{ problem.challenge }}</p>
              </div>
              <div class="problem-card-section" v-if="problem.opportunity">
                <b>空间</b>
                <p>{{ problem.opportunity }}</p>
              </div>
              <div class="problem-meta">
                <span v-if="problem.participantsText">参与人：{{ problem.participantsText }}</span>
                <span v-if="problem.progress">进展：{{ problem.progress }}</span>
              </div>
            </article>
          </div>
        </section>
      </article>

      <aside class="detail-aside">
        <div class="meta-panel">
          <h2>方向概览</h2>
          <dl class="meta-list">
            <div>
              <dt>研究问题</dt>
              <dd>{{ area.problemCount }} 个</dd>
            </div>
            <div>
              <dt>参与成员</dt>
              <dd>{{ area.participantCount }} 位</dd>
            </div>
          </dl>
        </div>

        <div class="meta-panel">
          <h2>方向标签</h2>
          <div class="tag-row">
            <span v-for="item in area.metrics" :key="item">{{ item }}</span>
          </div>
        </div>

        <div class="meta-panel">
          <h2>代表问题</h2>
          <span v-for="item in area.representativeProblems" :key="item" class="text-link">
            {{ item }}
          </span>
        </div>

        <div class="meta-panel">
          <h2>参与人</h2>
          <div class="participant-list">
            <span v-for="person in area.participants" :key="person">{{ person }}</span>
          </div>
        </div>

        <div v-if="linkedPublications.length" class="meta-panel">
          <h2>关联成果</h2>
          <RouterLink v-for="pub in linkedPublications" :key="pub.id" :to="`/publications/${pub.id}`" class="text-link">
            {{ pub.title }}
          </RouterLink>
        </div>

        <div v-if="linkedResources.length" class="meta-panel">
          <h2>资源入口</h2>
          <RouterLink to="/resources" class="button secondary small">查看全部资源</RouterLink>
          <p class="meta-note">
            已关联 {{ linkedResources.length }} 个数据、代码或文档入口，未公开项会标记为建设中。
          </p>
        </div>
      </aside>
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
import { publications, researchAreas, resources, siteInfo } from '../data/siteData'

const route = useRoute()

const area = computed(() => researchAreas.find((item) => item.slug === route.params.slug))
const linkedPublications = computed(() => publications.filter((item) => area.value?.publicationIds.includes(item.id)))
const linkedResources = computed(() => resources.filter((item) => area.value?.resourceIds.includes(item.id)))

watchEffect(() => {
  document.title = area.value ? `${area.value.title} - ${siteInfo.name}` : `研究方向 - ${siteInfo.name}`
})
</script>
