<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.store.ts';
import { onMounted } from 'vue';
import ButtonIcon from '@/components/ButtonIcon.vue';
import IconPlus from '@/icons/IconPlus.vue';

const store = useCategoryStore();
onMounted(() => {
  store.fetchCategories();
});
</script>
<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in store.categories" :key="item.id">
      <RouterLink :to="`/main/${item.alias}`"> {{ item.name }}</RouterLink>
    </li>
    <li>
      <ButtonIcon @click="store.createCategory()">
        <IconPlus />
      </ButtonIcon>
    </li>
  </ul>
</template>
<style scoped>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 34px;
  margin: 0;
  padding: 0;
}
.category-list li {
  list-style: none;
}
.list-item {
  list-style: none;
}
.list-item a {
  color: var(--color-fg);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.5s;
}
.list-item:hover a {
  font-size: 20px;
  font-weight: 500;
  color: red;
}
</style>
