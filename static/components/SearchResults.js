export default {
    template: `

<div>
    <div>
        Search Results:
    </div>
    <div>


    <router-link v-for="(item, index) in searchData" :key="index" :to="{ name: 'product', query: { itemId: item.product_id }}">
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
          searchData: null,
        };
      },
      created() {
        // Access the data from query parameters
        const queryData = this.$route.query.data;
    
        // Parse the JSON string back into an object
        if (queryData) {
          try {
            this.searchData = JSON.parse(queryData);
            // Now this.searchData contains the data passed from the previous page
            console.log('Received data:', this.searchData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      },

}