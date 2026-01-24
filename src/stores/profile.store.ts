import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProfileInterface } from '@/interfaces/profile.interface.ts';
import { API_ROUTES, httpClient } from '@/api/api.ts';

export const useProfileStore = defineStore('profileStore', () => {
  const profile = ref<ProfileInterface>();

  async function fetchProfileAvatar() {
    const { data } = await httpClient.get<ProfileInterface>(API_ROUTES.profile);
    profile.value = data;
  }

  return { profile, fetchProfileAvatar };
});
