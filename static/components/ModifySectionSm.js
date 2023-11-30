export default {
    template: `

    <div>

        <div>
            Modify Section:
        </div>
        <form @submit.prevent="submitForm">
        <div>
            
            <div class="horiz"> 
            
                <div>
                    Title:
                </div>
                <div>
                    <input type="text" name="title" id="title" v-model="sec_name" />
                </div>
            </div>
            <div class="horiz"> 
                <div>
                    Description:
                </div>
                <div>
                <input type="text" name="desc" id="desc"  v-model="section_desc" />
                </div>
            </div>
            


        </div>


        

            <div>
                <button type="submit">Save</button>
            </div>  

        </form>

            <div>
                
                <button @click="del_sec">Delete Section</button>
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
    mounted() {

    },
    created() {

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
                    console.log(dataa);
                    if (dataa.message == null){
                        console.log("found sections")
                        this.section_desc = dataa.section_desc
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }

        },
        async submitForm(){
            console.log("submitForm")
            const section_url = "/api/section_update_sm/" + this.sec_id
            
            const res=await fetch(section_url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": this.token,
                },
                body: JSON.stringify({
                    "section_name": this.sec_name,
                    "section_desc": this.section_desc,
                })
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == null){
                        console.log("updated section")
                        // this.section_desc = dataa.section_desc
                        this.$router.push({name: 'smhome'})
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },
        async del_sec(){
            const section_url = "/api/deletesec/" + this.sec_id
            const res=await fetch(section_url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": this.token,
                },
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == "Some error occured" || dataa.message == "Section not found"){
                        
                        console.log("some error ig lol keep debugging noob")
                        // this.section_desc = dataa.section_desc
                    }
                    else{
                        console.log("deleted section")
                        this.$router.push({name: 'adminhome'})
                        
                    }
                
                }
        }


    }
    
}