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
      id="myMenu"
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
            id="productName"
            style="
              font-family: Prompt;
              font-weight: 750;
              font-size: 30px;
              margin-left: 8px;
              color: #f1ece3;
            "
            >SONAR</span
          >
          <span><searchBar v-model="searched_location"></searchBar></span>
        </button>
      </div>
      <div>
        <button id="nearme" class="myButton" :class="{ selected: isSelected }">
          <span
            id="nearmeIcon"
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
          <span id="nearmeLabel" style="font-family: Prompt; font-weight: 400"
            >Near Me</span
          >
        </button>
      </div>
      <!-- Layer Button -->
      <div style="width: 180px">
        <button
          id="layer"
          class="myButton"
          :class="{ selected: isSelected }"
          @click="convertLayer()"
        >
          <span
            id="layerIcon"
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
          <span id="layerLabel" style="font-family: Prompt; font-weight: 400"
            >Layer</span
          >
          <span
            id="layerArrow"
            class="material-icons"
            style="margin-left: 60px"
          >
            chevron_right
          </span>
          <span style="margin-top: 8px; margin-left: 12px; margin-bottom: 7px"
            ><button
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(), toggleScatter()"
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
              @click="convertLayer(), toggleHeat()"
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
        <button
          id="dashboard"
          class="myButton"
          :class="{ selected: isSelected }"
        >
          <span
            id="dashboardIcon"
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
          <span
            id="dashboardLabel"
            style="font-family: Prompt; font-weight: 400"
            >Dashboard</span
          >
          <span
            id="dashboardArrow"
            class="material-icons"
            style="margin-left: 8px"
            @click="layerSelected = !layerSelected"
          >
            chevron_right
          </span>
        </button>
      </div>
      <div>
        <button
          id="darkmodeBtn"
          class="myButton"
          :class="{ selected: isSelected }"
          @click="toggleMapTheme(this.currMapId), themeSwitch(this.curTheme)"
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
          <span style="font-family: Prompt; font-weight: 400">Dark Mode</span>
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
import { defineComponent, computed } from 'vue';
import { useGeolocation } from '/src/useGeolocation.js';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import hamburgerBtn from './hamburgerBtn.vue';
import searchbar from './searchBar.vue';
import axios from 'axios';

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
      myMap: null,
      loader: new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      }),
      scatterStatus: false,
      heatStatus: false,
      currMapId: '77019c2d28bf4b75',
      curTheme: 'dark',
      accidentsData: [],
    };
  },
  methods: {
    themeSwitch(theme) {
      console.log('prev theme : ' + theme);
      if (theme == 'dark') {
        document.getElementById('productName').style.color = '#222831';
        document.getElementById('nearme').style.background = '#4D6180';
        document.getElementById('nearmeIcon').style.color = '#F1ECE3';
        document.getElementById('nearmeLabel').style.color = '#F1ECE3';
        document.getElementById('layer').style.background = '#4D6180';
        document.getElementById('layerIcon').style.color = '#F1ECE3';
        document.getElementById('layerLabel').style.color = '#F1ECE3';
        document.getElementById('layerArrow').style.color = '#F1ECE3';
        document.getElementById('dashboard').style.background = '#4D6180';
        document.getElementById('dashboardIcon').style.color = '#F1ECE3';
        document.getElementById('dashboardLabel').style.color = '#F1ECE3';
        document.getElementById('dashboardArrow').style.color = '#F1ECE3';
        this.curTheme = 'light';
      } else if (theme == 'light') {
        document.getElementById('productName').style.color = '#F1ECE3';
        document.getElementById('nearme').style.background = '#F2B963';
        document.getElementById('nearmeIcon').style.color = '#222831';
        document.getElementById('nearmeLabel').style.color = '#222831';
        document.getElementById('layer').style.background = '#F2B963';
        document.getElementById('layerIcon').style.color = '#222831';
        document.getElementById('layerLabel').style.color = '#222831';
        document.getElementById('layerArrow').style.color = '#222831';
        document.getElementById('dashboard').style.background = '#F2B963';
        document.getElementById('dashboardIcon').style.color = '#222831';
        document.getElementById('dashboardLabel').style.color = '#222831';
        document.getElementById('dashboardArrow').style.color = '#222831';
        this.curTheme = 'dark';
      }
      console.log('hi from themeswitch : ' + theme);
    },
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
      this.renderLayer();
    },
    toggleHeat() {
      this.heatStatus = !this.heatStatus;
      // console.warn(this.scatterStatus);
      this.initMap();
    },
    toggleMapTheme(id) {
      if (id == '77019c2d28bf4b75') {
        this.currMapId = '142837500402f49f';
      } else {
        this.currMapId = '77019c2d28bf4b75';
      }
      console.warn(this.currMapId + ' is current MapId');
      this.initMap();
    },
    // newRender(){
    //     const deckOverlay = new deck,GoogleMapsOverlay
    // },
    renderLayer() {
      const scatterplot = () =>
        new ScatterplotLayer({
          id: 'scatter',
          data: this.accidentsData.getIncidents,
          opacity: 0.8,
          filled: true,
          radiusMinPixels: 5,
          radiusMaxPixels: 13,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) => [200, 0, 40, 150],
          visible: true,
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
    },
    async initMap() {
      await this.loader.load();
      this.myMap = new google.maps.Map(document.getElementById('myMap'), {
        center: { lat: 13, lng: 100 } /*bkk latlng = 13,100*/,
        zoom: 7,
        streetViewControl: true,
        mapTypeControl: false,
        zoomControl: false,
        minZoom: 4,
        maxZoom: 15,
        mapId: this.currMapId,
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
    fetch('http://localhost:8000/api/v1/incidents/getOneDay')
      .then(res => res.json())
      .then(data => {
          this.accidentsData = data;
          console.log('Data is : ',this.accidentsData.getIncidents);
      })
      .catch(err => console.warn(err));
    this.initMap();
  },
});
</script>
