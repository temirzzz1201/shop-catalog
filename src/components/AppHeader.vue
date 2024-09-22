<template>
  <header class="header">
    <div class="header__container">
      <span class="header__city" @click="openModal">
        <img :src="logo" alt="logo"> {{ city.name }}
      </span>
    </div>
  </header>
</template>

<script>
import logoSvg from '../assets/images/logo.svg';

export default {
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logo: logoSvg
    }
  },
  emits: ['open-modal'],
  methods: {
    openModal() {
      this.$emit('open-modal');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  height: 72px;
  box-shadow: 0px 2px 4px 0px #2727271A;
  margin-bottom: 35px;
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
.header__city {
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
}
@media screen and (max-width: 756px) {
  .header__container {
    padding: 0 10px;
  }
}
</style>
