<template>

  <div class="q-ma-lg">
    <dashbroad/>
  </div>

</template>

<script>
// import { ref } from 'vue'
import store from './store/index'
import dashbroad from './components/dashbroad.vue'

export default {
  name: 'LayoutDefault',
  store,

  components: {
    dashbroad
  },

}
</script>