'use strict'

//Token
const token = localStorage.getItem("token");

export default {

    //Getting specific user
    async fetchUser(id) {
        try{
            const result = await fetch("https://dt193g-projekt.onrender.com/admin/users/" + id, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            if(!result.ok) {
                throw new Error;
            }

            const data = await result.json();
            return data.result;

        } catch(error) {
            console.log(error);
        }
    }
}