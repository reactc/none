<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>滑切屏上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
            <audio ref="audio"
                :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>

            <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
                <musicDetailVue :musicList="playList[playListIndex]" :play="play" :isBtnShow="isBtnShow" :addDuration="addDuration">
                </musicDetailVue>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import musicDetailVue from './musicDetail.vue';
export default {
    data() {
        return {
            interVal: 0,
        };
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isBtnShow', 'detailShow'])
    },
    mounted() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        // console.log(this.$refs)
        this.updateTime();
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        this.addDuration();
    },
    methods: {
        play: function () {
            //判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsBtnShow(false);//播放调用函数传值
                this.updateTime()
            } else {
                this.$refs.audio.pause();
                this.updateIsBtnShow(true);
                clearInterval(this.interVal);//暂停清除定时器
            }
        },
        //添加总时长
        addDuration: function () {
            this.updateDuration(this.$refs.audio.duration);
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime);
            }, 500)
        },
        ...mapMutations(['updateIsBtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
    },
    watch: {
        playListIndex: function () {
            //监听下标，如果下标发生改变，就自动播放音乐
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                //如果是暂停状态，改变图标
                this.updateIsBtnShow(false);
            }
        },
        playList: function () {
            if (this.isBtnShow) {
                this.$refs.audio.autoplay = true;
                this.updateIsBtnShow(false);
            }
        }
    },
    components: {
        musicDetailVue
    }
}
</script>

<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: .2px;
    justify-content: space-between;

    .footerLeft {
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: .2rem;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>