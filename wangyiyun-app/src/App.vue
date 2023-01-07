<template>
        <router-view></router-view>
        <FooterMusicVue v-show="$store.state.isFooterMusic"></FooterMusicVue>
</template>

<script>
import FooterMusicVue from './components/item/FooterMusic.vue';
export default {
    components:{
        FooterMusicVue,
    }
}
</script>

<style type="text/css">
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
.icon{
    width: .5rem;
    height: .5rem;
    color: #fff;
}
a{
    color: black;
}
</style>