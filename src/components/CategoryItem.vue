<template>
  <div class="category__card">
    <router-link :to="{ name: 'Category', params: { categorySlug: category.slug } }">
      <p class="category__card__title category__card__title_indent" :style="{ color: category.text_color }">{{ category.name }}</p>
      <img loading="lazy" class="category__card__img" :src="category.image" :alt="category.name" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.category__card {
  position: relative;
  max-width: 271px;
  width: 100%;
  height: 152px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.category__card__title {
  max-width: 240px;
  position: absolute;
  font-size: 24px;
  font-weight: 600;
  word-wrap: break-word;
}
.category__card__title_indent {
  margin: 20px 0 0 20px;
}
.category__card__img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  .category__card {
    position: relative;
    max-width: unset;
    width: 100%;
    height: 152px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  .category__card__title {
    font-size: 20px;
  }
}
</style>
