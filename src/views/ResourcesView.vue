<template>
  <PageHero
    eyebrow="Resources"
    title="资源与演示入口"
    description="集中展示实验室的数据集、代码、模型演示和文档入口。未公开内容会标记为建设中，医学相关演示仅用于科研展示。"
  />

  <section class="section resource-notice">
    <p>
      本页资源用于科研复现、协作和成果展示。医学图像与舌象相关演示不用于临床诊断、治疗建议或个人健康决策。
    </p>
  </section>

  <section v-for="group in groupedResources" :key="group.id" class="section resource-section">
    <div class="section-heading compact">
      <div>
        <p class="eyebrow">{{ group.eyebrow }}</p>
        <h2>{{ group.title }}</h2>
      </div>
    </div>

    <div class="resource-grid">
      <article v-for="resource in group.items" :key="resource.id" class="resource-card">
        <span class="status">{{ resource.status }}</span>
        <h3>{{ resource.title }}</h3>
        <p>{{ resource.description }}</p>
        <dl class="meta-list compact">
          <div>
            <dt>负责人</dt>
            <dd>{{ resource.owner }}</dd>
          </div>
          <div>
            <dt>更新</dt>
            <dd>{{ formatDate(resource.updated) }}</dd>
          </div>
        </dl>
        <a
          v-if="resource.href"
          :href="resource.href"
          target="_blank"
          rel="noopener noreferrer"
          class="button secondary small"
        >
          打开资源
        </a>
        <span v-else class="button secondary small disabled">建设中</span>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PageHero from '../components/PageHero.vue'
import { resources } from '../data/siteData'

const categories = [
  { id: 'dataset', title: '数据集与 Benchmark', eyebrow: 'Datasets' },
  { id: 'code', title: '代码与复现脚本', eyebrow: 'Code' },
  { id: 'demo', title: '模型演示', eyebrow: 'Demos' },
  { id: 'document', title: '文档与流程', eyebrow: 'Documents' },
]

const groupedResources = computed(() =>
  categories
    .map((category) => ({
      ...category,
      items: resources.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length),
)

const formatDate = (value) =>
  new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))
</script>
