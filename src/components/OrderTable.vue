<template>
    <!-- Alla beställningar -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col" @click="sort('id')">ID</th>
                <th scope="col" @click="sort('date')">Datum</th>
                <th scope="col" @click="sort('status')">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in ordersList" :key="order.order_id" data-bs-toggle="modal" data-bs-target="#order-details" @click="displayOrder(order)">
                <td>{{order.order_id}}</td>
                <td>{{order.date}}</td>
                <td>{{order.status}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    //Imports
    import { watch, ref, onMounted } from 'vue';
    import OrderService from '@/services/OrderService';

    //Props
    const props = defineProps({
        searchTerm: String
    });

    //Emits
    const emits = defineEmits(["viewOrder"]);

    //Reference variables
    const ordersList = ref([]); //Orderss being displayed
    const allOrders = ref([]); //Total orders

    //When view is loaded
    onMounted(()=> {
        fetchOrders();
    });

    //Fetching all orders
    const fetchOrders = async() => {

        const result = await OrderService.fetchOrders();
        allOrders.value = result;
        
        //Formatting dates and status
        for(const order of allOrders.value) {

            //Formating status
            if(order.status === true) order.status = "Levererad";
            else order.status = "På väg";

            //Formating date
            const date = new Date(order.date);
            let year = date.getFullYear();
            let month = date.getMonth() +1;
            let day = date.getDate();

            if(month <= 9) month = `0${month}`;
            if(day <= 9) day = `0${day}`;

            const formatedDate = `${year}-${month}-${day}`;

            order.date = formatedDate;

        }

        //Sorting orders from most recent to oldest orders
        allOrders.value.sort((a,b) => { 
            return a.date.localeCompare(b.date);
        }).reverse();

        loadOrders();

    }

    //Displaying all products
    const loadOrders = async() => {

        //Setting lists of orders
        ordersList.value = allOrders.value;
        return;
    }

    //Searching for order
    const searchOrder = () => {

        //Reseting product list
        if(props.searchTerm === "") {
            loadOrders();
            return;
        }

        ordersList.value = allOrders.value.filter((order) => {
            return order.order_id.toString().includes(props.searchTerm);
        });

    }   

    //Sort list
    const sort = (sortValue) => {

        //Sorting by status
        if(sortValue === "status") {
            ordersList.value.sort((a,b) => { 
                return a.status.localeCompare(b.status);
            });
        }

        //Sorting by date                                               TRIPPLE-CHECK WHEN MORE ORDERS ARE ADDED
        if(sortValue === "date") {
            ordersList.value.sort((a,b) => { 
                return a.date.localeCompare(b.date);
            }).reverse();
        } 

        //Sorting by id
        if(sortValue === "id") {
            ordersList.value.sort((a,b) => { 
                return a.order_id - b.order_id;
            });
        }
    }

    //Compiling order and displaying
    const displayOrder = (thisOrder) => {
        console.log("testing")
        
        const orderSpec = {
            id: thisOrder.order_id,
            status: thisOrder.status,
            date: thisOrder.date,
            user: thisOrder.user_id
        }

        emits("viewOrder", orderSpec);
    }



    //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.searchTerm, searchOrder, { immediate: true } );

</script>

<style scoped>
    th:hover, tr:hover {
        cursor: pointer;
    }
</style>