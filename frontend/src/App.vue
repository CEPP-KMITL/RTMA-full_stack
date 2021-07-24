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
import mainMenu from './components/mainMenu.vue';
import dropDownBtn from './components/dropDownBtn.vue';
import productName from './components/productName.vue';
import googleMap from './components/googleMap.vue'


export default defineComponent({
  name: 'App',
  components: {
    myMenu: mainMenu,
    dBtn: dropDownBtn,
    pName: productName,
    gMap: googleMap,
  },
  methods:{
  }

});
</script>
