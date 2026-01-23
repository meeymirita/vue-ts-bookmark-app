<script setup lang="ts">
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { onMounted, ref } from 'vue'
import type { Profile } from '@/interfaces/profile.ts'
import { API_ROUTES } from '@/api/api.ts'

const profile = ref<Profile | undefined>()

async function fetchProfileAvatar() {
  const data = await fetch(API_ROUTES.profile);
  const res =  (await data.json()) as Profile;
  profile.value = res;
}

onMounted(() => {
  fetchProfileAvatar()
});

</script>

<template>
<div class="app-container">
  <nav class="navigation">
    <ProfileAvatar v-if="profile" :name="profile?.name" />
  </nav>
  <main>Контер</main>
</div>
</template>

<style scoped>
.app-container{
  display: flex;
  min-height: calc(100vh - 140px);
  gap: 200px;
  max-width: 1450px;
  margin: 140px auto 0 auto;

}
.navigation{
  min-width: 400px;
}
</style>
