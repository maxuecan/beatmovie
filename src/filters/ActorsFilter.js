import Vue from 'vue'
Vue.filter('actoesfilter', (dat) => {
    if(!data){
        return '暂无主演'
    }
    var result = data.map(item => item.name);
    return result.join('');
})
