import Home from './components/Home.js'
import LoginUser from './components/LoginUser.js'



import AdminHome from './components/AdminHome.js'
import SmHome from './components/SmHome.js'
import UserHome from './components/UserHome.js'

import ProductTemplate from './components/ProductTemplate.js'
import CartPage from './components/CartPage.js'
import SectionPage from './components/SectionPage.js'

import SearchResults from './components/SearchResults.js'

import CreateSection from './components/CreateSection.js'
import ViewSection from './components/ViewSection.js'
import ModifySection from './components/ModifySection.js'
import CreateProduct from './components/CreateProduct.js'
import ModifyProduct from './components/ModifyProduct.js'








const routes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginUser },
    { path: '/adminhome', component: AdminHome },
    { path: '/smhome', component: SmHome },
    { path: '/userhome', component: UserHome, name: 'userhome' },


    { path: '/product', component: ProductTemplate, name: 'product' },
    { path: '/cart', component: CartPage },
    { path: '/section', component: SectionPage, name: 'section' },

    { path: '/search', component: SearchResults, name: 'searches' },

    { path: '/createsection', component: CreateSection },
    { path: '/createproduct', component: CreateProduct },

    { path: '/viewsection', component: ViewSection },
    { path: '/modifysection', component: ModifySection },
    { path: '/modifyproduct', component: ModifyProduct },
]
  

export default new VueRouter({
    routes,
  })