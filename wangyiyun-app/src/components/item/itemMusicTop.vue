<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" class="bgImg">
        <div class="itemLeft">
            <svg class="icon" color="#fff" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        // console.log(props);
        //通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的数据
        if ((props.playlist.creator='')) {
            props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
        };
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿"
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万"
            }
        }
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // padding: .2rem;
    .itemLeft {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;

        span {
            font-size: .4rem;
            color: #fff;
        }

        .icon {
            fill: #fff;
            width: 1rem;
            height: .7rem;
        }
    }

    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 0 10px;

        .icon {
            fill: #fff;
            width: 1rem;
            height: .5rem;
        }
    }

    .bgImg {
        width: 100%;
        height: 12rem;
        position: fixed;
        z-index: -1;
        filter: blur(10px);
    }
}
</style>