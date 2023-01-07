<template>
    <img :src="musicList.al.picUrl" class="bgimg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon liebiao" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <Vue3Marquee style="color:#fff">{{ musicList.al.name }}</Vue3Marquee>
                <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isBtnShow }">
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" @click="isLyricShow = true" class="img_ar"
            :class="{ img_ar_active: !isBtnShow, img_ar_paused: isBtnShow }">
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
        <p v-for="item in lyric" :key="item"
            :class="{ active: currentTime * 1000 >= item.time && currentTime * 1000 < item.pre }"
            @click="isLyricShow = false">
            {{ item.lrc }}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footer">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon liebiao bfzt" aria-hidden="true" v-if="isBtnShow" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon liebiao bfzt" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee';
import 'vue3-marquee/dist/style.css';
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            isLyricShow: false,
        };
    },
    mounted() {
        // console.log(this.musicList);
        this.addDuration();
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
        lyric: function () {
            let arr;
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length)
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + Number(mill);
                    // console.log(min,sec,mill,lrc);
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + Number(mill);
                    }
                    return { min, sec, mill, lrc, time };
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time
                    }
                })
            }
            // console.log(arr);
            return arr;
        }
    },

    props: ['musicList', 'isBtnShow', 'play', 'addDuration'],
    methods: {
        backHome: function () {
            this.updateDetailShow()
            this.isLyricShow = false;
        },
        goPlay: function (num) {
            let index = this.playListIndex + num;
            if (index < 0) {
                index = this.playList.length - 1;
            } else if (index == this.playList.length) {
                index = 0;
            }
            this.updatePlayListIndex(index);
        },
        ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
    },
    watch: {
        currentTime: function (newValue) {
            let p = document.querySelector("p.active");
            // console.log([p]);
            if (p) {
                if (p.offsetTop > 300) {
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
                }
            }
            if (newValue === this.duration) {
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0);
                    this.play();
                } else {
                    this.updatePlayListIndex(this.playListIndex + 1);
                }
            }
        }
    },
    components: {
        Vue3Marquee,
    },
}
</script>

<style lang="less" scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
    margin-top: 5px;

    .detailTopLeft {
        display: flex;
        align-items: center;

        .leftMarquee {
            width: 3rem;
            height: 100%;
            margin-left: 0.4rem;

            span {
                color: #999;
                opacity: .9;
            }

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #999;
            }
        }
    }
}

.detailContent {
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
        width: 2.2rem;
        height: 3.8rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .img_needle_active {
        width: 2rem;
        height: 3.8rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-3deg);
        transition: all 2s;
    }

    .img_cd {
        width: 6rem;
        height: 6rem;
        position: absolute;
        bottom: 1.7rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;
        position: absolute;
        bottom: 2.8rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.musicLyric {
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .5rem;
    overflow: scroll;
    // transition: all .3s linear;
    scroll-behavior: smooth;



    p {
        color: rgba(255, 255, 255, .5);
        margin-bottom: 0.7rem;
        // transition: all .3s linear;
        // animation-duration: lyric .5s linear;
        // scroll-behavior: smooth;
    }

    .active {
        color: #fff;
        font-size: 0.55rem;
        transition: all .3s linear;
        animation-duration: .5s linear;
        // scroll-behavior: smooth;
    }
}

.detailFooter {
    width: 100%;
    height: 3.5rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.36rem;
            height: 0.36rem;
            fill: rgb(245, 234, 234);
        }

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }

    .range {
        width: 100%;
        height: 0.06rem;
        border-radius: 10px;
    }

    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            fill: rgb(245, 234, 234);
        }

        .bfzt {
            width: 1rem;
            height: 1rem;
        }

    }
}
</style>