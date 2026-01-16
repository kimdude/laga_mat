'use strict'


//Token
const token = localStorage.getItem("token");

export default {

    //Fetching all products
    async fetchProducts() {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/products", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok){ 
                router.push({name: "logga_in"});
            }
            
            const data = await result.json();

            return data.result;

        } catch(error) {
            router.push({name: "logga_in"});
        }
    },

    //Fetching specific product
    async fetchProduct(id) {
        try {
            const result = await fetch("https://dt193g-projekt.onrender.com/products/" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok) {
                console.log(error);
            }

            const data = await result.json();
            
            //FORMAT DATE

            return data.result;

        } catch(error) {
            console.log(error);
            //OMDIRIGERA ELLER KONTROLLERA ID
        }
    },

    //Adding product
    async addProduct(newProduct) {
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
                throw new Error            //ÄNDRA TILL KONTROLL FÖR LÄNGDE PÅ INPUTS ETC
            }

            const data = await result.json();

            return data.result;

        } catch(error) {
            console.log(error)
        }
    },

    //Update product
    async updateProduct(updatedProduct, id) {
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/products/" + id, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(updatedProduct)
            });

            if(!result.ok) {
                throw new Error            //ÄNDRA TILL KONTROLL FÖR LÄNGDE PÅ INPUTS ETC
            }

            const data = await result.json();

            return data.result;

        } catch(error) {
            console.log(error)
        }
    },

    //Update stock
    async updateStock(updatedStock, id) {
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/products/" + id + "/stock", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(updatedStock)
            });

            if(!result.ok) {
                throw new Error            //ÄNDRA TILL KONTROLL FÖR LÄNGDE PÅ INPUTS ETC
            }

            const data = await result.json();

            return data.result;

        } catch(error) {
            console.log(error)
        }
    },

    //Update stock
    async deleteProduct(id) {
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/products/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok) {
                throw new Error;            //ÄNDRA TILL KONTROLL FÖR LÄNGDE PÅ INPUTS ETC
            }

            const data = await result.json();

            return data;

        } catch(error) {
            console.log(error)
        }
    },

    //Fetching shelfs
    async fetchShelfs() {
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
            return data.result;

        } catch(error) {
            router.push({name: "logga_in"});
        }
    }
}