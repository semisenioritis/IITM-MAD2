// 🟠🟠  The initializer for the vue system withing the html page  🟠🟠
 

console.log('Hello from index.js')


import router from "./router.js"
import NavBar from "./components/Navbar.js"
import NavBar2 from "./components/Navbar2.js"


router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/') {
        next();
    }
    else if (localStorage.getItem("Authentication-Token") === null) {
        next('/login');
    }
    else {
        next();
    }
})

new Vue({
    el: '#app',
    template: `

    <div>

    <NavBar  :key="has_changed" />
    <NavBar2  />
    <router-view />
    </div>

    `,
    router,
    components: {
        NavBar,
        NavBar2,
    },
    data: {
        has_changed:true,
    },
    watch:{
        $route(to, from){
            this.has_changed = !this.has_changed;
        }
    }

})