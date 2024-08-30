<script setup lang="ts">
import TravelInterestForm from './components/TravelInterestForm.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/mapcompass.svg" width="125" height="125" />
  </header>

  <main>
    <TravelInterestForm />
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 1rem;
  transition: width 0.8s, height 0.8s;
}

@media (min-width: 1024px) {
 
  .logo {
    width: 200px;
    height: 200px;
  }
}
</style>
