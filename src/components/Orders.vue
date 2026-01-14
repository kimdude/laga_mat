<template>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const token = localStorage.getItem("token");
    const allOrders = [];

    const fetchOrders = async() => {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": token
                }
            });

            if(!result.ok) return router.push("/"); 

            console.log(result)

        } catch(error) {
            /* router.push("/"); */

            console.log(error);
        }
    }
</script>