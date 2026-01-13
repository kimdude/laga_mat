<template>
    <nav class="navbar bg-info justify-content-center">
        <!-- Logo -->
        <RouterLink to="/" class="navbar-brand mb-4 mt-4">
            <img src="../assets/images/logo.svg" width="130" alt="Logo">
        </RouterLink>

        <!-- Main navigation -->
        <div class="container justify-content-center mt-4">
            <ul class="navbar-nav vh-100">
                <li class="nav-item py-2">
                    <RouterLink to="/" class="nav-link">
                        <img src="../assets/images/dashboard_icon.svg" class="pe-2" width="30" alt="Lager">
                        Kontrollpanel
                    </RouterLink>
                </li>
                <li class="nav-item py-2">
                    <RouterLink to="/lager" class="nav-link">
                        <img src="../assets/images/store_icon.svg" class="pe-2" width="30" alt="Lager">
                        Lager
                    </RouterLink>
                </li>
                <li class="nav-item py-2">
                    <RouterLink to="/inkop" class="nav-link">
                        <img src="../assets/images/order_icon.svg" class="pe-2" width="30" alt="Lager">
                        Inköp
                    </RouterLink>
                </li>
                <li class="nav-item py-2">
                    <RouterLink to="/anvandare" class="nav-link">
                        <img src="../assets/images/user_icon.svg" class="pe-2" width="30" alt="Lager">
                        Användare
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
    /* Links */
    .router-link-active {
        font-weight: 700;
    }
</style>