import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import CategoryPage from '../pages/CategoryPage.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage, props: true },
  { 
    path: '/category/:categorySlug', 
    name: 'Category', 
    component: CategoryPage,
    props: true 
  },
  { 
    path: '/category/:categorySlug/:subcategorySlug', 
    name: 'Subcategory', 
    component: CategoryPage,
    props: true 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
