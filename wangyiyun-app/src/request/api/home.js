import service from "..";

//获取首页轮播图数据
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2',
    })
}

//获取发现好歌单
export function getMusicList() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}

//登录 获取电话登录
export function getPhoneLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
        withCredentials: true,
    })
}