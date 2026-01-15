<template>
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
        <tr v-for="product in productsList" :key="product.product_id">
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
    import { ref, onMounted, watch } from 'vue';

    //Variables
    const token = localStorage.getItem("token");
    const props = defineProps({
        shortcut: Boolean,
        searchTerm: String
    });

    //Reactive variables
    const productsList = ref([]); //Products being displayed
    const allProducts = ref([]); //Total products
    
    //When view is loaded
    onMounted(()=> {
        loadProducts();
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
                return {name: "logga_in"};
            }
            
            const data = await result.json();
            return data.result;

        } catch(error) {
            return {name: "logga_in"};
        }
    }

    //Displaying all products
    const loadProducts = async() => {
        const data = await fetchProducts();
        allProducts.value = data;

        if(props.shortcut) filterLowStock();
        else productsList.value = data;

        return;
    }

    //Filtering products low in stock
    const filterLowStock = async() => {
        const lowStock = [];

        for(const product of allProducts.value) {
            if(product.amount < 3) lowStock.push(product);
        }

        productsList.value = lowStock;

        return;
    }

    //Searching for product
    const searchProduct = () => {

        //Reseting product list
        if(props.searchTerm === "") {
            loadProducts();
            return;
        }

        productsList.value = allProducts.value.filter((product) => {
            return product.name.toLowerCase().includes(props.searchTerm.toLowerCase()) || product.ean_code.toLowerCase().includes(props.searchTerm.toLowerCase());
        });

    }   

    //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.searchTerm, searchProduct, { immediate: true } );

</script>

<style scoped>
    
</style>