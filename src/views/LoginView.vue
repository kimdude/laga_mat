<template>
    <h1>
        <img src="../assets/images/logo.svg" width="150" alt="Logo">
    </h1>
    <h2>Logga in</h2>
    <!-- Login form -->
    <form class="container" @submit.prevent="login">
        <div class="form-floating">
            <input v-model="username" type="text" id="username" class="form-control" placeholder="Användarnamn">
            <label for="username" class="form-label">
                Användarnamn
            </label>
        </div>
        <div class="form-floating mt-3">
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Lösenord">
            <label for="password" class="form-label">
                Lösenord
            </label>
        </div>
        <!-- Error message -->
        <p v-if="errorMessage !== ''" class="alert alert-warning" role="alert">{{ errorMessage }}</p>
        <!-- Submit btn -->
        <button type="submit" class="btn btn-info mt-4 float-end">Logga in</button>
    </form>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    //Emits
    const emits = defineEmits(['childCompLogin']);

    emits('childCompLogin', true);

    //Variables
    const router = useRouter();

    //Form variables
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = async() => {

        //Validating inputs
        if(username.value === "" || password.value === "") {
            return errorMessage.value = "Ange användarnamn och lösenord."
        }

        //Creating object with user inputs
        const user = {
            username: username.value,
            password: password.value
        }

        //Calling API
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            //Saving token if result ok
            if(result.ok) {
                const data = await result.json();

                localStorage.setItem("token", data.result.token);

                router.push({name: "kontrollpanel"});

            } else {
                errorMessage.value = "Felaktigt användarnamn eller lösenord.";
            }

        } catch(error) {
            errorMessage.value = "Ett fel har uppstått. Vänligen försök igen senare.";
            console.log("An error occurred: " + error.message);
        }
        
    }

</script>

<style scoped>
    
</style>