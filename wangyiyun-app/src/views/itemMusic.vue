<template>
  <div>
    <itemMusicTopVue :playlist="state.playlist"></itemMusicTopVue>
    <itemDetail :playlist="state.playlist"></itemDetail>
    <itemCheeseVue :playlist="state.playlist"></itemCheeseVue>
    <itemMusicListVue :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></itemMusicListVue>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicItemList, getItemList } from '@/request/api/item';
import itemMusicTopVue from '@/components/item/itemMusicTop.vue';
import itemDetail from '@/components/item/itemDetail'
import itemCheeseVue from '@/components/item/itemCheese.vue';
import itemMusicListVue from '@/components/item/itemMusicList.vue';
export default {
  setup() {
    const state = reactive({
      playlist: {},//歌单详情
      itemList:[]//歌单歌曲
    })
    onMounted(async () => {
      let id = useRoute().query.id;
      // console.log(id);
      //获取歌单详情
      let res = await getMusicItemList(id);
      // console.log(res);
      state.playlist = res.data.playlist;
      // console.log(res);
      //获取歌单歌曲
      let result = await getItemList(id)
      // console.log(result);
      state.itemList = result.data.songs
      // 防止页面刷新，数据丢失，将数据保存到sessionStorage
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    });
    return { state }
  },
  components: {
    itemMusicTopVue,
    itemDetail,
    itemCheeseVue,
    itemMusicListVue,
  }
}
</script>

<style>

</style>