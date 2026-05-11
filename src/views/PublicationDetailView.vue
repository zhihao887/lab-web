<template>
  <template v-if="publication">
    <PageHero
      :eyebrow="`${publication.year} · ${typeLabel(publication.type)} · ${publication.tag}`"
      :title="publication.title"
      :description="publication.abstract"
    />

    <section class="section detail-layout">
      <article class="detail-main">
        <div class="content-block">
          <p class="eyebrow">Abstract</p>
          <h2>成果摘要</h2>
          <p>{{ publication.abstract }}</p>
        </div>

        <div class="content-block">
          <p class="eyebrow">Highlights</p>
          <h2>主要贡献</h2>
          <ul class="check-list">
            <li v-for="item in publication.highlights" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="content-block">
          <p class="eyebrow">Citation</p>
          <h2>引用信息</h2>
          <p>{{ publication.citation }}</p>
        </div>

        <div class="content-block">
          <div class="block-title-row">
            <div>
              <p class="eyebrow">BibTeX</p>
              <h2>BibTeX</h2>
            </div>
            <button class="button secondary small" type="button" @click="copyBibtex">
              {{ copied ? '已复制' : '复制 BibTeX' }}
            </button>
          </div>
          <pre class="code-block"><code>{{ publication.bibtex }}</code></pre>
        </div>
      </article>

      <aside class="detail-aside">
        <div class="meta-panel">
          <h2>成果信息</h2>
          <dl class="meta-list">
            <div>
              <dt>作者</dt>
              <dd>{{ publication.authors }}</dd>
            </div>
            <div>
              <dt>发表载体</dt>
              <dd>{{ publication.venue }}</dd>
            </div>
            <div>
              <dt>年份</dt>
              <dd>{{ publication.year }}</dd>
            </div>
            <div>
              <dt>DOI</dt>
              <dd>
                <a
                  v-if="publication.paper"
                  :href="publication.paper"
                  class="text-link inline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ publication.doi || 'Paper' }}
                </a>
                <span v-else>{{ publication.doi || '待发布' }}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div v-if="linkedArea" class="meta-panel">
          <h2>关联方向</h2>
          <RouterLink :to="`/research/${linkedArea.slug}`" class="text-link">
            {{ linkedArea.title }}
          </RouterLink>
        </div>

        <div v-if="linkedProjects.length" class="meta-panel">
          <h2>关联项目</h2>
          <RouterLink v-for="project in linkedProjects" :key="project.id" :to="`/projects/${project.id}`" class="text-link">
            {{ project.title }}
          </RouterLink>
        </div>

        <div class="meta-panel">
          <h2>资源与文件</h2>
          <div class="resource-mini-list">
            <a
              v-for="link in availableAssetLinks"
              :key="link.label"
              class="resource-mini resource-mini-link"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>{{ link.label }}</b>
              <small>{{ link.note || '可访问' }}</small>
            </a>
            <span v-for="link in pendingAssetLinks" :key="link.label" class="resource-mini">
              <b>{{ link.label }}</b>
              <small>建设中</small>
            </span>
          </div>
          <RouterLink to="/resources" class="button secondary small">查看资源页</RouterLink>
        </div>
      </aside>
    </section>
  </template>

  <template v-else>
    <PageHero eyebrow="Publications" title="未找到成果" description="该成果可能已经调整，请返回成果页查看当前列表。" />
    <section class="section">
      <div class="empty-state">
        <h2>成果不存在</h2>
        <p>请从成果列表进入当前公开的论文、报告或资源。</p>
        <RouterLink class="button primary" to="/publications">返回成果页</RouterLink>
      </div>
    </section>
  </template>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { projects, publications, researchAreas, siteInfo } from '../data/siteData'

const route = useRoute()
const copied = ref(false)

const publication = computed(() => publications.find((item) => item.id === route.params.id))
const linkedArea = computed(() => researchAreas.find((item) => item.slug === publication.value?.researchSlug))
const linkedProjects = computed(() => projects.filter((item) => publication.value?.projectIds.includes(item.id)))
const assetLinks = computed(() => [
  { label: 'Paper', href: publication.value?.paper, note: 'IEEE Xplore' },
  { label: 'PDF', href: publication.value?.pdf },
  { label: 'Code', href: publication.value?.code },
  { label: 'Dataset', href: publication.value?.dataset },
])
const availableAssetLinks = computed(() => assetLinks.value.filter((link) => link.href))
const pendingAssetLinks = computed(() => assetLinks.value.filter((link) => !link.href))

const typeLabel = (value) => {
  const labels = {
    conference: '会议',
    journal: '期刊',
    preprint: '预印本',
  }
  return labels[value] || value
}

const copyBibtex = async () => {
  if (!publication.value?.bibtex) return

  try {
    await navigator.clipboard.writeText(publication.value.bibtex)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    copied.value = false
  }
}

watchEffect(() => {
  document.title = publication.value ? `${publication.value.title} - ${siteInfo.name}` : `成果详情 - ${siteInfo.name}`
})
</script>
