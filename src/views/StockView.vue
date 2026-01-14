<template>
    <!-- Alla produkter -->
    <section class="p-4 mx-4">

        <!-- Search bar -->
        <div class="container mb-4 pb-4">
            <div class="row align-items-center">
                <label for="searchProduct" class="form-label col-1"></label>
                <div class="col-8">
                    <input v-model="searchProduct" type="text" id="searchProduct" class="form-control" placeholder="Produkt, Produkt-id, EAN-kod...">
                </div>
                <button class="col-1 btn btn-warning">Sök</button>
            </div>
        </div>

        <h2>Alla produkter</h2>
        <!-- All products -->
        <ProductsTable :shortcut="false"/>

    </section>
</template>

<script setup>
    //Imports
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import ProductsTable from '@/components/ProductsTable.vue';

    //Variables
    const router = useRouter();
    const token = localStorage.getItem("token");

    //Reactive variables
    const allProducts = ref({result: []});       
    const searchProduct = ref('');

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
            router.push = ({name: "logga_in"});
        }
    }
</script>

<style scoped>
    
</style>