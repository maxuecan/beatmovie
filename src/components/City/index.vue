<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hostlist" :key="item.cityId">{{ item.name }}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="data in citylist" :key="data.index">
                    <h2>
                        {{ data.index }}
                    </h2>
                    <ul>
                        <li v-for="item in data.city" :key="item.cityId">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in citylist" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
export default {
    name : 'City',
    data () {
        return {
            citylist : [],
            hostlist : []
        }
    },
    mounted () {
       this.axios({
           url : 'https://m.maizuo.com/gateway?k=1090715',
           headers : {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15872805821348619731225"}',
                'X-Host': 'mall.film-ticket.city.list'
           }
       }).then(res => {
           var msg = res.data.msg;
           if(msg === "ok"){
            //    var { citylist , hostlist } = this.handleCityArr(res.data.data.cities)
            //    this.citylist = citylist
            //    this.hotlist = hostlist 
            var cities = res.data.data.cities;
            var { citylist , hostlist} = this.hanldeCityArr(cities);
            this.citylist = citylist;
            this.hostlist = hostlist
           }
       })
    },
    methods : {
        hanldeCityArr(cities){
            var arr = [];
            var citylist = [];
            var hostlist = [];
            // 将Unicode编码转换为字符
            for(var i=65;i<91;i++){
                arr.push(String.fromCharCode(i));
            }
            // 获取热门地方
            for(var s=0;s<cities.length;s++){
                if(cities[s].isHot === 1){
                    hostlist.push(cities[s])
                }
            }
            for(var j=0;j<arr.length;j++){
                var newarr = cities.filter(item=>item.pinyin.substring(0,1) === arr[j].toLowerCase())
                if(!(newarr.length ===0)){
                    citylist.push({
                        index:arr[j],
                        city:newarr
                    })
                }
            }
            // console.log(newarr)
            // console.log(citylist)
            // console.log(hostlist)
            return {
                citylist,
                hostlist
            }
        },
        handleToIndex (index) {
            var h2 =this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
        }
    }
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
