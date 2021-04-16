import Vue from 'vue'
import Router from 'vue-router'
import Write from '../Pages/Write/Write'
import Owner from '../components/Owner/Owner'
import Setting from '../Pages/Setting/Setting'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Show from '../components/Show/Show'
import Home from '../Pages/Home/Home'
import Edit from '../Pages/Edit/Edit'
import toActicle from '../Pages/toActicle/toActicle'
import ChangePassword from '../Pages/ChangePassword/ChangePassword'
import AboutUs from '../Pages/AboutUs/AboutUs'
import Search from '../Pages/Search/Search'
import NotFound from '../Pages/NotFound/NotFound'
Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", redirect: { name: "Home" } },

    {
      path: '/write',
      name: 'Write',
      component: Write,
      meta: { show: true }
    },

    {
      path: '/owner',
      components: { Owner: Owner },
      meta: { show: true }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: { show: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { show: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { show: false }
    },
    {
      path: '/show',
      name: 'Show',
      component: Show,
      meta: { show: true }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { show: true }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      meta: { show: true }
    },
    {
      path: '/toActicle',
      name: 'toActicle',
      component: toActicle,
      meta: { show: true }
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { show: true }
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs,
      meta: { show: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: { show: true }
    },
    { path: "*", component: NotFound }


  ],
  mode: "history"
})
