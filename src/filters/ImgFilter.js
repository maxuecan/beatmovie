import Vue from 'vue'
Vue.filter('imgesfilter',function(path){
    return path.relace('w.h','128.180')
})