<template>
  <button 
    class="btn" 
    :class="{'btn_active': isActive}" 
    :disabled="!isActive" 
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    handleClick() {
      this.$emit('confirm');
    }
  }
};
</script>

<style>
.btn {
  width: 174px;
  height: 48px;
  border-radius: 25px;
  border: 1px solid #ACACAC;
  background: inherit;
  cursor: not-allowed;
}
.btn_active {
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  border: none;
  color: #ffffff;
  cursor: pointer;
}
@media screen and (max-width: 458px) {
  .btn {
    width: 100%;
  }
}
</style>