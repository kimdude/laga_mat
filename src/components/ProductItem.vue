<template>
    <!-- Content for modal with product details -->
    <div class="modal-content p-4">

        <!-- Header -->
        <div class="model-header container-fluid">
            <div class="row">
                <h2 class="modal-title col">{{ product?.name }}</h2>
                <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Stäng" @click="$emit('hideProduct',null)"></button>
            </div>
            <p>{{ product?.description }}</p>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            <div class="container-container-fluid">
                <div class="row">
                    <p class="col">Märke: {{ product?.label }}</p>
                    <p class="col">Kategori: {{ product?.category }}</p>
                </div>
            </div>

            <h3 class="mt-4">Varu-id</h3>
            <p>Produkt-id: {{ product?.product_id }}</p>
            <p>EAN-kod: {{ product?.ean_code }}</p>
            
            <h3 class="mt-4">Lager info</h3>
            <p>Lagerstatus: {{ product?.status }}</p>
            <p>Antal: {{  product?.amount }} st</p>
            <p>Hyllplan: {{ shelfUnit }} </p>
            <p>Försäljningspris: {{ product?.price }} kr</p>

            <!-- VISA BARA OM STATUS ÄR BESTÄLLD -->
            <div v-if="orderDate !== ''">
                <h3 class="mt-4">Inköp</h3>
                <p>Beställd: {{ orderDate }}</p>
                <p>Antal: {{ orderAmount }}</p>
                <p>Beställd av: {{ orderedBy }}</p>
            </div>

            <h3 class="mt-4">Skapad</h3>
            <p>Skapad: {{ product?.added }}</p>
        </div>

        <!-- Footer with edit-buttons -->
        <div class="model-footer">
            <hr>
            <button v-if="!shortcut" type="button" class="btn btn-info float-end" @click="editProduct" data-bs-dismiss="modal">Redigera</button>
            <button type="button" class="btn btn-warning float-end mx-2" @click="removeProduct" data-bs-dismiss="modal">Ta bort</button>
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { onMounted, ref } from 'vue';

    //Imported services
    import OrderService from '@/services/OrderService';
    import StockService from '@/services/StockService';

    onMounted(() => {
        if(props.product !== null) getProduct();
    })

    //Emits
    const emits = defineEmits(["hideProduct", "editProduct","removedProduct"]);

    //Props
    const props = defineProps(["product", "shortcut"]);

    //Reactive variables
    const shortcut = ref(props.shortcut);

    const product = ref({});
    const shelfUnit = ref("");
    const orderDate = ref("");
    const orderAmount = ref(null);
    const orderedBy = ref("");

    //Getting specific products
    const getProduct = async() => {
        const productDetails = await StockService.fetchProduct(props.product);
        product.value = productDetails;

        //Formating date
        const date = new Date(product.value.added);
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate();

        if(month <= 9) month = `0${month}`;
        if(day <= 9) day = `0${day}`;

        const formatedDate = `${year}-${month}-${day}`;

        product.value.added = formatedDate;

        getShelfs();

        if(product.value.status === "Beställd") {
            getOrder();
        }
    }

    //Setting correct shelf unit
    const getShelfs = async() => {

        const allShelfs = await StockService.fetchShelfs();

        for(const shelf of allShelfs) {
            if(shelf.shelf_id === product.value.shelf_id) {
                shelfUnit.value = shelf.shelf;
                break;
            }
        } 
    }

    //Getting order info
    const getOrder = async() => {

        const result = await OrderService.fetchOrder("productId",product.value.product_id);

        for(const order of result) {
            if(order.product_id === product.value.product_id && order.status === false) { 
                orderAmount.value = order.amount;
                orderedBy.value = order.user_id;                        //HÄMTA ANVÄNDARNAMN

                //Formating date
                const date = new Date(order.date);
                let year = date.getFullYear();
                let month = date.getMonth() +1;
                let day = date.getDate();

                if(month <= 9) month = `0${month}`;
                if(day <= 9) day = `0${day}`;

                const formatedDate = `${year}-${month}-${day}`;

                orderDate.value = formatedDate;

                break;
            }
        } 
    }

    //Editing product
    const editProduct = () => {
        const compiledProduct = {
            id: product.value.product_id,
            code: product.value.ean_code,
            name: product.value.name,
            label: product.value.label,
            category: product.value.category,
            description: product.value.description,
            price: product.value.price,
            shelf: product.value.shelf_id,
            status: product.value.status,
            amount: product.value.amount
        }
    
        emits('editProduct', compiledProduct);
        
        
        // data-bs-toggle="modal" data-bs-target="#edit-product" but through js??
    }

    //Remove product
    const removeProduct = async() => {
        await StockService.deleteProduct(product.value.product_id);

        emits("removedProduct", 'Produkt borttagen');
    }

</script>