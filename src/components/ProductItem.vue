<template>
    <!-- Content for modal -->
    <div class="modal-content p-4">

        <!-- Header -->
        <div class="model-header container-float">
            <div class="row">
                <h2 class="modal-title col">{{ product?.name }}</h2>
                <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Stäng" @click="$emit('hideProduct',null)"></button>
            </div>
            <p>{{ product?.description }}</p>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            <div class="container-float">
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
            <h3 class="mt-4">Inköp</h3>
            <p>Beställd:</p>
            <p>Antal: </p>
            <p>Beställd av: </p>

            <h3 class="mt-4">Skapad</h3>
            <p>Skapad: {{ product?.added }}</p>
        </div>

        <!-- Footer with edit-buttons -->
        <div class="model-footer">
            <hr>
            <button type="button" class="btn btn-info float-end">Redigera</button>
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
    const emits = defineEmits(["hideProduct", "removedProduct"]);

    //Props
    const props = defineProps(["product"]);

    //Variables

    //Reactive variables
    const product = ref({});
    const shelfUnit = ref("");

    //Getting specific products
    const getProduct = async() => {
        const productDetails = await StockService.fetchProduct(props.product);
        product.value = productDetails;

        getShelfs();
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
    const getOrder = () => {

        const result = OrderService.fetchOrder();
        console.log(result.result)
    }

    //Remove product
    const removeProduct = async() => {
        await StockService.deleteProduct(product.value.product_id);

        emits("removedProduct", 'Produkt borttagen');
    }


</script>