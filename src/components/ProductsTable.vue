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
            <th scope="col" v-if="props.shortcut"></th>
        </tr>
    </thead>
    <!-- Tbody -->
    <tbody>
        <tr v-for="product in productsList" :key="product.product_id">
            <td data-bs-toggle="modal" data-bs-target="#product-details" @click="$emit('productId', product.product_id)">{{product.name}}</td>
            <td data-bs-toggle="modal" data-bs-target="#product-details" @click="$emit('productId', product.product_id)">{{product.label}}</td>
            <td data-bs-toggle="modal" data-bs-target="#product-details" @click="$emit('productId', product.product_id)" v-if="!props.shortcut">{{product.price}}</td>
            <td v-if="!props.shortcut">
                <span v-if="updatingStock !== product.product_id" @click="updateInputs(product.product_id, product.status, product.amount)">{{product.status}}</span>

                <!-- Input to update status-->
                <select v-if="updatingStock === product.product_id" v-model="statusInp" class="form-select form-select-sm" id="statusInp">
                    <option value="I lager">I lager</option>
                    <option value="Beställd">Beställd</option>
                    <option value="Slut">Slut</option>
                </select>
            </td>
            <td>
                <span v-if="updatingStock !== product.product_id" @click="updateInputs(product.product_id, product.status, product.amount)">{{product.amount}}</span>

                <!-- Input to update amount-->
                <input v-if="updatingStock === product.product_id" v-model.number="amountInp" type="number" class="form-control form-control-sm" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
           
            </td>
            <td v-if="updatingStock === product.product_id">
                <!-- Button to update -->
                <button class="btn btn-warning" @click="updateStock(product.product_id, product.status, product.amount)">Uppdatera</button>
            </td>
            <td v-if="props.shortcut">
                <button class="btn btn-warning">Beställ</button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script setup>
    //Imports
    import { ref, onMounted, watch } from 'vue';
    import StockService from '@/services/StockService';

    //Variables
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
    const statusInp= ref("");
    const amountInp = ref(null);
    const updatingStock = ref(null);
    
    //When view is loaded
    onMounted(()=> {
        getProducts();
    });

    //Emits
    const emit = defineEmits(["filterOptions", "productId"])

    //Resetting all products
    const loadProducts = async() => {

        if(props.shortcut) filterLowStock();
        else productsList.value = allProducts.value;

        return;
    }

    //Getting all products
    const getProducts = async() => {
        const products = await StockService.fetchProducts();
        allProducts.value = products;

        loadProducts();
        createFilters();
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

        productsList.value = allProducts.value;

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

        //Sorting by status                      
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

    //Setting inputs to update status and amount
    const updateInputs = async(id, status, amount) => {
        updatingStock.value = id;
        statusInp.value = status;
        amountInp.value = amount;
    }

    //Updating amount and status
    const updateStock = async(id, oldAmount, oldStatus) => {

        if(amountInp.value === oldAmount && statusInp.value === oldStatus) return;

        if(amountInp.value === 0 && statusInp.value === "I lager") {
            statusInp.value = "Slut";
        }

        if(amountInp.value > 0 && statusInp.value === "Slut") {
            statusInp.value = "I lager";
        }

        updatingStock.value = null;

        const updatedProduct = {
            status: statusInp.value,
            amount: amountInp.value
        }

        await StockService.updateStock(updatedProduct, id);
        getProducts();

    }

    //Watchers
    watch(() => props.searchTerm, searchProduct, { immediate: true } ); //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => props.filters, filter); //Watching filters for changes

</script>

<style scoped>
    th:hover, tr:hover {
        cursor: pointer;
    }
</style>