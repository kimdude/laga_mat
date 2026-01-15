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
            <tr v-for="order in ordersList" :key="order.order_id">
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
    const ordersList = ref([]); //Orderss being displayed
    const allOrders = ref([]); //Total orders

    //When view is loaded
    onMounted(()=> {
        fetchOrders();
    });

    //Fetching all orders
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
            allOrders.value = data.result;

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

            await loadOrders();
            return;

        } catch(error) {
            return {name: "logga_in"};
        }
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

    //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.searchTerm, searchOrder, { immediate: true } );

</script>

<style scoped>
    th:hover {
        cursor: pointer;
    }
</style>