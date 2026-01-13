<script setup>
  import { RouterView } from 'vue-router';
  import Header from'./components/Header.vue';
</script>

<template>
  <div class="container-fluid">

    <!-- Sidebar med huvudmeny-->
    <div class="row p-0">
      <div class="col-2 p-0 vh-100">
        <Header />
      </div>

      <!-- Innehåll -->
      <main class="col-9 p-4" >
          <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
