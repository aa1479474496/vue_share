import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')
const Share = () => import('@/components/share/Share')
const Demo1 = () => import('@/components/share/Demo1')

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
          path: 'demo1',
          name: 'demo1',
          component: Demo1
        }
      ]
    },
  ]
})
