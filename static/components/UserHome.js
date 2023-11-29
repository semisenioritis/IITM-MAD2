export default {
    template: `

    <div>
        <div> Home

        </div>
        <div>
            
            <div>

                <div>
                    New Additions!
                </div>

                <div class="griddy">
                    
 
                
                <router-link  v-for="(item, index) in fresh_prods" :key="index" :to="{ name: 'product', params: { itemId: item.product_id }}">
                    <div>
                        {{item.product_name}}
                    </div>
                    <div>
                        {{item.product_price}}
                    </div>
                </router-link>


                </div>
            </div>




            <div>

                <div>
                    Products you have previously bought!
                </div>
                <div class="griddy">
                    
                <router-link  v-for="(item, index) in prev_prods" :key="index" :to="{ name: 'product', params: { itemId: item.product_id }}">
                    <div>
                        {{item.product_name}}
                    </div>
                    <div>
                        {{item.product_price}}
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
                    "Content-Type": "application/json"
                }
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
            const past_url = '/api/freshprods'
            const res = await fetch(past_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
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