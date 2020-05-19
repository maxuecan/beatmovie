export default {
    path : '/movie',
    // 按需载入
    component : () => import('@/views/Movie'),
    children :[
        {
            path : 'nowplaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingsoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
            // 正常配置解耦
            // props :true
        },
        {
            path : 'detail/1/:movieId',
            components : {
                default : () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/detail')
            },
            props : {
                detail :true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail')
            },
            props : {
                detail :true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowplaying'
        }
    ]
}