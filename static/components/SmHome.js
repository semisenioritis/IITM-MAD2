export default {
    template: `

    <div class="container mt-5 card bg-dark text-light">
        <div><h2 style="text-align:center"> Welcome Store Manager!</h2></div>
        <div class="horiz"> 
            <div class="card-body centerer ">
                <div class="col-md-8">
                <h4>Manage Products</h4>
                </div>
                
                <div class="col-md-8">
                    <div>
                        <h5>Create Product</h5>
                    </div>
                    <div>   
                    <router-link to="/createproduct">
                        
                        <button class="btn btn-primary d-block mx-auto" style="width: 150px;">+</button>

                        </router-link>                                           
                    </div>                
                </div>
                
                <div class="col-md-8">
                    <div>
                       <h5>Modify Product</h5>                       
                    </div>
                    <div>   

                        <router-link v-for="(item, index) in products" :key="index" :to="{ name: 'modifyproduct', query: { itemId: item.product_id}}">



                        <div class="card bg-dark mb-3 whitener border_white">
                            <div class="card-body">
                                <p class="card-text">{{item.product_name}}</p>
                            </div>
                        </div>



                        </router-link>                        
                    </div>                
                </div>

            </div>






            <div class="card-body centerer">
                <div class="col-md-8">
                <h4>Manage Sections</h4>
                </div>
                
                <div class="col-md-8">
                    <div >
                        <h5>Create Section </h5>                      
                    </div>
                    <div>   
                    <router-link to="/createsectionsm">
                        
                        <button class="btn btn-primary d-block mx-auto" style="width: 150px;">+</button>

                    </router-link>                     
                    </div>                
                </div>
                
                <div class="col-md-8">
                    <div>
                       <h5>View Section: </h5>
                    </div>
                    <div>   

                        <router-link v-for="(item, index) in sections" :key="index" :to="{ name: 'viewsection', query: { sectionId: item.section_id, sectionName: item.section_name}}">



                            <div class="card bg-dark mb-3 whitener border_white">
                                <div class="card-body">
                                    <p class="card-text">{{item.section_name}}</p>
                                </div>
                            </div>




                        </router-link>
                        
                        
                    </div>                
                </div>

            </div>


        </div>
    </div>

    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            sections: [],
            products: [],
        }
    },
    created(){
        this.fetch_all_sections()
        this.fetch_all_products()
    },
    mounted(){

    },
    methods: {
        async fetch_all_sections(){
            console.log("fetch_all_sections")
            const section_url = "/api/allsections"
            
            const res=await fetch(section_url, {
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
                        console.log("found sections")
                        this.sections = dataa
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },
        async fetch_all_products(){
            console.log("fetch_all_products")
            const section_url = "/api/allproducts"
            
            const res=await fetch(section_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    console.log("sikeeeeeeeeeeeeeee")
                    if (dataa.message == null){
                        console.log("found prods")
                        this.products = dataa
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },
    }

}