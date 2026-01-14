<template>
    <h2 v-if="props.shortcut">Få i lager ({{ productsLength }})</h2>
    <table class="table table-striped">
    <!-- Thead -->
    <thead>
        <tr>
            <th scope="col">Produkt</th>
            <th scope="col">Märke</th>
            <th scope="col" v-if="!props.shortcut">Pris</th>
            <th scope="col" v-if="!props.shortcut">Lager&shy;status</th>
            <th scope="col">Antal</th>
            <th v-if="props.shortcut">Beställ fler</th>
        </tr>
    </thead>
    <!-- Tbody -->
    <tbody>
        <tr v-for="product in allProducts" :key="product.product_id">
            <td>{{product.name}}</td>
            <td>{{product.label}}</td>
            <td v-if="!props.shortcut">{{product.price}}</td>
            <td v-if="!props.shortcut">{{product.status}}</td>
            <td>{{product.amount}}</td>
            <td v-if="props.shortcut"><button class="btn btn-warning">Beställ</button></td>
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
    const props = defineProps({
        shortcut: Boolean
    });

    //Reactive variables
    const allProducts = ref({result: []});
    const productsLength = ref(0);
    
    //When view is loaded
    onMounted(()=> {

        if(props.shortcut) fetchLowStock();
        else loadProducts();
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
            return data.result;

        } catch(error) {
            console.log(error)
            router.push = ({name: "logga_in"});
        }
    }

    //Displaying all products
    const loadProducts = async() => {
        const data = await fetchProducts();
        allProducts.value = data;
    }

    //Filtering products low in stock
    const fetchLowStock = async() => {
        const data = await fetchProducts();
        const lowStock = [];

        for(const product of data) {
            if(product.amount < 3) lowStock.push(product);
        }

        allProducts.value = lowStock;
        productsLength.value = lowStock.length;

        return;
    }

</script>

<style scoped>
    
</style>