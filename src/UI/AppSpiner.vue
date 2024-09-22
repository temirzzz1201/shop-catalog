<template>
  <div class="spinner__wrapper">
    <div :class="['spinner', spinnerSize, spinnerSpeed, spinnerColor]"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'medium', 
    },
    color: {
      type: String,
      default: 'blue', 
    },
    speed: {
      type: String,
      default: 'normal', 
    }
  },
  computed: {
    spinnerSize() {
      return `spinner_${this.size}`;
    },
    spinnerColor() {
      return `spinner_${this.color}`;
    },
    spinnerSpeed() {
      return `spinner_${this.speed}`;
    }
  },
};
</script>

<style scoped>
.spinner__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner {
  display: inline-block;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
.spinner_small {
  width: 20px;
  height: 20px;
}
.spinner_medium {
  width: 50px;
  height: 50px;
}
.spinner_large {
  width: 100px;
  height: 100px;
}
.spinner_blue {
  border-top-color: #3498db;
}
.spinner_red {
  border-top-color: #e74c3c;
}
.spinner_green {
  border-top-color: #2ecc71;
}
.spinner_slow {
  animation-duration: 2s;
}
.spinner_normal {
  animation-duration: 1s;
}
.spinner_fast {
  animation-duration: 0.5s;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>