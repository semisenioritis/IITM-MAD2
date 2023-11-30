export default {
    template: `


    <div>

    <div>
        Create Section
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


    <div > 

        <div>
            <button type="submit">Create Section</button>
        </div>    

    </div>    
    </form>

</div>

    `,
    data(){
        return{
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            sec_name: "",
            section_desc: "",
        }
    },
    mounted(){

    },
    creted(){

    },
    methods: {
        async submitForm(){
            console.log("submitForm")
            const section_url = "/api/newsection_a"
            
            const res=await fetch(section_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
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
                        console.log("created section")
                        // this.section_desc = dataa.section_desc
                        this.$router.push({ name: 'adminhome' })
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },

    }    
}