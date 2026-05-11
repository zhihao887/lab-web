<template>
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
      <component
        :is="resource.href ? 'a' : 'article'"
        v-for="resource in group.items"
        :key="resource.id"
        class="resource-card"
        :class="{ 'is-clickable': resource.href, 'is-pending': !resource.href }"
        :href="resource.href || undefined"
        :target="resource.href ? '_blank' : undefined"
        :rel="resource.href ? 'noopener noreferrer' : undefined"
      >
        <span class="status">{{ resource.status }}</span>
        <h3>{{ resource.title }}</h3>
        <p>{{ resource.description }}</p>
        <p class="resource-card-note">
          {{ resource.href ? '点击卡片或按钮打开资源入口。' : '资源整理完成后，这张卡片会变成可点击入口。' }}
        </p>
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
        <span v-if="resource.href" class="button secondary small">
          打开资源
        </span>
        <span v-else class="button secondary small disabled">建设中</span>
      </component>
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
