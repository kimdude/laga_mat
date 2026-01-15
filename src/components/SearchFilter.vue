<template>
    
        <!-- Search bar -->
        <div class="container mb-4 pb-4">
            <div class="row align-items-center">
                <label for="search" class="form-label col-1"></label>
                <div class="col-8">
                    <input v-model="search" type="search" id="search" class="form-control" :placeholder="searchEx" @change="$emit('find', search)">
                </div>
                <button class="col-1 btn btn-warning" @click="$emit('find', search)">Sök</button>
            </div>
        </div>
</template>

<script setup>
    //Imports
    import { ref, watch } from 'vue';

    //Props
    const prop = defineProps({
        parent: String
    });

    //Emits
    const emit = defineEmits(['find']);

    //Reactive variables 
    const search = ref('');
    const searchEx = ref('');

    //Setting placeholder
    const updatePlaceholder = () => {
        if(prop.parent === "products"){
            searchEx.value = "Produktnamn, EAN-kod...";
        } else {
            searchEx.value = "Beställnings-id";
        }
    }

    //Watching searchterm for changes and forcing to execute immidiatley
    watch(() => prop.parent, updatePlaceholder, { immediate: true } );

</script>