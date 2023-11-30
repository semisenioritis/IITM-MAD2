export default {
    template: `

    <div>

        <div>
            View Section
        </div>

        <div>
            <div class="horiz"> 
                <div>
                    Title:
                </div>
                <div>
                    {{sec_name}}
                </div>
            </div>
            <div class="horiz"> 
                <div>
                    Description:
                </div>
                <div>
                    {{section_desc}}
                </div>
            </div>


        </div>


        <div class="horiz"> 

            <div>
                
                <router-link :to="{ name: 'modifysectionsm', query: { sectionId: sec_id, sectionName: sec_name}}">
                    <button>Modify Section</button>
                </router-link>
            </div>    

            <div>
                Export as CSV
            </div>

        </div>    

    </div>

    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            sec_name: this.$route.query.sectionName,
            sec_id: this.$route.query.sectionId,            
            section_desc: "",
        }
    },
    mounted(){

    },
    created(){
        this.fetch_this_sec(this.sec_id)
    },
    methods: {
        async fetch_this_sec(sec_id){
            console.log("fetch_this_sections")
            const section_url = "/api/section/" + sec_id
            
            const res=await fetch(section_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
                });
                if(res.ok){
                    const dataa=await res.json();

                    console.log("sandwitch")
                    console.log(dataa);
                    console.log("sandwitch")
                    if (dataa.message == null){
                        console.log("found sections")
                        this.section_desc = dataa.section_desc
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }

        },
    }
}