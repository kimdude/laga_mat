'use strict'

//Token
const token = localStorage.getItem("token");

export default {
    //Fetch list from local storage
    fetchOrderList() {
        const list = localStorage.getItem("orderlist");

        if(list) {
            return list;
        } else {
            return null;
        }
    },

    //Fetching all orders
    async fetchOrders() {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok){
                throw new Error;
            }

            const data = await result.json();
            return data.result;

        } catch(error) {
            console.log(error);
        }
    },

    //Fetching specific order
    async fetchOrder(type, id) {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/orders/order?" + type + "=" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok){
                throw new Error;
            }

            const data = await result.json();
            return data.result;

        } catch(error) {
            console.log(error);
        }
    }


}