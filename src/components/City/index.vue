<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isload"></Loading>
            <Scroller ref="city_List" v-else>
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hostlist" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="data in cityList" :key="data.index">
                            <h2>
                                {{ data.index }}
                            </h2>
                            <ul>
                                <li v-for="item in data.city" :key="item.id" @tap="handleToCity(item.nm , item.id)">
                                    {{item.nm}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
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
            cityList : [],
            hostlist : [],
            isload : true
        }
    },
    mounted () {
        var cityList = window.localStorage.getItem('cityLsit');
        var hostlist = window.localStorage.getItem('hostlist')
        if(cityList && hostlist){
            this.cityList = JSON.parse(cityList)
            this.hostlist = JSON.parse(hostlist)
            this.isload = false
        }
        else{
            this.axios.get('/api/cityList').then(res => {
                var msg = res.data.msg;
                if(msg === "ok"){
                    console.log(res.data)
                    //    var { citylist , hostlist } = this.handleCityArr(res.data.data.cities)
                    //    this.citylist = citylist
                    //    this.hotlist = hostlist 
                    var cities = res.data.data.cities;
                    var { cityList , hostlist} = this.hanldeCityArr(cities);
                    this.cityList = cityList;
                    this.hostlist = hostlist;
                    this.isload = false;
                    window.localStorage.setItem('citylist' , JSON.stringify(cityList));
                    window.localStorage.setItem('hostlist' , JSON.stringify(hostlist))
                }
            })
        }
    },
    methods : {
        hanldeCityArr(cities){
            var arr = [];
            var cityList = [];
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
                var newarr = cities.filter(item=>item.py.substring(0,1) === arr[j].toLowerCase())
                if(!(newarr.length ===0)){
                    cityList.push({
                        index:arr[j],
                        city:newarr
                    })
                }
            }
            // console.log(newarr)
            // console.log(citylist)
            // console.log(hostlist)
            return {
                cityList,
                hostlist
            }
        },
        handleToIndex (index) {
            var h2 =this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
            this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
        },
        handleToCity(nm,id){
        this.$store.commit('city/CITY_INFO',{ nm , id});
        window.localStorage.setItem('nowNm',nm);
        window.localStorage.setItem('nowId',id);
        this.$router.push('./movie/nowplaying');
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
