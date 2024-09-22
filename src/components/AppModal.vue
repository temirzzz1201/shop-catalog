<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal__content">
      <p class="modal__title">Выбор населённого пункта:</p>
      <button class="close-button" @click="closeModal">X</button>
      <div class="modal__search-wrapper">
        <input ref="city" class="modal__search" v-model="searchQuery" @input="fetchCities" placeholder="Например, Санкт-петербург" />
        <app-button 
          :isActive="selectedCity !== null" 
          @confirm="confirmCity" 
        >Подтвердить
      </app-button>
      </div>
      <ul class="modal__menu" v-if="cities.length">
        <li
          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city)"
          :class="{ selected: city.id === selectedCity?.id }"
          class="modal__menu__item"
        >
          {{ city.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppButton from '../UI/AppButton.vue';

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      searchQuery: '', 
      cities: [], 
      selectedCity: null 
    };
  },
  emits: ['close', 'city-changed'],
  methods: {
    async fetchCities() {
      if (this.searchQuery.length >= 3) {
        try {
          const { data } = await axios.get('https://nlstar.com/api/catalog3/v1/city/', {
            params: { term: this.searchQuery, country: 'ru' }
          });
          this.cities = data.data;
        } catch (error) {
          console.error('Ошибка при загрузке городов:', error);
        }
      } else {
        this.cities = [];
      }
    },
    selectCity(city) {
      this.selectedCity = city;
    },
    confirmCity() {
      if (this.selectedCity) {
        this.$emit('city-changed', { id: this.selectedCity.id, name: this.selectedCity.label });
      }
    },
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    this.$refs.city.focus();
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(53, 54, 71, .6);
  z-index: 9;
}
.modal__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  color: #272727;
  margin-bottom: 12px;
}
.modal__content {
  background: #ffffff;
  border-radius: 5px;
  padding: 28px 19px 32px;
  width: 100%;
  max-width: 769px;
  position: relative;
}
.modal__search-wrapper {
  display: flex;
  justify-content: flex-start;
}
.modal__search {
  max-width: 540px;
  width: 100%;
  height: 48px;
  padding-left: 16px;
  border: 1px solid #97979780;
  border-radius: 5px;
  margin-right: 18px;
}
.modal__search::placeholder {
  color: #979797;
}
.close-button {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #979797;
}
.modal__menu {
  list-style-type: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  background: #ffffff;
  margin-top: 33px;
  width: 100%;
  position: absolute;
  left: 0;
}
.modal__menu__item {
  cursor: pointer;
  padding: 0.5rem;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #979797;
}
li.selected {
  background-color: lightblue;
  color: #272727;
}

@media screen and (max-width: 756px) {
  .modal__content {
    margin: 0 20px;
  }
  .modal__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
  }
  .modal__search {
    margin-bottom: 15px;
  }
  .modal__search-wrapper {
    display: flex;
    flex-direction: column;
  }
  .modal__search {
    width: 100%;
    height: 35px;
    padding-left: 16px;
    margin-right: unset;
  }
  .modal__search-btn {
    width: 100%;
    height: 35px;
  }
  .modal__search-btn_active {
    background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  }
  .modal__menu__item {
    font-size: 14px;
    line-height: 18px;
  }
  li.selected {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
