export default {
    template: `

    <div class="container mt-5">
    <div class="card bg-dark text-white">
        <div class="card-header text-center">
            Modify Section
        </div>
        <form @submit.prevent="submitForm">
            <div class="card-body centerer">

                <div class="form-group row limit_row_width">
                    <label for="title" class="col-sm-2 col-form-label">Title:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="title" name="title" v-model="sec_name" />
                    </div>
                </div>

                <div class="form-group row limit_row_width">
                    <label for="desc" class="col-sm-2 col-form-label">Description:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="desc" name="desc" v-model="section_desc" />
                    </div>
                </div>

                <div class="form-group row limit_row_width">
                    <div class="col-sm-12 ">
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </div>

            </div>
        </form>

        <div class="card-footer horiz">
            <button class="btn btn-danger" @click="del_sec">Delete Section</button>
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
    mounted() {

    },
    created() {
        console.log("AdminHome created")
        this.fetch_this_sec(this.sec_id)
    },
    methods: {
        async fetch_this_sec(sec_id){
            console.log("fetch_this_sections")
            const section_url = "/api/section/" + sec_id
            
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
                        this.section_desc = dataa.section_desc
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }

        },
        async submitForm(){
            console.log("submitForm")
            const section_url = "/api/section_update_a/" + this.sec_id
            
            const res=await fetch(section_url, {
                method: "PUT",
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
                        console.log("updated section")
                        // this.section_desc = dataa.section_desc
                        this.$router.push({name: 'adminhome'})
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
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
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