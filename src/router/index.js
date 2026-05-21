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
import AdminContentManager from '../views/admin/AdminContentManager.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminSettingsView from '../views/admin/AdminSettingsView.vue'
import { getCurrentAdmin } from '../services/adminAuth'
import { siteInfo } from '../services/contentStore'
import { adminBasePath } from '../services/supabaseClient'

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
  { path: `${adminBasePath}/login`, name: 'admin-login', component: AdminLoginView, meta: { title: 'Admin Login', admin: true } },
  {
    path: adminBasePath,
    component: AdminLayout,
    meta: { admin: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: AdminDashboardView, meta: { title: 'Admin', admin: true, requiresAdmin: true } },
      { path: 'news', name: 'admin-news', component: AdminContentManager, meta: { title: 'Admin News', admin: true, requiresAdmin: true, contentType: 'newsItems' } },
      { path: 'people', name: 'admin-people', component: AdminContentManager, meta: { title: 'Admin People', admin: true, requiresAdmin: true, contentType: 'people' } },
      { path: 'projects', name: 'admin-projects', component: AdminContentManager, meta: { title: 'Admin Projects', admin: true, requiresAdmin: true, contentType: 'projects' } },
      { path: 'publications', name: 'admin-publications', component: AdminContentManager, meta: { title: 'Admin Publications', admin: true, requiresAdmin: true, contentType: 'publications' } },
      { path: 'resources', name: 'admin-resources', component: AdminContentManager, meta: { title: 'Admin Resources', admin: true, requiresAdmin: true, contentType: 'resources' } },
      { path: 'settings', name: 'admin-settings', component: AdminSettingsView, meta: { title: 'Admin Settings', admin: true, requiresAdmin: true } },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true

  const admin = await getCurrentAdmin()
  if (admin) return true

  return {
    name: 'admin-login',
    query: { redirect: to.fullPath },
  }
})

router.afterEach((to) => {
  const suffix = to.meta.title ? `${to.meta.title} - ` : ''
  document.title = `${suffix}${siteInfo.name}`
})

export default router
