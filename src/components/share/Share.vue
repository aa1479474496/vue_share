<template>
  <div>
    <h1 class="text-center">share</h1>
    <ul class="list-group">
      <li class="list-group-item"><router-link to="/share/lifycycle">生命周期</router-link></li>
      <li class="list-group-item"><router-link to="/share/basic">Basic</router-link></li>
      <li class="list-group-item"><router-link to="/share/directive">自定义指令</router-link></li>
      <li class="list-group-item"><router-link to="/share/calendar">组件</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>