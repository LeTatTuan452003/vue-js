import { ref } from 'vue';
import { getInfo } from '@/services';

export const logout = () => {
  localStorage.removeItem('access_token');
  authStore.value.user = null;
  authStore.value.isLoggedIn = false;
  window.location.reload();
};

export const authStore = ref({
  user: null,
  isLoggedIn: false,
  logout,
});

export const initAuthStore = async () => {
  if (localStorage.getItem('access_token')) {
    const { data } = await getInfo();
    authStore.value.user = data.metadata.user;
    authStore.value.isLoggedIn = true;
  }
};
