<template>
    <!-- Alla beställningar -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Datum</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in ordersList.value" :key="order.order_id">
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

    //Variables
    const token = localStorage.getItem("token");
    const props = defineProps({
        searchTerm: String
    });

    //Reference variables
    const ordersList = ref([]); //Products being displayed
    const allOrders = ref([]); //Total products

    //When view is loaded
    onMounted(()=> {
        loadOrders();
    });

    //Formating order-data
    const setData = async(data) => {

        for(const order of data.result) {

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

        allOrders.value = data.result;
        return;

    }

    //Getting all orders
    const fetchOrders = async() => {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok){ 
                return {name: "logga_in"};
            }

            const data = await result.json();
            await setData(data);

            return;

        } catch(error) {
            return {name: "logga_in"};
        }
    }

    //Displaying all products
    const loadOrders = async() => {
        await fetchOrders();
        ordersList.value = allOrders
    }

    //Searching for order
    const searchOrder = () => {

        //Reseting product list
        if(props.searchTerm === "") {
            loadOrders();
            return;
        }

        ordersList.value = allOrders.value.filter((order) => {
            return order.order_id.includes(props.searchTerm);
        });

    }   

    //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.searchTerm, searchOrder, { immediate: true } );

</script>