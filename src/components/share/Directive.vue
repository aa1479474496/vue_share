<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">directive</h3>
        <p>在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。</p>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-lg-6">
            <div class="input-group">
              <input type="text" v-setColor:color="color1" class="form-control" placeholder="color">
            </div>
          </div>
          <div class="col-lg-6" style="margin-top: 10px;">
            <div class="input-group">
              <input type="text" v-setColor:color="color2" class="form-control" placeholder="color">
            </div>
          </div>
        </div>
      </div>

      <div class="panel-heading">
        <h3 class="panel-title" @click="toast">注册全局，toast</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color1: 'red',
        color2: 'skyblue'
      }
    },
    directives: {
      setColor: {
        // 指令的定义
        bind: function (el, bind) {
          el.style.color = bind.value;
        }
      }
    },
    mounted() {

    },
    methods: {
      toast() {
        this.$toast('这是一个Toast');
      }
    }
  }
</script>