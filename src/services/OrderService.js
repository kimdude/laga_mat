'use strict'

//Token
const token = localStorage.getItem("token");

export default {

    //Fetching all orders
    async fetchOrder() {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer: " + token
                }
            });

            if(!result.ok){
                throw new Error;
            }


        } catch(error) {
            console.log(error);
        }
    },

    //Fetching specific order
    async fetchOrder(id) {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders/" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer: " + token
                }
            });

            if(!result.ok){
                throw new Error;
            }


        } catch(error) {
            console.log(error);
        }
    }


}