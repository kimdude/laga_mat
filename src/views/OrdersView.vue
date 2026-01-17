<template>
    <!-- Alla beställningar -->
    <section class="p-4 mx-4">

        <!-- Order details modal -->
        <div class="modal modal-lg" id="order-details">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <OrderItem v-if="displayOrder" :order="orderSpec" @view-order="toggleOrder"/>
            </div>
        </div>

        <SearchFilter parent="orders" @find="searchOrder"/>

        <!-- Button for order-list/shopping cart -->
        <div class="container-fluid">
            <div class="row">
                <h2 class="col">Inköp</h2>
                <img src="../assets/images/plus_icon.svg" class="col-1 p-1" title="Gör inköp">
            </div>
        </div>

        <OrderTable class="my-4" :searchTerm="order" @view-order="toggleOrder"/>
    </section>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';
    import OrderTable from '@/components/OrderTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';
    import OrderItem from '@/components/OrderItem.vue';

    //Reactive variables
    const order = ref("");

    const orderSpec = ref({});
    const displayOrder = ref(false);

    //Setting search term
    const searchOrder = (searchTerm) => {
        order.value = searchTerm;
        return;
    }

    //Toggling order details
    const toggleOrder = (specifications) => {

        orderSpec.value = specifications;

        //Toggling modal
        if(displayOrder.value === false) return displayOrder.value = true;
        else return displayOrder.value = false;
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