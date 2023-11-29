export default {
  template: `


<nav>
      <router-link
        v-for="(section, index) in responseList"
        :key="index"
        :to="{ name: 'section', params: { sectionId: section.section_id, sectionName: section.section_name} }"
      >
        {{ section.section_name }}
      </router-link>
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
      console.log("this is bar 2");
      console.log(this.responseList);
      this.sections = new Array(this.responseList.length).fill(false);        
      // const valuesOfTargetKey = responseList.map(item => item["targetKey"]);

  }
  },
}

