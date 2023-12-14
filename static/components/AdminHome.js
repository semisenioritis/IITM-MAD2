export default {
    template: `
    <div class="container">
    <div class="alert alert-success">Welcome Admin!</div>

    <div class="horiz">
        <div class="col-md-6">
            <div class="card bg-dark text-white">
                <div class="card-header">Manage Sections</div>
                
                <div class="card-body">
                    <div class="card bg-dark text-white">
                        <div class="card-header">Create Section</div>
                        <div class="card-body">
                            <router-link to="/createsection">
                                <button class="btn btn-primary d-block mx-auto" style="width: 150px;">+</button>

                            </router-link>
                        </div>
                    </div>

                    <div class="card bg-dark text-white">
                        <div class="card-header">Modify Section</div>
                        <div class="card-body">
                            <router-link v-for="(item, index) in sections" :key="index" :to="{ name: 'modifysection', query: { sectionId: item.section_id, sectionName: item.section_name}}">
                                <div class="card bg-dark text-white">
                                    {{item.section_name}}
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card bg-dark text-white">
                <div class="card-header">Approve Requests</div>
                
                <div class="card-body">
                    <div class="card bg-dark text-white">
                        <div class="card-header">Store Manager Applications</div>
                        <div class="card-body">
                            <div v-for="(item, index) in sm_applications" :key="index" class="d-flex justify-content-between">
                                <div>{{item.username}}</div>
                                <div>
                                    <button @click="approvesm(item.id)" class="btn btn-success">Approve</button>
                                    <button @click="disapprovesm(item.id)" class="btn btn-danger">Disapprove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card bg-dark text-white">
                        <div class="card-header">Section Approvals</div>
                        <div class="card-body">
                            <div v-for="(item, index) in section_applications" :key="index" class="d-flex justify-content-between">
                                <div>{{item.section_name}}</div>
                                <div>
                                    <button @click="approvesec(item.section_id)" class="btn btn-success">Approve</button>
                                </div>
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
            sections: [],
            sm_applications: [],
            section_applications: [],

        }
    },
    created() {
        console.log("AdminHome created")
        this.fetch_all_sections()
        this.fetch_sm_applications()
        this.fetch_section_applications()
    },
    mounted() {
        console.log("AdminHome mounted")

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
                }
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
        async fetch_sm_applications(){
            const sm_url= "/api/notapprovedsm"
            const res=await fetch(sm_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log("this is from fetch_sm_applications")
                    console.log(dataa);
                    console.log("this is from fetch_sm_applications")
                    if (dataa.message == null){
                        console.log("found sm applications")
                        this.sm_applications = dataa
                        
                    }
                    else if (dataa.message == "All SM approved"){
                        console.log("All SM approved")
                        this.sm_applications = []
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },
        async fetch_section_applications(){
            const section_url= "/api/notapprovedsections"
            const res=await fetch(section_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == null){
                        console.log("found section applications")
                        this.section_applications = dataa
                    }
                    else if (dataa.message == "All sections approved"){
                        console.log("All Sections approved")
                        this.section_applications = []
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }
        },
        async approvesm(sm_id){
            console.log("approvesm")
            const sm_url= "/activate/sm/"+sm_id
            const res=await fetch(sm_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == "User Activated"){
                        console.log("User Activated")
                        this.fetch_sm_applications()
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }

        },
        async disapprovesm(sm_id){
            console.log("disapprovesm")
            console.log(sm_id)
            const sm_url= "/api/delsm/"+sm_id
            const res=await fetch(sm_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                }
                });
                if(res.ok){
                    const dataa=await res.json();
                    console.log(dataa);
                    if (dataa.message == "SM deleted successfully"){
                        console.log("deleted sm")
                        this.fetch_sm_applications()
                    }
                    else{
                        console.log("some error ig lol keep debugging noob")
                    }
                
                }            
        },
        async approvesec(section_id){
        const section_url= "/api/validate_section_update_a/"+section_id
        const res=await fetch(section_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authentication-Token": localStorage.getItem("Authentication-Token"),
            }
            });
            if(res.ok){
                const dataa=await res.json();
                console.log(dataa);
                if (dataa.message == null){
                    console.log("Section Updated")
                    this.fetch_section_applications()
                }
                else{
                    console.log("some error ig lol keep debugging noob")
                }
            
            }
        
        }
    },
}