export default {
    template: `

    <div class="container mt-5 card bg-dark text-light">
        <div> <h2 style="text-align:center">Home</h2>

        </div>
        <div>
            
            <div>

                <div>
                    <h5>
                        New Additions!
                    </h5>
                </div>

                <div class="griddy">
                    
 
                
                <router-link  v-for="(item, index) in fresh_prods" :key="index" :to="{ name: 'product', query: { itemId: item.product_id }}">
                <div class="card bg-dark mb-3 whitener border_white">
                    <div class="card-body">
                        <p class="card-text">{{item.product_name}}</p>
                    </div>
                    <div>
                        Rs. {{item.product_price}} /-
                    </div>
                </div>

                </router-link>


                </div>
            </div>




            <div>

                <div>
                    <h5>
                        Products you have previously bought!
                    </h5>
                </div>
                <div class="griddy">
                    
                <router-link  v-for="(item, index) in prev_prods" :key="index" :to="{ name: 'product', query: { itemId: item.product_id }}">
                    
                    <div class="card bg-dark mb-3 whitener border_white">
                        <div class="card-body">
                            <p class="card-text">{{item.product_name}}</p>
                        </div>
                        <div>
                            Rs. {{item.product_price}} /-
                        </div>
                    </div>
                


                </router-link>





                </div>
            </div>            



        </div>

    </div>

    `,
    data() {
        return {
            fresh_prods: [],
            prev_prods: [],
        }
    },
    created() {

        this.getfresh();
        this.getprev();
    },

    methods: {
        async getfresh() {
            const fresh_url = '/api/freshprods'
            const res = await fetch(fresh_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == null){
                        console.log("thse are the fresh products")
                        this.fresh_prods = dataa;
                        console.log(dataa)
                    }
                    else{
                        console.log("no fresh prods or error")
                    }
                
                }
        },

        async getprev() {
            const past_url = '/api/userpastprods'+localStorage.getItem("id")
            const res = await fetch(past_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == null){
                        console.log("thse are the bought products")
                        this.prev_prods = dataa;
                        console.log(dataa)
                    }
                    else{
                        console.log("no bought prods or error")
                    }
                
                }
        },        
    }
}