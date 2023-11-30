export default {
    template: `


<div class="horiz">
    <div> 
        <div>
            {{product_image}}
        </div> 
    </div>
    <div>

        <div>
            {{product_name}}
        </div> 
        <div class="horiz">

            <div>
                {{product_description}}
            </div>


            <div>

                        <div>
                            in cart:
                        </div>
                        <div>
                            {{prod_count}}
                        </div>

            </div>


        </div>







        <div class="horiz">
            <div>
                <div class="horiz">
                    <div>
                        price:
                    </div>
                    <div>
                        {{product_price}}
                    </div> 
                </div>

                <div class="horiz">
                    <div>
                        curr stock:
                    </div>
                    <div>
                        {{curr_stock}}
                    </div> 
                </div>
                
                <div class="horiz">
                    <div>
                        per:
                    </div>
                    <div>
                        {{per_what}}
                    </div> 
                </div>
                
                <div class="horiz">
                    <div>
                        mfg date:
                    </div>
                    <div>
                        {{mfg_date}}
                    </div> 
                </div>
                
                <div class="horiz">
                    <div>
                        exp date:
                    </div>
                    <div>
                        {{exp_date}}
                    </div> 
                </div>                




            </div>
    
            <div>
          

<button @click.prevent="cartadd">Add to Cart</button>



            </div>


        </div>


    </div> 

</div>



    `,
    data() {
        return {
          
            // Initialize with default values or an empty object
            product_name:"",
            product_description:"",
            product_price:"",
            curr_stock:"",
            per_what:"",
            mfg_date:"",
            exp_date:"",
            product_image:"",
            prod_count: "",

            // Add other properties as needed
          
        };
      },
      created() {
        // Access the route parameters
        const routeParams = this.$route.query;
    
        // Check if the required parameters are present
        if (routeParams.itemId) {
          // You can make an API call here to fetch product details based on the itemId
          // Replace this with your actual API call or data retrieval logic
          this.fetchProductDetails(routeParams.itemId);
        } else {
          console.error('Missing itemId parameter');
        }
      },
      methods: {
        async fetchProductDetails(itemId) {
          // Make an API call or retrieve product details based on the itemId
          // Replace this with your actual API call or data retrieval logic
          // Update the 'product' data property with the fetched product details
          // For example:

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
                    if (dataa.message == true ){
                        console.log("added")
                        console.log(dataa.prod_count)
                    }
                    else{
                        console.log("not added")
                    }
                
                }
        },
        
      },
}