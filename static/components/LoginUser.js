export default {
    template: `
    <div class="container mt-5">
    <div class="card bg-dark text-white">
        <div class="card-header text-center">
            User Authentication
        </div>
        <div class="card-body centerer">

            <div class="form-group row limit_row_width">
                <label for="username" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="username" name="username" placeholder="Username" v-model="cred.username">
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com" v-model="cred.email">
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" name="password" v-model="cred.password">
                </div>
            </div>

            <div class="form-group sharp_rower limit_row_width">
                <div class="col-sm-2">
                    <label for="sm" class="form-check-label">Want to be a Store Manager?</label>
                </div>
                <div class="col-sm-10">
                    <input type="checkbox" class="form-check-input" id="sm" name="sm" v-model="cred.sm">
                </div>
            </div>

            <div class="form-group sharp_rower limit_row_width">
                <div class="col-sm-6">
                    <button class="btn btn-primary" @click="login">Login</button>
                </div>
                <div class="col-sm-6" style="display: flex;flex-direction: row-reverse;">
                    <button class="btn btn-success" @click="signup">Register</button>
                </div>
            </div>

        </div>
    </div>
</div>

    
    `,
    data() {
        return {
            cred:{
            username: null,
            email: null,
            password: null,
            sm: false
            },
        user_role: null,
        }
    },
    methods: {
        async login() {
            const res=await fetch("/user-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(this.cred)
            });
            if(res.ok){
                const data=await res.json();
                console.log(data);

                if (data.message!=null){
                    alert(data.message);
                }
                else{
                    localStorage.setItem("user_role", data.role);
                    localStorage.setItem("Authentication-Token", data.token);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("id", data.id);
                    this.$router.push('/');
                }
                // if (data.role=="admin"){
                //     this.$router.push('/adminhome');}
                // else if (data.role=="sm"){
                //     this.$router.push('/smhome');}
                // else if (data.role=="user"){
                //     this.$router.push('/userhome');}

                // console.log(data.role);}
                
            }
        },
        async signup() {
            const res=await fetch("/user-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(this.cred)
            });
            if(res.ok){
                const data=await res.json();
                // console.log(data);
                if (data.message!=null){
                    alert(data.message);
                }
            }
        }
    },
}