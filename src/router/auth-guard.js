import store from '../store'

export default function (to, from, next) {
  if (store.getters.user) {
    next()
    console.log(store.getters.user)
  } else {
    next('/login?loginError=true')
  }
}
