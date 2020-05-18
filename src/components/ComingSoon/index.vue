<template>
    <div class="movie_body">
        <Loading v-if="isload"></Loading>
        <Scroller v-else>
            <ul>
                <li v-for="item in datalist" :key="item.id">
                    <div class="pic_show"><img :src="handlePath(item.img)"></div>
                    <div class="info_list">
                        <h2>{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p><span class="person">{{item.wish}}</span> 人想看</p>
                        <p>主演: {{item.star ? item.star : '暂无主演'}}</p>
                        <p>{{item.rt}}上映</p>
                    </div>
                    <div class="btn_pre">
                        预售
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name : 'ComingSoon',
    data () {
        return {
            datalist : [],
            isload : true
        }
    },
    mounted () {
        axios.get('/ajax/comingList?ci=117&token=&limit=10&optimus_uuid=E15219D07F8A11EAB979FB7F49E68F63D530E4486E084FB09C52D73B95FCD0A2&optimus_risk_level=71&optimus_code=10').then(res =>{
            this.datalist = res.data.coming,
            this.isload = false
        }).catch(err=>{
            console.log(err)
        })
    },
    methods : {
        handlePath (path) {
            return path.replace('w.h','128.180')
        }
    }
}
</script>
<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
