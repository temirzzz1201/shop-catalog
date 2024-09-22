<template>
  <main class="container">
    <div class="home-page">
      <h2>Категории товаров</h2>
      <AppSpiner v-if="!categories.length" size="large" speed="normal" color="green" />
      <div v-else class="home-page__cards">
        <category-item v-for="category in categories" :key="category.slug" :category="category" />
      </div>
    </div>
  </main>
</template>

<script>
import { useCategoryStore } from '../stores/index';
import { mapActions, mapState } from 'pinia';
import CategoryItem from '../components/CategoryItem.vue';
import AppSpiner from '../UI/AppSpiner.vue';

export default {
  components: {
    CategoryItem,
    AppSpiner
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(useCategoryStore, ['categories']),
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchCategories']),
  },
  mounted() {
    this.fetchCategories(this.city.id);
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
.home-page {
  margin-bottom: 100px;
}
.home-page__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 22px;
}
@media screen and (max-width: 768px) {
  .home-page {
    margin-bottom: 20px;
  }
  .home-page__cards {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
}
@media screen and (max-width: 458px) {
  .home-page__cards {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
}

</style> 
