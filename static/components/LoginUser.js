export default {
    template: `

<div>


    <div class="horiz">
        <div>
            <label for="username">
                Username
            </label>
        </div>

        <div>

            <input type="text" id="username" name="username" placeholder="username" v-model="cred.username">
        </div>

    </div>
    <div class="horiz">
        <div>
            <label for="email">
                Email
            </label>
        </div>

        <div>

            <input type="email" id="email" name="email" placeholder="name@email.com" v-model="cred.email">
        </div>

    </div>
    
    <div class="horiz">
        <div>
            <label for="password">
                Password
            </label>
        </div>

        <div>
            <input type="password" id="password" name="password" v-model="cred.password">
        </div>

    </div>

    <div class="horiz">
        <div>
            <label for="password">
                Want to be a Store Manager?
            </label>
        </div>

        <div>
            <input type="checkbox" id="sm" name="sm" v-model="cred.sm">
        </div>

    </div>
    
    
    <div class="horiz">
        <div>
            <button @click="login">Login</button>
        </div>

        <div>
        <button @click="signup">Register</button>
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.cred)
            });
            if(res.ok){
                const data=await res.json();
                // console.log(data);
                localStorage.setItem("user_role", data.role);
                localStorage.setItem("Authentication-Token", data.token);
                if (data.role=="admin"){
                    this.$router.push('/adminhome');}
                else if (data.role=="sm"){
                    this.$router.push('/smhome');}
                else if (data.role=="user"){
                    this.$router.push('/userhome');
                // console.log(data.role);}
                else{
                    alert(data.message);
                }
                
            }
        },
        async signup() {
            const res=await fetch("/user-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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