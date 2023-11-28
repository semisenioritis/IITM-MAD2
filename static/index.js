// 🟠🟠  The initializer for the vue system withing the html page  🟠🟠
 

console.log('Hello from index.js')


import router from "./router.js"
import NavBar from "./components/Navbar.js"
import NavBar2 from "./components/Navbar2.js"


new Vue({
    el: '#app',
    template: `

    <div>

    <NavBar />
    <NavBar2 />
    <router-view />
    </div>

    `,
    router,
    components: {
        NavBar,
        NavBar2,
    },

})