<template>
  <div class="home">
    <TopNavVue></TopNavVue>
    <SwpierTopVue></SwpierTopVue>
    <iconListVue></iconListVue>
    <MusicList></MusicList>
  </div>
</template>

<script>
import iconListVue from '@/components/home/iconList.vue';
import MusicListVue from '@/components/home/MusicList.vue';
import SwpierTopVue from '@/components/home/SwpierTop.vue';
import TopNavVue from '@/components/home/TopNav.vue';
export default {
  name: 'HomeView',
  components: {
    iconListVue,
    MusicListVue,
    SwpierTopVue,
    TopNavVue,
  }
}
</script>

<style>
.home {
  background-color: rgba(255, 255, 255, .3);
}


</style>
