
var Toast = {};
Toast.install = function (Vue, options) {
  let opt = {
    defaultType: 'center',
    duration: '1500'
  }

  for (let property in options) {
    opt[property] = options[property];
  } 

  Vue.prototype.$toast = (tips, type) => {
    if (type) {
      opt.defaultType = type;
    }
    if (document.getElementsByClassName('vue-toast').length) return;
    let temp = `<div class="toast-box toast-${type}">
                        <div class="toast-mask"></div>
                        <div class="vue-toast">
                            <div class="toast-content">${tips}</div>
                        </div>
                    </div>
                    `;
    let toastTpl = Vue.extend({
      template: temp,
      methods: {
      }
    });
    let tpl = new toastTpl().$mount().$el;
    document.body.appendChild(tpl);
    setTimeout(() => { remove(tpl) }, opt.duration)
  };

  ['bottom', 'center', 'top'].forEach(type => {
    Vue.prototype.$toast[type] = (tips) => {
      return Vue.prototype.$toast(tips, type)
    }
  });

  function remove(tpl) {
    if (!document.getElementsByClassName('vue-toast').length) return;
    document.body.removeChild(tpl); 
  }
}



export default Toast;
