export default {
    template: `
    <div class="container mt-5">
    <div class="alert alert-success">Your Cart</div>

    <div class="card bg-dark text-white">
        <div class="card-body">
            <div v-for="(item, index) in cart_items" :key="index" class="d-flex justify-content-between align-items-center mb-3 bottom_sep">
                <div>
                    <button class="btn btn-danger" @click="deleteItem(index, item.cart_id)">🗑</button>
                </div>
                <div>
                    <span>{{ item.product_name }}</span>
                </div>
                <div class="d-flex align-items-center">
                    <div class="mr-3">
                        No. {{ item.prod_count }}
                    </div>
                    <div class="mr-3">
                        ₹ {{ item.product_price * item.prod_count }} /-
                    </div>
                    <div class="d-flex">
                        <button class="btn btn-primary mr-2" @click="incrementCount(index, item.cart_id)">+</button>
                        <button class="btn btn-primary" @click="decrementCount(index, item.cart_id)">-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-between mt-3">
        <div>
            <button class="btn btn-success" @click="checkout_button()">🛒 Checkout</button>
        </div>
        <div>
            <strong>Total:</strong> ₹ {{ total_price }}
        </div>
    </div>
</div>

    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            user_id: localStorage.getItem("id"), 
            cart_items: [], 
            total_price: 0, 


            
        }
    },
    created() {
        // console.log("created")
        // console.log(this.token)
        // console.log(this.role)
        // console.log(this.user_id)

        this.verify_cart(this.user_id)
    },
    mounted() {

        this.fetch_cart(this.user_id)

        this.tot_price()

    },
    methods: {

        async verify_cart(user_id) {
            const verification_url = '/api/cartverification/' + user_id
            const res=await fetch(verification_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == "Verification Complete"){
                        console.log("cart verified")
                    }
                    else{
                        console.log("cart not verified")
                    }
                
                }
        },
        async fetch_cart(user_id) {
            const cart_url = '/api/cart/' + user_id
            const res=await fetch(cart_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    this.cart_items = dataa
                    this.tot_price()
                
                }
        },

        async incrementCount(index, cart_id) {


            const cart_plus_url = '/api/addonecart/' + cart_id
            const res=await fetch(cart_plus_url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    
                    const dataa=await res.json();
                    if(dataa.message == null){
                    console.log(dataa);
                    this.cart_items[index].prod_count += 1
                    this.tot_price()
                    }
                
                }


        },
        async decrementCount(index, cart_id) {
            const cart_min_url = '/api/remonecart/' + cart_id
            const res=await fetch(cart_min_url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    
                    const dataa=await res.json();
                    if(dataa.message == null){
                    console.log(dataa);
                    this.cart_items[index].prod_count -= 1
                    this.tot_price()
                    }
                
                }


            
        },
        async deleteItem(index, cart_id) {
            console.log(index)
            const cart_delete_url = '/api/deletecart/' + cart_id
            const res=await fetch(cart_delete_url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){

                    const dataa=await res.json();
                    console.log(dataa);
                    this.cart_items.splice(index, 1)
                    this.tot_price()
                
                }
        },
         async tot_price() {
            
            this.total_price = 0
            for (let i = 0; i < this.cart_items.length; i++) {
                
                this.total_price += this.cart_items[i].product_price * this.cart_items[i].prod_count
            }
            
        },
        async checkout_button() {
            console.log("checkout")
            const checkout_url = '/api/cartpurchaser/' + this.user_id
            const res=await fetch(checkout_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    
                    const dataa=await res.json();
                    console.log(dataa);
                    if(dataa.message == "Purchase successful"){
                        console.log("checkout complete")
                        this.cart_items = []
                        this.total_price = 0
                        this.$router.push({ name: 'userhome' })
                    }
                
                }

            
        }

    }


}