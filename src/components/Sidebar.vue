<template>
  <aside class="sidebar">
    <ul class="sidebar__menu">
      <li class="sidebar__link" 
        :class="{ active: selectedSubcategory === null }"
        @click.native="selectSubcategory(null)"
       >
        <router-link :to="{ name: 'Category', params: { categorySlug: $route.params.categorySlug } }">
          Все продукты
        </router-link>
      </li>
      <li class="sidebar__link" 
        :class="{ active: selectedSubcategory === subcategory.slug }" 
        v-for="subcategory in categoriesChildren" 
        :key="subcategory.slug" 
        @click.native="selectSubcategory(subcategory.slug)"
      >
        <router-link :to="{ name: 'Subcategory', params: { categorySlug: $route.params.categorySlug, subcategorySlug: subcategory.slug } }">
          {{ subcategory.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    categoriesChildren: {
      type: Array,
      required: true
    },
    selectedSubcategory: {
      type: String,
      default: null
    }
  },
  methods: {
    selectSubcategory(subcategorySlug) {
      this.$emit('subcategory-selected', subcategorySlug);
    }
  }
};
</script>


<style scoped>
.sidebar {
  min-width: 200px;
  margin-right: 20px;
  margin-bottom: 25px;
}
.sidebar__menu {
  list-style-type: none;
  padding: 0;
}
.sidebar__link {
  cursor: pointer;
  padding: 10px;
}
.active {
  font-weight: bold;
  background: #E9EEF3;
}
</style>
