export default {
    template:   `

    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand" href="#">Groceries King
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">


              <form  @submit.prevent="submitForm"  class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  v-model="query">


            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="true">
                Section
              </a>



  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <div v-for="(item, index) in responseList" :key="index" class="form-check" style="color:black">
      <input class="form-check-input" type="checkbox" :id="'checkbox_' + index" v-model="sections[index]" />
      <label class="form-check-label" :for="'checkbox_' + index">{{ item.section_name }}</label>
    </div>
  </ul>



            </li>


  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="filtersDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Filters
    </a>
    <ul class="dropdown-menu" aria-labelledby="filtersDropdown">

      <li>
        <label for="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" v-model="maxPrice" />
      </li>


      <li>
        <label for="minPrice">Min Price:</label>
        <input type="number" id="minPrice" v-model="minPrice" />
      </li>


      <li>
        <label for="beforeDate">Before Date:</label>
        <input type="date" id="beforeDate" v-model="beforeDate" />
      </li>
    </ul>
  </li>


            <button class="btn btn-outline-success" type="submit">Search</button>
                          

          </form>

          </ul>

        <div>
          <div>
          {{username}}
          </div>
          <button class="btn btn-outline-success" type="submit"  @click="gotocart"  v-if="role === 'user'">Cart</button>
          <button class="btn btn-outline-success" type="submit" @click="logout" v-if='token'>Logout</button>
        </div>  

        </div>
      </div>

  
  </nav>
    `,
    data() {
        return {
          role: localStorage.getItem("user_role"),
          token: localStorage.getItem("Authentication-Token"),
          username: localStorage.getItem("username"),
          responseList: [],
          sections: [], 
          secntions_done: [],
          maxPrice: null,
          minPrice: null,
          beforeDate: null,         
          query: '',       
          
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("Authentication-Token");
            localStorage.removeItem("user_role");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("id");

            this.$router.push('/login');
        },
        gotocart(){
          this.$router.push('/cart');
        },

        async submitForm() {
          // Filter selected items based on checkbox status
          const sections = this.responseList.filter((item, index) => this.sections[index]);
          const sections_done = sections.map(item => item.section_id);
          this.sections_done = sections_done;
          // Do something with the selected items (e.g., submit to the server)
          console.log('Selected Items:', sections);

          const search_obj = {
            'query': this.query,
            // maxPrice: this.maxPrice,
            // minPrice: this.minPrice,
            // beforeDate: this.beforeDate,
            'sections': this.sections_done,
          };
          console.log(search_obj);

          const res=await fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(search_obj)
        });
        if(res.ok){
          const data=await res.json();
          console.log(data);

          // console.log(data.role);}
          this.$router.push({
            name: 'searches', // Assuming 'searches' is the name of the route
            query: {
              data: JSON.stringify(data), // Pass the data as a string
            },
          });
          
        }  
        else{
            const data=await res.json();
            alert(data.message);
          }      

        },  
    },
  

    async mounted() {
      const res=await fetch("api/allsections", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(res.ok){
        const data=await res.json();
        console.log(data);
        this.responseList=data;
        console.log(this.responseList);
        this.sections = new Array(this.responseList.length).fill(false);        

        
    }
    },



    
}