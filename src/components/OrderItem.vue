<template>
    <!-- Content for modal with order details -->
    <div class="modal-content p-2">

        <!-- Header -->
        <div class="modal-header">
            <h2 class="modal-title">Beställning {{ props.order?.id }}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng" @click="$emit('viewOrder', null)"></button>
            <hr>
        </div>
        
        <!-- Body -->
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <p class="col">Status: {{ props.order?.status }} </p>
                    <p class="col">{{ dateType }}{{ props.order?.date }}</p>
                </div>
            </div>

            <!-- Table with ordered products -->
            <table class="table table-striped my-4">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>EAN-kod</th>
                        <th>Antal</th>
                        <th>Kostnad styck</th>
                        <th>Kostnad sammanlagd</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product of fullOrder" :key="product?.product_id">
                        <td>{{ product?.name }}</td>
                        <td>{{ product?.ean_code }}</td>
                        <td>{{ product?.amount }} st</td>
                        <td>{{ product?.price/product.amount }} kr</td>
                        <td>{{ product?.price }} kr</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Totalt</td>
                        <td>{{ orderTotal }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Footer -->
        <div class="modal-footer"><!-- ONLY DISPLAY FOR ADMIN -->
            <hr>
            <p><em>Beställd av: {{ orderedBy }}</em></p>
            <button class="btn btn-warning" data-bs-dismiss="modal">Ta bort</button>
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import OrderService from '@/services/OrderService';
    import UserService from '@/services/UserService';

    onMounted(() => {
        getOrder();
        console.log(props.order)
    })

    //Props
    const props = defineProps(["order"]);

    //Emits
    const emits = defineEmits(["viewOrder"]);

    //Reactive variables
    const fullOrder = ref({});
    const dateType = ref("");
    const orderTotal = ref(null);
    const orderedBy = ref("");

    //Getting full order
    const getOrder = async() => {
        const result = await OrderService.fetchOrder("orderId", props.order.id);
        fullOrder.value = result;

        //Getting total order cost
        orderTotal.value = fullOrder.value[0].order_total;

        if(props.order.status === "Levererad") dateType.value = "Levererad: ";
        else dateType.value = "Beställd: ";

        await getUser();

    }

    //Getting username
    const getUser = async() => {
        const result = await UserService.fetchUser(props.order.user);
        orderedBy.value = `${result.fname} ${result.lname}`;
    }
</script>