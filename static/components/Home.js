export default {
    template: `

    <div>Hello Home</div>
    
    
    `,
created() {
    console.log('Home component created')
    const user_role = localStorage.getItem('user_role'); // Replace 'yourLocalStorageKey' with the actual key


    if (user_role === 'storemanager') {
        this.$router.push('/smhome'); 
      }
    else if (user_role === 'admin') {
        this.$router.push('/adminhome');
    }
    else if (user_role === 'user') {
        this.$router.push('/userhome');
    }
    else {
        this.$router.push('/login');
    }
}
}