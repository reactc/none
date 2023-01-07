<template>
    <div class="itemEdit">
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <div>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <span>下载</span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        // console.log(props);
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>
.icon {
    width: .6rem;
    height: 1rem;
}

.itemEdit {
    display: flex;
    width: 100%;
    height: 2rem;
    // border: 1px solid red;
    justify-content: space-around;
    align-items: center;
    fill: #fff;
    color: #fff;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>