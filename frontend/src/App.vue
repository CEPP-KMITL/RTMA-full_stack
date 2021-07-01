<template>
  <router-view>
      <div style="text-align:center">
          <h4>YOUR POSITION</h4>
          <h4>Latitude: {{ currPos.lat }}, Longitude: {{ currPos.lng }}</h4>
          <div ref="mapDiv" style="height: 100%;position: absolute; top: 0; bottom: -200px; left: 0; right: 0; z-index: 0;" />
      </div>
  </router-view>
  
  
</template>
<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useGeolocation } from './useGeolocation.js';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD5OVCmPbVf6YZv6XRpN3NEfI1PzzOwBcU'

export default defineComponent({
  name: 'App',
  setup(){
      const { coords } = useGeolocation();
      const currPos = computed(()=> ({
          lat: coords.value.latitude,
          lng: coords.value.longitude
      }))

      const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    onMounted(async () => {
      await loader.load()
      new google.maps.Map(mapDiv.value, {
        center: {lat: 13, lng: 100},
        zoom: 7
      })
    })
    return { currPos, mapDiv }
  }
})
</script>
