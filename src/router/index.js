import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeopleView from '../views/PeopleView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import NewsView from '../views/NewsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import JoinView from '../views/JoinView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },
  { path: '/people', name: 'people', component: PeopleView, meta: { title: '团队' } },
  { path: '/publications', name: 'publications', component: PublicationsView, meta: { title: '成果' } },
  { path: '/news', name: 'news', component: NewsView, meta: { title: '动态' } },
  { path: '/projects', name: 'projects', component: ProjectsView, meta: { title: '项目' } },
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
  document.title = `${suffix}医智矩阵实验室`
})

export default router
