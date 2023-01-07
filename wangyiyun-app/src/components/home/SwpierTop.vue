<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import axios from 'axios';
import { getBanner } from '@/request/api/home'
import { reactive, onMounted } from 'vue';
export default {
    setup() {
        const state = reactive({
            images: [
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
            ],
        });
        onMounted(async() => {
            let res = await getBanner()
            state.images = res.data.banners;
            // console.log(res);
            // axios.get('http://localhost:3000/banner?type=2').then((res) => {
            //     console.log(res);
            //     state.images = res.data.banners;
            //     console.log(state.images);
            // })
        })
        return { state };
    },
};

</script>

<style lang="less" >
#swiperTop {
    .van-swipe {
        width: 100%;
        padding: 10px;
        margin-left: -2%;

        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 3rem;
                border-radius: 0.2rem;
            }
        }

        .van-swipe__indicators {
            background-color: rgb(219, 130, 130);
            border-radius: 50%;
        }
    }

}
</style>