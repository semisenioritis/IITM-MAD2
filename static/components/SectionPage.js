export default {
    template: `


<div>

    <div>
        {{secname}}

    </div>

    <div class="griddy">

        <router-link v-for="(item, index) in prodsData" :key="index" :to="{ name: 'product', query: { itemId: item.product_id }}">
        <!-- Assuming each item has a unique 'id' property -->
        <div>
            <!-- You can customize the content of the link -->
            <div>{{ item.product_name }}</div>
            <div>{{ item.product_desc }}</div>
        </div>
        </router-link>







    </div>

</div>


    `,
    data() {
        return {
            role: localStorage.getItem("user_role"),
            token: localStorage.getItem("Authentication-Token"),
            prodsData: null,
            secname: this.$route.query.sectionName,
            

            
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
        fetchSectionDetails(routeParams.sectionId)
      },
      methods: {
        async fetchSectionDetails(sectionId) {

          console.log(sectionId)
  
          const section_url = 'api/prodsofsection/' + sectionId
            const res=await fetch(section_url, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
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










      }
}