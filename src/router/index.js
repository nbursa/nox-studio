import Vue from 'vue'
import VueRouter from 'vue-router'
import VHome from '../views/VHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: VHome
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/VLogin.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/VAdmin.vue'),
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/VAbout.vue')
  },
  {
    path: '/studio',
    name: 'Studio',
    component: () => import('../views/VStudio.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/VMusic.vue')
  },
  {
    path: '/galery',
    name: 'Galery',
    component: () => import('../views/VGalery.vue'),
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
    component: () => import('../views/VDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/reservations',
    name: 'Reservations',
    component: () => import('../views/VReservations.vue')
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
