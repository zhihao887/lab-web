import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeopleView from '../views/PeopleView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import NewsView from '../views/NewsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import JoinView from '../views/JoinView.vue'
import ResearchDetailView from '../views/ResearchDetailView.vue'
import PublicationDetailView from '../views/PublicationDetailView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ResourcesView from '../views/ResourcesView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },
  { path: '/people', name: 'people', component: PeopleView, meta: { title: '团队' } },
  { path: '/research/:slug', name: 'research-detail', component: ResearchDetailView, meta: { title: '研究方向' } },
  { path: '/publications', name: 'publications', component: PublicationsView, meta: { title: '成果' } },
  { path: '/publications/:id', name: 'publication-detail', component: PublicationDetailView, meta: { title: '成果详情' } },
  { path: '/news', name: 'news', component: NewsView, meta: { title: '动态' } },
  { path: '/projects', name: 'projects', component: ProjectsView, meta: { title: '项目' } },
  { path: '/projects/:id', name: 'project-detail', component: ProjectDetailView, meta: { title: '项目详情' } },
  { path: '/resources', name: 'resources', component: ResourcesView, meta: { title: '资源' } },
  { path: '/join', name: 'join', component: JoinView, meta: { title: '加入我们' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const suffix = to.meta.title ? `${to.meta.title} - ` : ''
  document.title = `${suffix}智能医学与生物计算实验室`
})

export default router
