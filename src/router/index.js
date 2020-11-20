import Vue from 'vue'
import VueRouter from 'vue-router'
// import VHome from '../views/VHome.vue'
// import VLogin from '../views/VLogin.vue'
// import VAdmin from '../views/VAdmin.vue'
// import VMusic from '../views/VMusic.vue'
// import VAbout from '../views/VAbout.vue'
// import VStudio from '../views/VStudio.vue'
// import VGalery from '../views/VGalery.vue'
// import VDashboard from '../views/VDashboard.vue'
// import VReservations from '../views/VReservations.vue'
import CLoader from '../components/CLoader.vue'
import CError from '../components/CError.vue'

Vue.use(VueRouter)

const lazyLoadView = ({
  component,
  loading,
  error
}) => {
  const AsyncHandler = () => ({
    component,
    loading,
    error
  })

  return () =>
    Promise.resolve({
      functional: true,
      render (h, {
        data,
        children
      }) {
        return h(AsyncHandler, data, children)
      }
    })
}

const VHome = lazyLoadView({
  component: import('../views/VHome.vue'),
  loading: CLoader,
  error: CError
})

const VLogin = lazyLoadView({
  component: import('../views/VLogin.vue'),
  loading: CLoader,
  error: CError
})

const VAdmin = lazyLoadView({
  component: import('../views/VAdmin.vue'),
  loading: CLoader,
  error: CError
})

const VMusic = lazyLoadView({
  component: import('../views/VMusic.vue'),
  loading: CLoader,
  error: CError
})

const VAbout = lazyLoadView({
  component: import('../views/VAbout.vue'),
  loading: CLoader,
  error: CError
})

const VStudio = lazyLoadView({
  component: import('../views/VStudio.vue'),
  loading: CLoader,
  error: CError
})

const VGalery = lazyLoadView({
  component: import('../views/VGalery.vue'),
  loading: CLoader,
  error: CError
})

const VDashboard = lazyLoadView({
  component: import('../views/VDashboard.vue'),
  loading: CLoader,
  error: CError
})

const VReservations = lazyLoadView({
  component: import('../views/VReservations.vue'),
  loading: CLoader,
  error: CError
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: VHome
  },
  {
    path: '/login',
    name: 'Login',
    component: VLogin,
    // component: () => import('../views/VLogin.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: VAdmin,
    // component: () => import('../views/VAdmin.vue'),
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: VAbout
    // component: () => import('../views/VAbout.vue')
  },
  {
    path: '/studio',
    name: 'Studio',
    component: VStudio
    // component: () => import('../views/VStudio.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: VMusic
    // component: () => import('../views/VMusic.vue')
  },
  {
    path: '/galery',
    name: 'Galery',
    component: VGalery,
    children: [
      {
        path: '/galery/:id',
        name: 'Photo',
        component: () => import('../components/CPhoto.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: VDashboard,
    // component: () => import('../views/VDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/reservations',
    name: 'Reservations',
    component: VReservations
    // component: () => import('../views/VReservations.vue')
    // meta: {
    //   requiresAuth: true
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('nox_jwt') === null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('nox_user') || 'null')
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin === 1) {
          next()
        } else {
          next({ name: 'Admin' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('nox_jwt') === null) {
      next()
    } else {
      next({ name: 'Admin' })
    }
  } else {
    next()
  }
})

export default router
