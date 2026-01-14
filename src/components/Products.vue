<template>
    <table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">Produkt</th>
            <th scope="col">Märke</th>
            <th scope="col">Pris</th>
            <th scope="col">Lager&shy;status</th>
            <th scope="col">Antal</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in allProducts" :key="product.product_id">
            <td>{{product.name}}</td>
            <td>{{product.label}}</td>
            <td>{{product.price}}</td>
            <td>{{product.status}}</td>
            <td>{{product.amount}}</td>
        </tr>
    </tbody>
</table>
</template>

<script setup>
    //Imports
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    //Variables
    const router = useRouter();
    const token = localStorage.getItem("token");

    //Reference variables
    let allProducts = ref({result: []});                    

    //When view is loaded
    onMounted(()=> {
        fetchProducts();
    });

    //Fetching all products
    const fetchProducts = async() => {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/products", {
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
            allProducts.value = data.result;
            
            return;

        } catch(error) {
            console.log(error)
            /* router.push = ({name: "logga_in"});  */
        }
    }
</script>

<style scoped>
    
</style>