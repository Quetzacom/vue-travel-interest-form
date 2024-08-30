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
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  /* Transition over .3 seconds size change */
  transition: width 0.8s, height 0.8s;
}

@media (min-width: 1024px) {
  header {
    /* display: flex;
    place-items: center;
   */
  }

  .logo {
    width: 200px;
    height: 200px;
  }
}
</style>
