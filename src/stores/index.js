import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
    selectedCategory: null,
    products: [],
    selectedSubcategory: null,
    categoriesChildren: [],
    categoryName: null
  }),
  actions: {
    async fetchCategories(cityId) {
      if (this.categories.length === 0) { 
        try {
          const response = await axios.get('https://nlstar.com/ru/api/catalog3/v1/menutags/', {
            params: { city_id: cityId },
          });
          this.categories = response.data.tags;
        } catch (error) {
          console.error('Ошибка загрузки категорий:', error);
        }
      }
    },
    async fetchCategoryData(categorySlug, cityId) {
      this.categoryName = null
      this.categoriesChildren = []

      await this.fetchCategories(cityId);
      
      try {
        const response = await axios.get(`https://nlstar.com/ru/api/catalog3/v1/menutags/${categorySlug}/`, {
          params: { city_id: cityId },
        });
        this.selectedCategory = response.data;
        this.products = response.data.products || [];

        const category = this.categories.find(v => v.slug === categorySlug);
        this.categoriesChildren = category ? category.children : [];
        this.categoryName = category.name

      } catch (error) {
        console.error('Ошибка загрузки данных категории:', error);
      }
    },
    selectSubcategory(subcategorySlug) {
      this.selectedSubcategory = subcategorySlug;
    }
  }
});

