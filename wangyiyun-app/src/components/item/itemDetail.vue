<template>
    <div class="itemDetails">
        <div class="detailImg">
            <img :src="playlist.coverImgUrl" alt="">
            <span class="playCount">
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
                {{ changeCount(playlist.playCount) }}
            </span>
        </div>
        <div class="detailAbout">
            <h3 class="musicTitle">{{ playlist.name }}</h3>
            <div class="author">
                <img :src="playlist.creator.avatarUrl" alt="">
                <span class="authorName">{{ playlist.creator.nickname }}
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou1"></use>
                    </svg>
                </span>
            </div>
            <div class="itemAbout">
                <span>{{ playlist.description }}</span>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    setup(props) {
        // console.log(props);
        if ((props.playlist.creator = '')) {
            props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
        };
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿"
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万"
            }
        }
        return { changeCount }
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>
.itemDetails {
    width: 95%;
    margin: 10px auto;
    height: 3rem;
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .detailImg {
        width: 35%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            border-radius: 15%;
        }

        .playCount {
            position: absolute;
            top: 6px;
            left: 45px;
            line-height: 10px;
            color: #fff;

            .icon {
                width: .3rem;
                height: .3rem;
                fill: #fff;
            }
        }
    }

    .detailAbout {
        width: 60%;
        height: 95%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .musicTitle {
            color: #fff;
            font-size: 15px;
            width: 100%;
            height: 30%;
            overflow: hidden;
        }

        .author {
            height: 30%;
            width: 100%;

            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
            }

            span {
                position: relative;
                top: -8px;
                margin-left: 5px;
                color: #fff;
            }

            .icon {
                fill: #fff;
                position: absolute;
                top: -4px;
            }
        }

        .itemAbout {
            display: flex;
            width: 100%;
            height: 30%;
            overflow: hidden;
            flex-direction: row;
            color: rgba(255, 255, 255, 0.6);

            .icon {
                fill: rgba(255, 255, 255, 0.6);
                margin-left: 3px;
            }
        }
    }
}
</style>