<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="山鬼" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>

    <div class="itemList">
        <!-- <div class="itemListHead">
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
        </div> -->
        <div class="listSongs" v-for="(item, i) in searchList" :key="i">
            <div class="listSongsLeft" @click="updateIndex(item,i)">
                <span>{{ i + 1 }}</span>
                <div class="songInfo">
                    <span>{{ item.name }}</span>
                </div>
                <span v-for="i in item.artists" :key="i.index">{{ i.name }}</span>
            </div>
            <div>
                <svg class="icon" aria-hidden="true" v-if="item.mvid != 0">
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
import { getSearchMusic } from '@/request/api/item'
export default {
    data() {
        return {
            keyWorldList: [],
            searchKey: "",
            searchList: [],
        };
    },
    mounted() {
        this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList") || '[]');
    },
    methods: {
        enterKey: async function () {
            if (this.searchKey != "") {
                this.keyWorldList.unshift(this.searchKey);
                //去重
                this.keyWorldList = [...new Set(this.keyWorldList)];
                //固定长度
                if (this.keyWorldList.length > 10) {
                    this.keyWorldList.splice(this.keyWorldList.length - 1, 1)
                }
                localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
                let res = await getSearchMusic(this.searchKey);
                // console.log(res);
                this.searchList = res.data.result.songs;
                this.searchKey = "";
            }
        },
        delHistory: function () {
            localStorage.removeItem('keyWorldList');
            this.keyWorldList = []
        },
        searchHistory: async function (item) {
            let res = await getSearchMusic(item);
            console.log(res);
            this.searchList = res.data.result.songs;
        },
        updateIndex:function(item,i){
            item.al = item.album;
            item.al.picUrl = item.album.artist.img1v1Url;
            this.$store.commit('pushPlayList',item);
            this.$store.commit('updatePlayListIndex',this.$store.state.playList.length-1);
        }
    },
}
</script>

<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: .1rem;
    }
}

.searchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    .searchSpan {
        font-size: .4rem;
        font-weight: 700;
    }

    .spanKey {
        padding: .1rem .2rem;
        background-color: rgb(185, 169, 169);
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }

    .icon {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: .2rem;
        top: .3rem;
    }
}

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