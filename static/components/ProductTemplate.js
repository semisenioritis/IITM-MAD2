export default {
    template: `

    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card bg-dark text-light">
          <div class="card-body">
            <h2>{{ product_name }}</h2>
            <div class="mb-3">
                <strong>More:</strong> {{ product_description }}
            </div>
  

  
            <div class="row pls_just_center_me">
              <div class="col-md-4">
                <div class="mb-2">
                  <strong>Price:</strong> {{ product_price }}
                </div>
                <div class="mb-2">
                  <strong>Curr Stock:</strong> {{ curr_stock }}
                </div>
                <div class="mb-2">
                  <strong>Per:</strong> {{ per_what }}
                </div>
                <div class="mb-2">
                  <strong>Mfg Date:</strong><br> {{ mfg_date }}
                </div>
                <div class="mb-2">
                  <strong>Exp Date:</strong><br> {{ exp_date }}
                </div>
              </div>
  
              <div class="col-md-4 centerer">
                <button @click.prevent="cartadd" v-if="role === 'user'" class="btn btn-success">Add to Cart</button>

                <div v-if="role === 'user'" class="mb-3">
                    <strong>In Cart:</strong> <span class="added">{{ prod_count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            
            product_name:"",
            product_description:"",
            product_price:"",
            curr_stock:"",
            per_what:"",
            mfg_date:"",
            exp_date:"",
            product_image:"",
            prod_count: "",

          
        };
      },
      created() {
        
        const routeParams = this.$route.query;
    
        
        if (routeParams.itemId) {

          this.fetchProductDetails(routeParams.itemId);
        } else {
          console.error('Missing itemId parameter');
        }
      },
      methods: {
        async fetchProductDetails(itemId) {

        console.log(itemId)

        const prod_url = 'api/product/' + itemId
          const res=await fetch(prod_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authentication-Token": localStorage.getItem("Authentication-Token"),
            },
            });
        if(res.ok){
            const data=await res.json();
            console.log(data);

            this.product_name = data.product_name;
            this.product_description = data.product_desc;
            this.product_price = data.product_price; 
            this.curr_stock = data.curr_stock;
            this.per_what = data.per_what;
            this.mfg_date = data.mfg_date;
            this.exp_date = data.exp_date;
            this.product_image = data.product_image;
           
            if (localStorage.getItem("user_role") == "user"){
                const data_to_send = {
                    "product_id": itemId,
                    "user_id": localStorage.getItem("id"),
                }

                const cart_url = 'api/isthisbought' 
                console.log(data_to_send)
                console.log(cart_url)
                const res=await fetch(cart_url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authentication-Token": localStorage.getItem("Authentication-Token"),
                    },
                    body: JSON.stringify(data_to_send)
                    });
                    if(res.ok){
                        const dataa=await res.json();
                        console.log(dataa);
                        if (dataa.message == true    ){
                            console.log("bought")
                            console.log(dataa.prod_count)
                            this.prod_count = "Added"

                        }
                        else{
                            console.log("not bought")
                        }
                    
                    }
            }

        }
        
        },






        async cartadd() {

            const cart_add_url = 'api/addtocart'
            const send_to_cart = {
                "product_id": this.$route.query.itemId,
                "user_id": localStorage.getItem("id"),
            }
            console.log(send_to_cart)
            console.log(cart_add_url)
            const res=await fetch(cart_add_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(send_to_cart)
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == "Added to Cart successfully" ){
                        console.log("added")
                        console.log(dataa.prod_count)
                        this.prod_count = "Added"
                    }
                    else{
                        console.log("not added")
                    }
                
                }
        },
        
      },
}