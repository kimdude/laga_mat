<template>
    <!-- Alla beställningar -->
    <section class="p-4 mx-4">
        <SearchFilter parent="orders" @find="searchOrder"/>

        <!-- Button for order-list/shopping cart -->
        <div class="container-float">
            <div class="row">
                <h2 class="col">Inköp</h2>
                <img src="../assets/images/filter_icon.svg" class="col-1 p-1" title="Sortera efter" >   <!-- BYT UT MOT VAGN -->
            </div>
        </div>

        <OrderTable class="my-4" :searchTerm="order"/>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import OrderTable from '@/components/OrderTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';

    const order = ref("");

    //Setting search term
    const searchOrder = (searchTerm) => {
        order.value = searchTerm;
        return;
    }
    
</script>

<style scoped>
    img {
        width: 35px;
    }

    img:hover {
        cursor: pointer;
    }
</style>