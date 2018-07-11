import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')
const Share = () => import('@/components/share/Share')
const LifyCycle = () => import('@/components/share/LifyCycle')
const Basic = () => import('@/components/share/Basic')
const Directive = () => import('@/components/share/Directive')
const Calendar = () => import('@/components/share/Calendar')

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
          path: 'lifycycle',
          name: 'LifyCycle',
          component: LifyCycle
        },
        {
          path: 'basic',
          name: 'Basic',
          component: Basic
        },
        {
          path: 'directive',
          name: 'Directive',
          component: Directive
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: Calendar
        }
      ]
    },
  ]
})
