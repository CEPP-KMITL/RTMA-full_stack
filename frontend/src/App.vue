<template>
  <router-view>
    <div><gMap></gMap></div>
  </router-view>
</template>
<script>
import { defineComponent} from 'vue';
import googleMap from './components/googleMap.vue'


export default defineComponent({
  name: 'App',
  components: {
    gMap: googleMap,
  },
  methods:{
  }

});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
</style>
