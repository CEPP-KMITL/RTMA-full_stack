<template>
  <router-view>
    <div><gMap></gMap></div>
    <!-- <div>
      <myMenu></myMenu>
    </div> -->
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
