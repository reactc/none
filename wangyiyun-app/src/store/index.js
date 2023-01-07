import { createStore } from 'vuex';
import { getMusicLyric } from '@/request/api/item';
import { getPhoneLogin } from '@/request/api/home';
export default createStore({
  state: {
    playList: [{
      //播放列表
      al: {
        id: 91237927,
        name: "梨冻紧",
        pic: 109951165076380460,
        picUrl: "https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg",
        pic_str: "109951165076380471"
      },
      id: 1456890009,
      name: '罗生门（Follow）',
      ar: [{ name: "灏灏灏仔" }]
    }],
    playListIndex: 0,//默认下表为0
    isBtnShow: true,//暂停按钮的显示
    detailShow: false,
    lyricList: {},//歌词部分
    currentTime: 0, //当前时间
    duration: 0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
  },
  getters: {
  },
  mutations: {
    updateIsBtnShow: function (state, value) {
      state.isBtnShow = value;
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    updatePlayList: function (state, value) {
      state.playList = value;
      // console.log(state);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit('updateLyricList', res.data.lrc)
    },
    getLogin:async function (context,value) {
      let res = await getPhoneLogin(value);
      context.state.Cookie=await res.data.cookie
      console.log(res);
    }
  },
  modules: {
  }
})
