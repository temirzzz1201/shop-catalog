<template>
  <div class="container">
    <div class="category-page">
      <header class="category-page__header">
        <button class="back__btn" @click="goBack">
          <img :src="backBtn" alt="backBtn" />
        </button>
        <h2>{{ categoryName || "Категория" }}</h2>
      </header>

      <div class="category-page__content">
        <sidebar
          v-if="categoriesChildren.length >= 2"
          :categoriesChildren="categoriesChildren"
          :selectedSubcategory="selectedSubcategory"
          @subcategory-selected="selectSubcategory"
        />
        <main>
          <div v-if="loading">Загрузка...</div>
          <div v-else-if="filteredProducts.length" class="category-page__cards">
            <product-item 
              v-for="product in filteredProducts" 
              :key="product.present_name" 
              :product="product" 
            />
          </div>
          <div v-else>
            <p>Нет продуктов в данной категории.</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from '../stores/index';
import { mapActions, mapState } from 'pinia';
import backBtn from '../assets/images/back_btn.svg';
import ProductItem from '../components/ProductItem.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    ProductItem,
    Sidebar
  },
  props: {
    city: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      loading: true,
      backBtn: backBtn
    };
  },
  computed: {
    ...mapState(useCategoryStore, ['selectedCategory', 'products', 'selectedSubcategory', 'categoriesChildren', 'categoryName']),
    
    filteredProducts() {
      if (this.selectedSubcategory) {
        return this.products.filter(product => product.tags.some(tag => tag.slug === this.selectedSubcategory));
      }
      return this.products;
    }
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchCategoryData', 'selectSubcategory']),
    goBack() {
      this.$router.push({ name: 'HomePage' });
    }
  },
  async mounted() {
    this.loading = true;
    await this.fetchCategoryData(this.$route.params.categorySlug, this.city.id);
    this.loading = false;
  },
  watch: {
    '$route.params.subcategorySlug': {
      immediate: true,
      handler(newSubcategorySlug) {
        this.selectSubcategory(newSubcategorySlug);
      }
    }
  }
};
</script>

<style scoped>
.category-page {
  margin-bottom: 100px;
}
.category-page__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.category-page__content {
  display: flex;
}
.category-page__cards {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.back__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #030303;
  cursor: pointer;
}
@media screen and (max-width: 946px) {
  .category-page__content {
    flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .category-page {
    margin-bottom: 20px;
  }
  .category-page__cards {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
}
@media screen and (max-width: 458px) {
  .category-page__cards {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
}
</style>
