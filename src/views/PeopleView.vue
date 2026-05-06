<template>
  <PageHero
    eyebrow="People"
    title="团队成员"
    description="实验室由机器学习、生物信息、医学影像、药物发现和多模态学习背景的成员组成，围绕智能医学与生物计算开展长期协作。"
  />

  <section class="section">
    <div v-for="group in groups" :key="group.id" class="people-group">
      <div class="section-heading compact">
        <p class="eyebrow">{{ group.eyebrow }}</p>
        <h2>{{ group.title }}</h2>
      </div>
      <div class="people-grid">
        <article v-for="person in groupedPeople[group.id]" :key="person.name" class="person-card">
          <div class="avatar">{{ initials(person.name) }}</div>
          <div>
            <span class="role-badge">{{ person.role }}</span>
            <h3>{{ person.name }}</h3>
            <p class="person-title">{{ person.title }}</p>
            <p>{{ person.bio }}</p>
            <div class="tag-row">
              <span v-for="item in person.expertise" :key="item">{{ item }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PageHero from '../components/PageHero.vue'
import { people } from '../data/siteData'

const groups = [
  { id: 'leadership', eyebrow: 'Leadership', title: '学术与实验室负责人' },
  { id: 'core', eyebrow: 'Core Members', title: '核心研究成员' },
  { id: 'members', eyebrow: 'Members', title: '团队成员' },
]

const groupedPeople = computed(() =>
  groups.reduce((result, group) => {
    result[group.id] = people.filter((person) => person.group === group.id)
    return result
  }, {}),
)

const initials = (name) => name.slice(-2)
</script>
