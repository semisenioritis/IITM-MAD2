export default {
    template: `

    <div>Section Proxy</div>
    
    `,
created() {
    console.log('Proxy component created')
    const user_role = localStorage.getItem('user_role'); // Replace 'yourLocalStorageKey' with the actual key
    if (user_role === 'user' || user_role === 'admin' || user_role === 'storemanager') {
        this.$router.push({ name: 'section', query: { sectionId: this.$route.query.sectionId, sectionName: this.$route.query.sectionName} })
      }
    else {
        this.$router.push('/login');
    }
},

}