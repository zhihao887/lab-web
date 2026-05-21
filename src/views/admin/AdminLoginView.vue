<template>
  <main class="admin-login">
    <section class="admin-login-panel">
      <div>
        <p class="admin-kicker">Hidden Admin</p>
        <h1>实验室官网内容后台</h1>
      </div>

      <form class="admin-form-card" @submit.prevent="submit">
        <label>
          <span>管理员邮箱</span>
          <input v-model.trim="email" type="email" autocomplete="email" required />
        </label>
        <label>
          <span>密码</span>
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="!isSupabaseConfigured" class="admin-alert">
          尚未配置 Supabase 环境变量。请先设置 VITE_SUPABASE_URL、VITE_SUPABASE_ANON_KEY 和 VITE_ADMIN_EMAIL。
        </p>
        <p v-else-if="!adminEmail" class="admin-alert">
          尚未配置 VITE_ADMIN_EMAIL，无法判断唯一管理员账号。
        </p>
        <p v-if="error" class="admin-alert">{{ error }}</p>

        <button class="admin-primary-button" type="submit" :disabled="loading || !isSupabaseConfigured || !adminEmail">
          {{ loading ? '登录中...' : '登录后台' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInAdmin } from '../../services/adminAuth'
import { adminEmail, isSupabaseConfigured } from '../../services/supabaseClient'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const submit = async () => {
  loading.value = true
  error.value = ''

  try {
    await signInAdmin({ email: email.value, password: password.value })
    router.push('/manage-lab-2026')
  } catch (err) {
    error.value = err.message || '登录失败，请检查账号和密码。'
  } finally {
    loading.value = false
  }
}
</script>
