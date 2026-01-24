import { defineStore } from 'pinia';
import { API_ROUTES, httpClient } from '@/api/api.ts';
import type { Category } from '@/interfaces/category.interface.ts';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories(): Promise<Category | void> {
    const { data } = await httpClient.get<Category[]>(API_ROUTES.category);
    categories.value = data;
  }

  async function createCategory(): Promise<Category | void> {
    const { data } = await httpClient.post<Category>(API_ROUTES.category, {
      name: 'Новая категория',
      alias: 'new',
    });
    categories.value.push(data);
  }

  return { categories, fetchCategories, createCategory };
});
