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
        },
        {
            path : '/movie',
            redirect : '/movie/nowplaying'
        }
    ]
}