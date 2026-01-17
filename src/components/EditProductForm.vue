<template>
    <!-- Content for modal -->
    <div class="modal-content p-4">
        <!-- Header -->
        <div class="model-header container-fluid">
            <div class="row">
                <h2 class="col">Redigera Produkt</h2>
                <button type="button" class="btn-close col-1" aria-label="Stäng" @click="$emit('hideEdit')"></button>
            </div>

            <!-- Update title -->
            <div class="form-floating mt-3">
                <input v-model="nameInp" type="text" class="form-control" placeholder="Produktnamn" id="nameInp" aria-label="Produktnamn">
                <label for="nameInp" class="form-label">Produktnamn</label>
            </div>

            <!-- Update description -->
            <div class="form-floating mt-3">
                <textarea v-model="descrInp" class="form-control" placeholder="Beskrivning" id="descrInp" aria-label="Produktbeskrivning"></textarea>
                <label for="descrInp" class="form-label">Produktbeskrivning</label>
            </div>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            <!-- Update label -->
            <div class="col form-floating"> 
                <input v-model="labelInp" type="text" class="form-control" placeholder="Märke" id="labelInp" aria-label="Märke">
                <label for="labelInp" class="form-label">Märke</label>
            </div>

            <!-- Update category -->
            <div class="col form-floating mt-3">
                <input v-model="categoryInp" type="text" class="form-control" placeholder="Kategori" id="categoryInp" aria-label="Kategori">
                <label for="categoryInp" class="form-label">Kategori</label>
            </div>
            
            <h3 class="mt-4">Lager info</h3>
            <!-- Update status -->
            <select v-model="statusInp" class="form-select form-select-sm mt-3" id="statusInp">
                <option disabled value="">Välj status</option>
                <option value="I lager">I lager</option>
                <option value="Beställd">Beställd</option>
                <option value="Slut">Slut</option>
            </select>

            <!-- Update amount -->
            <div class="input-group col form-floating mt-3">
                <input v-model.number="amountInp" type="number" class="form-control" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
                <label for="amountInp" class="form-label">Antal i lager</label>
                <span class="input-group-text">st</span>
            </div>

            <!-- Update shelf -->
            <div class="col mt-3">
                <select v-model="shelfInp" class="form-select" id="shelfInp">
                    <option disabled value="">Välj hyllplan</option>
                    <option v-for="shelf in shelfs" :key="shelf.shelf_id" :value="shelf.shelf_id">{{ shelf.shelf }}</option>
                </select>
            </div>

            <!-- Update price -->
            <div class="input-group form-floating mt-3 col">
                <input v-model.number="priceInp" type="number" class="form-control form-control-sm" placeholder="Försäljningspris" id="priceInp" aria-label="Försäljningspris">
                <label for="priceInp" class="form-label">Försäljningspris</label>
                <span class="input-group-text">kr</span>
            </div>
        </div>

        <!-- Footer with edit-buttons -->
        <div class="model-footer">
            <hr>
            <p v-if="errorMessage !== ''"></p>
            <button type="button" class="btn btn-warning float-end" @click="updateProduct">Uppdatera</button> <!-- LÄGG TILL data-bs-dismiss="modal"-->
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import StockService from '@/services/StockService';

    onMounted(() => {

        getShelfs();
    })

    //Props
    const props = defineProps(["product"]);

    //Emits
    const emits = defineEmits(["hideEdit"]);

    //Reactive variables
    const errorMessage = ref("");

    const nameInp = ref(props.product.name);
    const descrInp = ref(props.product.description);
    const labelInp = ref(props.product.label);
    const categoryInp = ref(props.product.category);
    const statusInp = ref(props.product.status);
    const amountInp = ref(props.product.amount);
    const shelfInp = ref(props.product.shelf);
    const priceInp = ref(props.product.price);
    const shelfs = ref([]);

    //Getting shelfs
    const getShelfs = async() => {
        const result = await StockService.fetchShelfs();
        shelfs.value = result;
    }

    //Updating product
    const updateProduct = async() => {
        const errors = []

        //Checking if status or amount need to be updated
        if(statusInp.value !== props.product.status || amountInp.value !== props.product.amount) updateStock();

        //Validating inputs
        if(nameInp.value === "") errors.push("produktnamn");
        if(descrInp.value === "") errors.push("beskrivning");
        if(labelInp.value === "") errors.push("märke");
        if(categoryInp.value === "") errors.push("kategori");

        if(errors.length > 0) {
            const errorsStr = errors.join(", ");
            return errorMessage.value = "Du måste ange " + errorsStr + ".";
        }

        //Updating product
        const updatedProduct = {
            ean_code: props.product.code,
            name: nameInp.value,
            description: descrInp.value,
            label: labelInp.value,
            category: categoryInp.value,
            shelf_id: shelfInp.value,
            price: priceInp.value
        }

        await StockService.updateProduct(updatedProduct, props.product.id);

        emits("hideEdit");
    }

    //Updating stock
    const updateStock = async () => {

        //Validating status
        if(amountInp.value === 0 && statusInp.value === "I lager") {
            statusInp.value = "Slut";
        }

        if(amountInp.value > 0 && statusInp.value === "Slut") {
            statusInp.value = "I lager";
        }

        //Updating product
        const updatedStock = {
            status: statusInp.value,
            amount: amountInp.value
        }

        await StockService.updateStock(updatedStock, props.product.id);
    }



</script>