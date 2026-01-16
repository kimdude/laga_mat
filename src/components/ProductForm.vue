<template>
    <!-- Form to add product -->
    <form class="container" @submit.prevent="addProduct">
        <!-- Name input -->
        <div class="m-3">
            <input v-model="nameInp" type="text" class="form-control" placeholder="Produktnamn" id="nameInp" aria-label="Produktnamn">
        </div>

        <!-- EAN-code input -->
        <div class="m-3">
            <input v-model="codeInp" type="text" class="form-control" placeholder="EAN-kod" id="codeInp" aria-label="EAN-kod">
        </div>

        <div class="row">
            <!-- Label input -->
            <div class="m-3 col"> 
                <input v-model="labelInp" type="text" class="form-control" placeholder="Märke" id="labelInp" aria-label="Märke">
            </div>

            <!-- Category input -->
            <div class="m-3 col">
                <input v-model="categoryInp" type="text" class="form-control" placeholder="Kategori" id="categoryInp" aria-label="Kategori">
            </div>
        </div>

        <!-- Description-code input -->
        <div class="m-3">
            <textarea v-model="descrInp" class="form-control" placeholder="Beskrivning" id="descrInp" aria-label="Produktbeskrivning"></textarea>
        </div>

        <div class="row">
        <!-- Price input -->
            <div class="input-group m-3 col">
                <input v-model.number="priceInp" type="number" class="form-control form-control-sm" placeholder="Försäljningspris" id="priceInp" aria-label="Försäljningspris">
                <span class="input-group-text">kr</span>
            </div>

            <!-- Amount input -->
            <div class="input-group m-3 col">
                <input v-model.number="amountInp" type="number" class="form-control" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
                <span class="input-group-text">st</span>
            </div>

            <!-- shelf input -->
            <div class="m-3 col">
                <select v-model="shelfInp" class="form-select" id="shelfInp">
                    <option disabled value="">Välj hyllplan</option>
                    <option v-for="shelf in shelfs" :key="shelf.shelf_id" :value="shelf.shelf_id">{{ shelf.shelf }}</option>
                </select>
            </div>
        </div>

        <!-- Error message -->
        <p v-if="errorMessage !== ''" class="alert alert-warning" role="alert"> {{ errorMessage }} </p>

        <!-- Submit button -->
        <button type="submit" class="btn btn-warning d-block mx-auto mt-4">Lägg till</button>
    </form>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    onMounted(() => {
        fetchShelfs();
    })

    //Emits
    const emit = defineEmits(["addedProduct"]);
    
    //Variables
    const token = localStorage.getItem("token");
    const router = useRouter();

    //Form inputs
    const nameInp = ref("");
    const labelInp = ref("");
    const codeInp = ref("");
    const categoryInp = ref("");
    const descrInp = ref("");
    const priceInp = ref(null);
    const amountInp = ref(null);
    const shelfInp = ref("");

    const status = ref("");
    const errorMessage = ref("");

    //Reactive variables (more)
    const shelfs = ref([]);

    //Fetching shelfs
    const fetchShelfs = async() => {
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/shelfs", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok) {
                router.push({name: "logga_in"});
            }

            const data = await result.json();
            shelfs.value = data.result;

            return;

        } catch(error) {
            router.push({name: "logga_in"});
        }
    }

    //Adding product
    const addProduct = async() => {

        errorMessage.value = "";
        const errors = [];

        //Validating inputs
        if(nameInp.value === "") errors.push("produktnamn");
        if(codeInp.value === "") errors.push("EAN-kod");
        if(labelInp.value === "") errors.push("märke");
        if(categoryInp.value === "") errors.push("kategori");
        if(descrInp.value === "") errors.push("produktbeskrivning");
        if(priceInp.value === null) errors.push("pris");
        if(amountInp.value === null) errors.push("antal i lager");
        if(shelfInp.value === "") errors.push("hyllplan");

        if(errors.length > 0) {
            const errorsStr = errors.join(", ");
            return errorMessage.value = "Du måste ange " + errorsStr + ".";
        }

        if(codeInp.value.length < 8 || codeInp.value.length > 13 ) return errorMessage.value = "EAN-kod måste vara mellan 8-13 siffror.";

        //Setting status
        if(amountInp.value > 0) status.value = "I lager";
        else status.value = "Slut";

        const newProduct = {
            ean_code: codeInp.value,
            name: nameInp.value,
            label: labelInp.value,
            category: categoryInp.value,
            description: descrInp.value,
            price: priceInp.value,
            amount: amountInp.value,
            status: status.value,
            shelf_id: shelfInp.value
        };

        //Fetch API
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(newProduct)
            });

            if(!result.ok) {
                router.push({name: "logga_in"});            //ÄNDRA TILL KONTROLL FÖR LÄNGDE PÅ INPUTS ETC
            }

            const data = await result.json();
            shelfs.value = data.result;

            emit("addedProduct");

            return;

        } catch(error) {
            router.push({name: "logga_in"});
        }
    }

</script>

<style scoped>
    form {
        border-left: solid 5px #0dcaf0;
    }
</style>