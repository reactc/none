<template>
    <div class="itemList">
        <div class="itemListHead">
            <div class="listHeadLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>播放全部</span>
                <span>(共{{ itemList.length }}首)</span>
            </div>
            <div class="listHeadRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="listSongs" v-for="(item, i) in itemList" :key="item.index">
            <div class="listSongsLeft" @click="playMusic(i)">
                <span>{{ i + 1 }}</span>
                <div class="songInfo">
                    <span>{{ item.name }}</span>
                </div>
                <span v-for="i in item.ar" :key="i.index">{{ i.name }}</span>
            </div>
            <div>
                <svg class="icon" aria-hidden="true" v-if="item.mv !=0">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    setup(props) {
        // console.log(props);
    },

    methods: {
        playMusic:function(i){
            this.updatePlayList(this.itemList);
            this.updatePlayListIndex(i);
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    },
    props: ['itemList', 'subscribedCount',]

}
</script>

<style lang="less" scoped>
.itemList {
    background: rgba(255, 255, 255, .7);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    width: 100%;

    // margin-top: .5rem;
    .itemListHead {
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .listHeadLeft {
            height: 100%;
            line-height: 1rem;
            display: flex;
            align-items: center;

            // border: 1px solid red;
            // justify-content: space-between;
            .icon {
                margin: 10px 10px;
                width: 0.7rem;
                height: 0.7rem;
            }

            & span:nth-child(2) {
                font-size: .4rem;
            }

            & span:nth-child(3) {
                color: rgba(1, 1, 1, .6);
            }
        }

        .listHeadRight {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3.5rem;
            height: .95rem;
            margin-right: 5px;
            background: rgb(255, 45, 45);
            border-radius: 0.6rem;
            color: #fff;
            font-size: .4rem;

            .icon {
                fill: #fff;
            }
        }
    }

    .listSongs {
        width: 100%;
        height: 1.5rem;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: -7px 0;

        .listSongsLeft {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                overflow: hidden;

                &:nth-child(1) {
                    margin: 1px 10px;
                    font-size: 16px;
                }
            }

            .songInfo {
                display: inline-flex;
                flex-direction: column;
                align-items: left;

                & span:nth-child(1) {
                    font-size: 15px;
                    font-weight: 900;
                }


            }
        }

        .icon {
            margin-right: 10px;
        }
    }
}
</style>