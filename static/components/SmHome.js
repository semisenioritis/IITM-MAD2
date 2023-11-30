export default {
    template: `

    <div>
        <div> Welcome StoreManager!</div>
        <div class="horiz"> 
            <div>
                <div>
                Manage Products
                </div>
                
                <div>
                    <div>
                        Create Product                       
                    </div>
                    <div>   
                    <router-link to="/createproduct">
                        <button>+</button>
                        </router-link>                                           
                    </div>                
                </div>
                
                <div>
                    <div>
                       Modify Product                       
                    </div>
                    <div>   

                        <router-link v-for="(item, index) in products" :key="index" :to="{ name: 'modifyproduct', query: { itemId: item.product_id}}">
                            <div>
                                {{item.product_name}}
                            </div>
                        </router-link>                        
                    </div>                
                </div>

            </div>






            <div>
                <div>
                Manage Sections
                </div>
                
                <div>
                    <div>
                        Create Section                       
                    </div>
                    <div>   
                    <router-link to="/createsectionsm">
                        <button>+</button>
                    </router-link>                     
                    </div>                
                </div>
                
                <div>
                    <div>
                       View Section:                   
                    </div>
                    <div>   

                        <router-link v-for="(item, index) in sections" :key="index" :to="{ name: 'viewsection', query: { sectionId: item.section_id, sectionName: item.section_name}}">
                            <div>
                                {{item.section_name}}
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