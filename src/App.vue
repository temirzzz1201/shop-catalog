
<template>
  <app-header :city="city" @open-modal="openModal" />
  <app-modal v-if="isModalOpen" @close="closeModal" @city-changed="updateCity" />
  <router-view :city="city" @city-changed="updateCity" />
</template>

<script>
import AppModal from './components/AppModal.vue';
import AppHeader from './components/AppHeader.vue'; 

export default {
  components: {
    AppModal,
    AppHeader
  },
  data() {
    return {
      city: JSON.parse(localStorage.getItem('selectedCity')) || { id: 1, name: 'Новосибирск' }, 
      isModalOpen: false 
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateCity(newCity) {
      this.city = newCity;
      localStorage.setItem('selectedCity', JSON.stringify(newCity));
      this.closeModal();
    }
  },
};
</script>

