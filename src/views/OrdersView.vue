<template>
    <!-- Alla beställningar -->
    <section>
        <h2>Alla inköp</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Inköp</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in allOrders" :key="order.order_id">
                    <td>{{order.order_id}}</td>
                    <td>{{order.date}}</td>
                    <td>{{order.status}}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
    //Imports
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    //Variables
    const router = useRouter();
    const token = localStorage.getItem("token");

    //Reference variables
    let allOrders = ref({result: []});                    

    //When view is loaded
    onMounted(()=> {
        fetchOrders();
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
                router.push = ({name: "logga_in"}); 
                return;
            }

            const data = await result.json();
            await setData(data);

        } catch(error) {
            router.push = ({name: "logga_in"}); 
            return;
        }
    }

</script>

<style scoped>
    
</style>