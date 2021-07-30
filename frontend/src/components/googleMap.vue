<template>
  <div>
    <div
      id="myMap"
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
    <div
      style="
        position: relative;
        z-index: 3;
        text-align: left;
        width: 200px;
        margin-left: 5vw;
      "
    >
      <div>
        <button class="myMenu" :class="{ selected: true }">
          <span
            @click="
              convertSelect();
              setLayerDefault();
            "
          >
            <hBtn></hBtn>
          </span>
          <span
            style="
              font-family: Prompt;
              font-weight: 750;
              font-size: 30px;
              margin-left: 8px;
            "
            >SONAR</span
          >
          <span><searchBar v-model="searched_location"></searchBar></span>
        </button>
      </div>
      <div>
        <button class="myButton" :class="{ selected: isSelected }">
          <span
            class="material-icons"
            style="
              font-size: 28px;
              margin-left: 4px;
              margin-right: 8px;
              color: #222831;
            "
          >
            radar
          </span>
          <span style="font-family: Prompt; font-weight: 400">Near Me</span>
        </button>
      </div>
      <!-- Layer Button -->
      <div style="width: 180px">
        <button
          class="myButton"
          :class="{ selected: isSelected }"
          @click="convertLayer()"
        >
          <span
            class="material-icons"
            style="
              font-size: 28px;
              margin-left: 4px;
              margin-right: 8px;
              color: #222831;
            "
          >
            layers
          </span>
          <span style="font-family: Prompt; font-weight: 400">Layer</span>
          <span class="material-icons" style="margin-left: 60px">
            chevron_right
          </span>
          <span style="margin-top: 8px; margin-left: 12px; margin-bottom: 7px" 
            ><button
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(),toggleScatter()"
            >
              <span
                class="material-icons"
                style="
                  font-size: 28px;
                  margin-left: 4px;
                  margin-right: 8px;
                  color: #222831;
                "
                
              >
                fmd_good
              </span>
            </button></span
          >
          <span style="margin-top: 8px; margin-left: 8px; margin-bottom: 7px"
            ><button
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(),toggleHeat()"
            >
              <span
                class="material-icons"
                style="
                  font-size: 28px;
                  margin-left: 4px;
                  margin-right: 8px;
                  color: #222831;
                "
              >
                fmd_good
              </span>
            </button></span
          >
          <span style="margin-top: 8px; margin-left: 8px; margin-bottom: 7px"
            ><button
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer()"
            >
              <span
                class="material-icons"
                style="
                  font-size: 28px;
                  margin-left: 4px;
                  margin-right: 8px;
                  color: #222831;
                "
              >
                fmd_good
              </span>
            </button></span
          >
        </button>
      </div>
      <!-- DashBoard Button -->
      <div>
        <button class="myButton" :class="{ selected: isSelected }">
          <span
            class="material-icons"
            style="
              font-size: 28px;
              margin-left: 4px;
              margin-right: 8px;
              color: #222831;
            "
          >
            layers
          </span>
          <span style="font-family: Prompt; font-weight: 400">Dashboard</span>
          <span
            class="material-icons"
            style="margin-left: 8px"
            @click="layerSelected = !layerSelected"
          >
            chevron_right
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, computed, onMounted } from 'vue';
import { useGeolocation } from '/src/useGeolocation.js';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import hamburgerBtn from './hamburgerBtn.vue';
import searchbar from './searchBar.vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD5OVCmPbVf6YZv6XRpN3NEfI1PzzOwBcU';

export default defineComponent({
  components: {
    hBtn: hamburgerBtn,
    searchBar: searchbar,
  },
  data() {
    return {
      isSelected: false,
      layerSelected: false,
      searched_location: '',
      coords: useGeolocation(),
      currPos: computed(() => ({
        lat: coords.value.latitude,
        lng: coords.value.longitude,
      })),
      sourceData: './gundata.json',
      myMap : null,
      loader: new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
        // myMap: null,
        // overlay: null,
        // scatterplot: null,
      }),
      scatterStatus: false,
      heatStatus: false,
    };
  },
  methods: {
    convertSelect() {
      //   console.log("isSelected toggle");
      return (this.isSelected = !this.isSelected);
    },
    setLayerDefault() {
      //   console.log("setlayerdefault");
      return (this.layerSelected = false);
    },
    convertLayer() {
      return (this.layerSelected = !this.layerSelected);
    },
    toggleScatter() {
        this.scatterStatus = !this.scatterStatus;
        // console.warn(this.scatterStatus);
        this.initMap();
    },
    toggleHeat() {
        this.heatStatus = !this.heatStatus;
        // console.warn(this.scatterStatus);
        this.initMap();
    },
    renderLayer(){
        const scatterplot = () =>
        new ScatterplotLayer({
          id: 'scatter',
          data: this.sourceData,
          opacity: 0.8,
          filled: true,
          radiusMinPixels: 2,
          radiusMaxPixels: 5,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) =>
            d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
          visible: this.scatterStatus,
        });
        
      const heatmap = () =>
        new HeatmapLayer({
          id: 'heat',
          data: this.sourceData,
          getPosition: (d) => [d.longitude, d.latitude],
          getWeight: (d) => d.n_killed + d.n_injured * 0.5,
          radiusPixel: 60,
          visible: this.heatStatus,
        });
      const overlay = new GoogleMapsOverlay({
        layers: [heatmap(), scatterplot()],
      });
      overlay.setMap(this.myMap);
      overlay.setProps();
      console.warn('Hi from renderLayer() and scatterStatus is ' + this.scatterStatus);
    },
    async initMap() {
      await this.loader.load();
      this.myMap = new google.maps.Map(document.getElementById('myMap'), {
        center: { lat: 42.9855, lng: -85.6656 } /*bkk latlng = 13,100*/,
        zoom: 7,
        streetViewControl: true,
        mapTypeControl: false,
        zoomControl: false,
        minZoom: 4,
        maxZoom: 15,
      });
      new google.maps.places.Autocomplete(
        document.getElementById('searchInput'),
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(42.9855, -85.6656),
          ),
        },
      );
      this.renderLayer();
    },
  },
  mounted() {
    this.initMap();
  },
});
</script>

const scatterplot = () => new ScatterplotLayer({ // new ScatterplotLayer({ id:
'scatter', data: sourceData, opacity: 0.8, filled: true, radiusMinPixels: 2,
radiusMaxPixels: 5, getPosition: (d) => [d.longitude, d.latitude], getFillColor:
(d) => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100], }); // const
heatmap = () => // new HeatmapLayer({ // id: 'heat', // data: sourceData, //
getPosition: (d) => [d.longitude, d.latitude], // getWeight: (d) => d.n_killed +
d.n_injured * 0.5, // radiusPixel: 60, // }); // const hexagon = () => // new
HexagonLayer({ // id: 'hex', // data: sourceData, // getPosition: (d) =>
[d.longitude, d.latitude], // getElevation: (d) => d.n_killed * 2 + d.n_injured,
// elevationScale: 100, // }); // const overlay = new GoogleMapsOverlay({ //
layers: [ // scatterplot(), // heatmap(), // // hexagon(), // ], // }); //
overlay.setMap(myMap); // //
overlay.setProps({layer:[scatterplot(),heatmap()]});
