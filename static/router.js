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

import CreateSectionSm from './components/CreateSectionSm.js'
import ModifySectionSm from './components/ModifySectionSm.js'







const routes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginUser },
    { path: '/adminhome', component: AdminHome, name: 'adminhome', meta: { requiresAuth: true, roles: ['admin'] },},
    { path: '/smhome', component: SmHome, name: 'smhome', meta: { requiresAuth: true, roles: ['storemanager'] },},
    { path: '/userhome', component: UserHome, name: 'userhome', meta: { requiresAuth: true, roles: ['user'] },},


    { path: '/product', component: ProductTemplate, name: 'product' },
    { path: '/cart', component: CartPage },
    { path: '/section', component: SectionPage, name: 'section' },

    { path: '/search', component: SearchResults, name: 'searches' },

    { path: '/createsection', component: CreateSection, name : 'createsection',meta: { requiresAuth: true, roles: ['admin'] }, },
    { path: '/createproduct', component: CreateProduct },
    { path: '/createsectionsm', component: CreateSectionSm, name : 'createsectionsm', meta: { requiresAuth: true, roles: ['storemanager'] },},
    { path: '/modifysectionsm', component: ModifySectionSm, name: 'modifysectionsm', meta: { requiresAuth: true, roles: ['storemanager'] },},


    { path: '/viewsection', component: ViewSection, name: 'viewsection', meta: { requiresAuth: true, roles: ['storemanager'] },},
    { path: '/modifysection', component: ModifySection, name: 'modifysection', meta: { requiresAuth: true, roles: ['admin'] },},
    { path: '/modifyproduct', component: ModifyProduct, name: 'modifyproduct' , meta: { requiresAuth: true, roles: ['storemanager'] },},
]
  

const router = new VueRouter({
    routes,
});


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'storemanager' || localStorage.getItem('user_role') === 'user';
    const userRolesString = localStorage.getItem('user_role');
    console.log(userRolesString)
    const userRoles = userRolesString ? [userRolesString] : [];
    const requiredRoles = to.meta.roles;
  
    if (requiresAuth && !isAuthenticated) {
      // Redirect to login if authentication is required and user is not authenticated
      next('/login');
    } else if (requiresAuth && requiredRoles && !userRoles.some(role => requiredRoles.includes(role))) {
      // Redirect to unauthorized page if user doesn't have required roles
      next('/');
    } else {
      // Proceed to the requested route
      next();
    }
  });







export default router;
