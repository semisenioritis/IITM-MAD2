export default {
    template: `
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card bg-dark text-light">
          <div class="card-body">
            <h2 class="mb-4">Search Results</h2>
  
            <router-link
              v-for="(item, index) in searchData"
              :key="index"
              :to="{ name: 'product', query: { itemId: item.product_id }}"
              class="text-light text-decoration-none"
            >
              
              <div class="card mb-3 bg-secondary text-dark">
                
                <div class="card-body">
                  <h5 class="card-title">{{ item.product_name }}</h5>
                  <p class="card-text bottom_sep_2">{{ item.product_desc }}</p>
                </div>
              </div>
            </router-link>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  

    `,
    data() {
        return {
          searchData: null,
        };
      },
      created() {

        const queryData = this.$route.query.data;
    

        if (queryData) {
          try {
            this.searchData = JSON.parse(queryData);

            console.log('Received data:', this.searchData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      },

}