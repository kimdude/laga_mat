<script setup>
  import { RouterView } from 'vue-router';
  import { ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';
  import Header from'./components/Header.vue';

  const childCompLogin = ref(false);
  const roleAdmin =  false;

  //Check user role
  const getRole = () => {

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    return decodedToken.permission;
  }

  getRole();

</script>

<template>
  <div class="container-fluid">

    <!-- Sidebar med huvudmeny-->
    <div class="row p-0">
      <div class="col-2 p-0 vh-100">
        <Header v-if="!childCompLogin" />
      </div>

      <!-- Innehåll -->
      <main class="col-9 p-4" >
          <RouterView @child-comp-login="childCompLogin = $event"/>
      </main>
    </div>

  </div>
</template>

<style scoped>

</style>
