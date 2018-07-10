import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')
const Share = () => import('@/components/share/Share')
const Basic = () => import('@/components/share/Basic')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      children: [
        {
          path: 'basic',
          name: 'Basic',
          component: Basic
        }
      ]
    },
  ]
})
