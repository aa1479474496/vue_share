<template>
    <div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">lifycycle</h3>
            <p>每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。</p>
          </div>
        </div>
      </div>
</template>

<script>
  export default {
    beforeCreate() {
      console.log('beforeCreate:', '  el 和 data 并未初始化');
    },
    created() {
      console.log('created:', '  完成了 data 数据的初始化，el没有');
    },
    beforeMount() {
      console.log('beforeMount:', '  完成了 el 和 data 初始化');
    },
    mounted() {
      console.log('mounted', '  完成挂载');
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    activated() {
      console.log('activated', '  keep-alive组件使用');
    },
    deactivated() {
      console.log('deactivated',  '  keep-alive组件使用');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    },
    destroyed() {
      console.log('destroyed');
    },
  }
</script>