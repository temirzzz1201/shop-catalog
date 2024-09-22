<template>
  <div class="product__card">
    <div>
      <img class="product__card__img" :src="product.main_image_thumb_300" :alt="product.present_name" />
      <p class="product__card__category product__card__category_indent" >{{ product.category.name }}</p>
      <h3 class="product__card__title product__card__title_indent">{{ product.present_name }}</h3>
      <p class="product__card__description product__card__description_indent" v-if="product.comment_name">{{ product.comment_name }}</p>
      <p class="product__card__price">{{ product.price }} ₽</p>
      <small class="product__card__available product__card__available_color" v-if="!product.allowed || !product.available">Нет в наличии</small>
    </div>
    <app-button @confirm="addToBusket" :isActive="product.available" class="product__card__btn product__card__btn_indent">
      {{ product.available ? 'В корзину' : 'Нет в наличии' }}
    </app-button>
  </div>
</template>

<script>
import AppButton from '../UI/AppButton.vue';

export default {
  components: {
    AppButton
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToBusket() {
      alert('Добавлено в корзину!')
    }
  }
};
</script>

<style scoped>
.product__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
.product__card__img {
  width: 100%;
}
.product__card__category_indent {
  margin-bottom: 10px;
}
.product__card__title_indent {
  margin-bottom: 16px;
}
.product__card__description_indent {
  margin-bottom: 10px;
}
.product__card__price {
  font-size: 16px;
  font-weight: 500;
}
.product__card__available_color {
  color: red;
}
.product__card__title {
  font-size: 20px;
}
.product__card__btn_indent {
  margin: 10px 0;
}
</style>
