export default {
    template: `

    <div class="container mt-5">
    <div class="card bg-dark text-white">
        <div class="card-header">
            Create Section
        </div>
        <form @submit.prevent="submitForm">
            <div class="card-body centerer">

                <div class="form-group row limit_row_width">
                    <label for="title" class="col-sm-2 col-form-label">Title:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="title" v-model="sec_name" />
                    </div>
                </div>

                <div class="form-group row limit_row_width">
                    <label for="desc" class="col-sm-2 col-form-label">Description:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="desc" v-model="section_desc" />
                    </div>
                </div>

                <div class="form-group row limit_row_width">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Create Section</button>
                    </div>
                </div>

            </div>
        </form>
    </div>
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