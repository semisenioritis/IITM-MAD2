export default {
    template: `

    <div :key="has_changed" class="container mt-5">
    <div class="card bg-dark text-light p-3 mb-3 ">
      <h2 class="text-light">{{ secname }}</h2>
      <div class="row griddy">
        <router-link
          v-for="(item, index) in prodsData"
          :key="index"
          :to="{ name: 'product', query: { itemId: item.product_id }}"
          class="col-md-12 text-light text-decoration-none "
        >
          <!-- Assuming each item has a unique 'id' property -->
          <div class="card bg-dark mb-3 border border-white">
            <div class="card-body ">
              <!-- You can customize the content of the link -->
              <h5 class="card-title text-light">{{ item.product_name }}</h5>
              <p class="card-text text-light smallify ">{{ item.product_desc }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  


    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            prodsData: null,
            secname: this.$route.query.sectionName,
            has_changed:true,

            
        }
    },
    created() {

        const routeParams = this.$route.query;
   
        if (routeParams.sectionId) {

          this.fetchSectionDetails(routeParams.sectionId);
        } else {
          console.error('Missing sectionId parameter');
        }
      },
      mounted() {
        // const routeParamss = this.$route.query;
        console.log('SectionPage mounted');

        this.fetchSectionDetails(this.$route.query.sectionId)
      },
      methods: {
        async fetchSectionDetails(sectionId) {

          console.log(sectionId)
  
          const section_url = 'api/prodsofsection/' + sectionId
            const res=await fetch(section_url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authentication-Token": localStorage.getItem("Authentication-Token"),
            },
              });
          if(res.ok){
              const dataaa=await res.json();
              console.log(dataaa);
  


            if (dataaa) {
                try {
                  this.prodsData = dataaa;
                  // Now this.searchData contains the data passed from the previous page
                  console.log('Received data:', this.prodsData);
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                }
              }

  
          }
          
          },










      },

      watch:{
          $route(to, from){
              this.has_changed = !this.has_changed;
          }
      }
}