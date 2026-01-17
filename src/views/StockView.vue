<template>
    <!-- Alla produkter -->
    <section class="p-4 mx-4">
        <!-- Confimation -->
        <div v-if="confirmMessage !== ''" class="alert alert-warning position-absolute top-50 start-50 translate-middle" role="alert"> {{ confirmMessage }}</div>

        <!-- Product details -->
        <div class="modal" id="product-details">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <ProductItem v-if="displayProduct" :shortcut="false" :product="productId" @hide-product="showProduct" @edit-product="editProduct" @removed-product="refreshList('Produkt borttagen')"/>
            </div>
        </div>

        <!-- Edit form -->
        <div class="modal modal-lg" ref="edit-product">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <EditProductForm v-if="displayEdit" :product="productObj" @hide-edit="showEdit"/>
            </div>
        </div>

        <!-- Search bar -->
        <SearchFilter parent="products" @find="searchProduct"/>

        <!-- Buttons for filter and add -->
        <div class="container-float">
            <div class="row">
                <h2 class="col">Lager</h2>
                <img src="../assets/images/plus_icon.svg" class="col-1 p-1" title="Lägg till produkt" @click="toggleAddProduct">
                <img src="../assets/images/filter_icon.svg" class="col-1 p-1" title="Filtrera produkter" @click="toggleFilter">   
            </div>
        </div>

        <!-- Filters -->        
        <ProductsFilter v-if="displayFilters" class="my-4 pt-2 pb-3" :category-values="categorySelect" :label-values="labelSelect" @user-filters="filter"/>

        <!-- Form to add product -->
        <ProductForm v-if="displayAdd" class="my-4 pt-2 pb-3" @added-product="refreshList('Produkt tillagd')"/>

        <!-- All products -->
        <ProductsTable class="my-4":shortcut="false" :search-term="product" :filters="userFilter" @filter-options="createFilter" @product-id="showProduct"/>
    </section>
</template>

<script setup>
    //Imports
    import { ref, useTemplateRef, onMounted } from 'vue';
    import { Modal } from 'bootstrap';
    import ProductsTable from '@/components/ProductsTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';
    import ProductsFilter from '@/components/ProductsFilter.vue';
    import ProductForm from '@/components/ProductForm.vue';
    import ProductItem from '@/components/ProductItem.vue';
    import EditProductForm from '@/components/EditProductForm.vue';

    onMounted(() => {
        //Creating modal instance
        modalFunctions = new Modal(editModal.value);
    })

    //Reactive variables
    const confirmMessage = ref("");
    const editModal = useTemplateRef("edit-product");
    let modalFunctions;

    //Variables to see and edit products
    const product = ref("");
    const productId= ref(null);
    const productObj = ref({});
    const displayProduct = ref(false);
    const displayEdit = ref(false);

    //Variables to add products
    const displayAdd = ref(false);

    //Variables to filter products
    const categorySelect = ref([]);
    const labelSelect = ref([]);
    const displayFilters = ref(false);
    const userFilter = ref({
        category: "",
        label: "",
        status: ""
    });

    //Sending search to child component
    const searchProduct = (searchTerm) => {
        product.value = searchTerm;
        return;
    }

    //Toggling filter
    const toggleFilter = () => {
        if(displayFilters.value === false) {
            displayFilters.value = true;
            displayAdd.value = false;
        } else {
            displayFilters.value = false;
        }
    }

    //Toggling add product
    const toggleAddProduct = () => {
        if(displayAdd.value === false) {
            displayAdd.value = true;
            displayFilters.value = false;
        } else {
            displayAdd.value = false;
        }
    }

    //Setting filter values
    const createFilter = (categories, labels) => {
        categorySelect.value = categories.value;
        labelSelect.value = labels.value;
    }

    //Applying user filter
    const filter = (category, label, status) => {
        userFilter.value = { category, label, status }
        toggleFilter();
    }

    //Setting confirm message when product added or deleted
    const refreshList = (message) => {

        confirmMessage.value = message;
        setTimeout(() => confirmMessage.value = "", 5000);

        if(message === "Produkt borttagen") showProduct(null);
        else toggleAddProduct();
    }

    //Setting product id and toggling modal
    const showProduct = (id) => {
        productId.value = id;

        if(displayProduct.value === false) return displayProduct.value = true;
        else return displayProduct.value = false;
        
    }

    //Toggling edit-modal
    const showEdit = () => {

        if(displayEdit.value === false) {
  
            //Hiding product
            displayProduct.value = false;
            displayEdit.value =  true;

            //Controlling modal manually to 
            modalFunctions.show();

            return;

        } else {
            //Hiding edit
            displayEdit.value =  false;
            modalFunctions.hide();

            return;
        } 
    }

    //Setting product to edit
    const editProduct = (details) => {
        productObj.value = details;
        showEdit();
    }

</script>

<style scoped>
    img {
        width: 35px;
    }

    img:hover {
        cursor: pointer;
    }
</style>