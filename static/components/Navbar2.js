export default {
  template: `


  <nav class="navbar navbar-dark bg-dark">
  <div class="container">
    <router-link
      v-for="(section, index) in responseList"
      :key="index"
      :to="{ name: 'section_proxy', query: { sectionId: section.section_id, sectionName: section.section_name} }"
      @click="send_to_sec(section.section_id, section.section_name)"
      class="nav-link"
    >
    <button class="btn btn-outline-light m-1">
      {{ section.section_name }}
    </button>
    </router-link>
  </div>
</nav>


`,
  data() {
    return {
      role: localStorage.getItem("user_role"),
      token: localStorage.getItem("Authentication-Token"),
      responseList: [],
      sections: [],       
    }
  },
  mounted() {
    this.fetch_sections();  
  },
  methods:{
    async fetch_sections(){
      const res=await fetch("api/allsections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("Authentication-Token"),
      },
    });
    if(res.ok){
        const data=await res.json();
        console.log(data);
        this.responseList=data;
        console.log("this is bar 2");
        console.log(this.responseList);
        this.sections = new Array(this.responseList.length).fill(false);        
        // const valuesOfTargetKey = responseList.map(item => item["targetKey"]);
  
    }
    },
    send_to_sec(section_id, section_name){
      console.log("send_to_sec")
      console.log(section_id)
      // console.log("sikeeee boiiiiiiiiiiiiiii 1")
      // this.$router.push({ name: 'home' });
      // console.log("sikeeee boiiiiiiiiiiiiiii 2")
      this.$router.push({ name: 'section_proxy', query: { sectionId: section_id, sectionName: section_name} })
      // console.log("sikeeee boiiiiiiiiiiiiiii 3")
    }
  }
}

