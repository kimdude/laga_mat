<template>
    <table class="table table-striped">
    <!-- Thead -->
    <thead>
        <tr>
            <th scope="col" @click="sort('product')">Produkt</th>
            <th scope="col" @click="sort('label')">Märke</th>
            <th scope="col" v-if="!props.shortcut" @click="sort('price')">Pris</th>
            <th scope="col" v-if="!props.shortcut" @click="sort('status')">Lager&shy;status</th>
            <th scope="col" @click="sort('amount')">Antal</th>
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
        searchTerm: String,
        filters: Object
    });

    //Reactive variables
    const productsList = ref([]); //Products being displayed
    const allProducts = ref([]); //Total products
    const categories = ref([]);
    const labels = ref([]);
    
    //When view is loaded
    onMounted(()=> {
        fetchProducts();
    });

    //Emits
    const emit = defineEmits(["filterOptions"])

    //Resetting all products
    const loadProducts = async() => {

        if(props.shortcut) filterLowStock();
        else productsList.value = allProducts.value;

        return;
    }

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
            allProducts.value = data.result;

            loadProducts();
            createFilters();

            return;

        } catch(error) {
            return {name: "logga_in"};
        }
    }

    //Filtering products low in stock
    const filterLowStock = () => {
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

    //Getting categories and labels
    const createFilters = () => {

        //Getting categories and filtering for duplicates
        const allCategories = allProducts.value.map((product) => product.category);
        categories.value = allCategories.filter((category, index) => allCategories.indexOf(category) === index);

        //Getting labels and filtering for duplicates
        const allLabels = allProducts.value.map((product) => product.label);
        labels.value = allLabels.filter((label, index) => allLabels.indexOf(label) === index);

        emit("filterOptions", categories, labels);
    }

    //Filtering products
    const filter = () => {

        productsList.value = allProducts.value

        //Filtering categories
        if(props.filters.category !== "") {
            productsList.value = productsList.value.filter((product, index) => product.category === props.filters.category);
        }

        //Filtering labels
        if(props.filters.label !== "") {
            productsList.value = productsList.value.filter((product, index) => product.label === props.filters.label);
        }

        //Filtering status
        if(props.filters.status !== "") {
            productsList.value = productsList.value.filter((product, index) => product.status=== props.filters.status);
        }

    }

    //Sort products
    const sort = (sortValue) => {

        //Sorting by name
        if(sortValue === "product") {
            productsList.value.sort((a,b) => {
                return a.name.localeCompare(b.name);
            });
        }

        //Sorting by label
        if(sortValue === "label") {
            productsList.value.sort((a,b) => {
                return a.label.localeCompare(b.label);
            });
        }

        //Sorting by status                         FUNKAR EJ ATM
        if(sortValue === "status") {
            productsList.value.sort((a,b) => {
                return a.status.localeCompare(b.status);
            });
        }

        //Sorting by price
        if(sortValue === "price") {
            productsList.value.sort((a,b) => {
                return a.price - b.price;
            });
        }

        //Sorting by amount
        if(sortValue === "amount") {
            productsList.value.sort((a,b) => {
                return a.amount - b.amount;
            });
        }
    }

    //Watchers
    watch(() => props.searchTerm, searchProduct, { immediate: true } ); //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.filters, filter); //Watching filters for changes

</script>

<style scoped>
    
</style>