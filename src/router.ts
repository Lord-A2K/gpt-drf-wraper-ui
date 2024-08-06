import { createRouter, createWebHistory } from 'vue-router';
import IndexView from './views/IndexView.vue';
import ProfileView from './views/ProfileView.vue';
import AuthView from './views/AuthView.vue';
import ChatView from './views/ChatView.vue';
import { useAuthStore } from './stores/auth';

const routes = [
  { path: '/', component: IndexView, meta: { title: 'Home' } },
  { path: '/auth', component: AuthView, meta: { title: 'Auth' } },
  { path: '/chat', component: ChatView, meta: { title: 'Chat' } },
  {
    path: '/profile',
    component: ProfileView,
    meta: { protected: true, title: 'Profile' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.protected && !authStore.isAuthenticated()) {
    try {
      await authStore.refreshAccessToken();
      next();
    } catch (error) {
      next('/auth');
    }
  } else if (to.path === '/auth' && authStore.isAuthenticated()) {
    // If the user is trying to access the auth route but is already authenticated
    next('/profile');
  } else {
    next();
  }
});

export default router;
