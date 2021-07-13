<template>
  <router-view>
      <input id="searchInput" class="controls" type="text" placeholder="Enter a location">
    <div
      ref="mapDiv"
      style="
        height: 100%;
        position: absolute;
        top: 0;
        bottom: -200px;
        left: 0;
        right: 0;
        z-index: 0;
      "
    />
    <div>
        <myMenu></myMenu>
    </div>
    
  </router-view>
</template>
<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useGeolocation } from "./useGeolocation.js";
import { Loader } from "@googlemaps/js-api-loader";
import mainMenu from "./components/mainMenu.vue";
import dropDownBtn from "./components/dropDownBtn.vue";
import productName from "./components/productName.vue";

const GOOGLE_MAPS_API_KEY = "AIzaSyD5OVCmPbVf6YZv6XRpN3NEfI1PzzOwBcU";

export default defineComponent({
  name: "App",
  components: {
    myMenu: mainMenu,
    dBtn: dropDownBtn,
    pName: productName,
  },
  setup() {
    const { coords } = useGeolocation();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    onMounted(async () => {
      await loader.load();
      new google.maps.Map(mapDiv.value, {
        center: { lat: 13, lng: 100 },
        zoom: 7,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
      });
    });
    return { currPos, mapDiv };
  },
  data() {
    return {
    };
  },
});
</script>
