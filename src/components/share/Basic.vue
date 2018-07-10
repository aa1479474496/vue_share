<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">{{firstTitle}}</h3>
      </div>
    </div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">表单输入绑定</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-lg-6">
            <div class="input-group">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">Go!</button>
              </span>
              <input type="text" class="form-control" placeholder="Search for..." v-model="search">
            </div>
          </div>
          <div class="text-center col-lg-12">{{search}}</div>
        </div>
      </div>
    </div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">todo-list</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-lg-6">
            <div class="input-group" style="margin-bottom: 10px;">
              <input type="text" class="form-control" placeholder="Add a todo" v-model.trim="newTodoText">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button" @click="addNewTodo">Add</button>
              </span>
            </div>
            <ul class="list-group">
              <li class="list-group-item" v-for="(todo, index) in todos">{{todo.title}}
                <button type="button" class="btn btn-info btn-sm pull-right" style="margin-top: -5px;" @click="remove(index)">Remove</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'Basic',
    data() {
      return {
        firstTitle: '声明式渲染',
        search: '',
        newTodoText: '',
        todos: [
          {
            id: 1,
            title: 'Do the dishes',
          },
          {
            id: 2,
            title: 'Take out the trash',
          },
          {
            id: 3,
            title: 'Mow the lawn'
          }
        ],
        nextTodoId: 4
      }
    },
    methods: {
      addNewTodo() {
        if(!this.newTodoText)return;
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        })
        this.newTodoText = ''
      },
      remove(index) {
        this.todos.splice(index, 1)
      }
    }
  }
</script>