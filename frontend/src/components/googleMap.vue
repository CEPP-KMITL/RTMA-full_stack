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
    <div id="tooltip"></div>
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
              font-family: 'Prompt', sans-serif;
              font-weight: 750;
              font-size: 30px;
              margin-left: 8px;
              color: #f1ece3;
            "
            >SONAR</span
          >
          <span style="margin-left: 24px">
            <input
              type="checkbox"
              id="toggle"
              class="toggle--checkbox"
              @click="
                toggleMapTheme(this.currMapId), themeSwitch(this.curTheme)
              "
            />
            <label for="toggle" class="toggle--label">
              <span class="toggle--label-background"></span>
            </label>
          </span>
          <span
            ><input
              class="searchBar"
              :class="{ selected: isSelected }"
              id="searchInput"
              type="text"
              placeholder=" Enter Location..."
              style="item-align: center"
          /></span>
        </button>
      </div>
      <div>
        <button
          id="nearme"
          class="myButton"
          :class="{ selected: isSelected }"
          @click="locateCurrent()"
        >
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
          <span id="nearmeLabel" style="font-family: 'Prompt', sans-serif; font-weight: 400"
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
          <span id="layerLabel" style="font-family: 'Prompt', sans-serif; font-weight: 400"
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
              id="scatterButton"
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(), toggleScatter()"
            >
              <span
                id="scatterIcon"
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
              id="heatButton"
              class="layerButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(), toggleHeat()"
            >
              <span
                id="heatIcon"
                class="material-icons"
                style="
                  font-size: 28px;
                  margin-left: 4px;
                  margin-right: 8px;
                  color: #222831;
                "
              >
                local_fire_department
              </span>
            </button></span
          >
          <span style="margin-top: 8px; margin-left: 8px; margin-bottom: 7px"
            ><button
              class="layerButton"
              id="hexButton"
              :class="{ selected: layerSelected }"
              @click="convertLayer(), toggleHex()"
            >
              <span
                id="hexIcon"
                class="material-icons"
                style="
                  font-size: 28px;
                  margin-left: 5px;
                  margin-right: 8px;
                  color: #222831;
                "
              >
                dangerous
              </span>
            </button></span
          >
        </button>
      </div>
      <!-- DashBoard Button -->
      <div>
        <div
          id="dashboard"
          class="myButton"
          @click="openDashboard()"
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
            leaderboard
          </span>
          <span
            id="dashboardLabel"
            style="font-family: 'Prompt', sans-serif; font-weight: 400"
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
        </div>
      </div>

      <dBoard id="dashBoard" ref="dBoard"></dBoard>
      <div>
        <button
          id="history"
          class="myButton"
          :class="{ selected: isSelected }"
          @click="toggleDataRange()"
        >
          <span
            id="historyIcon"
            class="material-icons"
            style="
              font-size: 28px;
              margin-left: 4px;
              margin-right: 8px;
              color: #222831;
            "
          >
            remove_red_eye
          </span>
          <span id="historyLabel" style="font-family: 'Prompt', sans-serif; font-weight: 400"
            >View History</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import hamburgerBtn from './hamburgerBtn.vue';
import dashboard from './dashboard.vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD5OVCmPbVf6YZv6XRpN3NEfI1PzzOwBcU';
export default defineComponent({
  components: {
    hBtn: hamburgerBtn,
    dBoard: dashboard,
  },
  data() {
    return {
      isSelected: false,
      layerSelected: false,
      searched_location: '',
      currPos: null,
      myMap: null,
      loader: new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      }),
      scatterStatus: false,
      heatStatus: false,
      hexStatus: false,
      currMapId: '142837500402f49f',
      curTheme: 'light',
      currentData: [],
      overlay: null,
      searchPlace: document.querySelector('input'),
      alltimeData: [],
      oneDayData: [],
      dataState: 0,
    };
  },
  methods: {
    showPlace() {
      var input = document.getElementById('searchInput');
      alert(input.value);
    },
    async toggleDataRange() {
      if (this.dataState == 1) {
        this.dataState = 0;
        this.currentData = this.oneDayData;
      } else {
        this.dataState = 1;
        this.currentData = this.alltimeData;
      }
      await this.clearLayer();
      await this.renderLayer();
    },
    zoomOut() {
      this.myMap.setZoom(5);
    },
    zoomIn() {
      this.myMap.setZoom(17);
    },
    panToNY() {
      var latLng = new google.maps.LatLng(40.745255, -74.034775);
      this.myMap.panTo(latLng);
      this.myMap.setZoom(10);
      //   console.log('panned');
    },
    panToBKK() {
      var latLng = new google.maps.LatLng(18.811, 98.999);
      this.myMap.panTo(latLng);
      //   console.log('panned');
    },
    panToCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.myMap.setCenter(pos);
          },
          () => {
            handleLocationError(this.myMap.getCenter());
          },
        );
      } else {
        handleLocationError(this.myMap.getCenter());
      }
    },
    async locateCurrent() {
      await this.zoomOut();
      await this.panToCurrentLocation();
      await this.zoomIn();
    },
    setDefaultTheme() {
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
      document.getElementById('scatterButton').style.background = '#4D6180';
      document.getElementById('heatButton').style.background = '#4D6180';
      document.getElementById('hexButton').style.background = '#4D6180';
      document.getElementById('scatterIcon').style.color = '#F1ECE3';
      document.getElementById('heatIcon').style.color = '#F1ECE3';
      document.getElementById('hexIcon').style.color = '#F1ECE3';
      document.getElementById('history').style.background = '#4D6180';
      document.getElementById('historyIcon').style.color = '#F1ECE3';
      document.getElementById('historyLabel').style.color = '#F1ECE3';
    },
    themeSwitch(theme) {
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
        document.getElementById('scatterButton').style.background = '#4D6180';
        document.getElementById('heatButton').style.background = '#4D6180';
        document.getElementById('hexButton').style.background = '#4D6180';
        document.getElementById('scatterIcon').style.color = '#F1ECE3';
        document.getElementById('heatIcon').style.color = '#F1ECE3';
        document.getElementById('hexIcon').style.color = '#F1ECE3';
        document.getElementById('history').style.background = '#4D6180';
        document.getElementById('historyIcon').style.color = '#F1ECE3';
        document.getElementById('historyLabel').style.color = '#F1ECE3';
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
        document.getElementById('scatterButton').style.background = '#F2B963';
        document.getElementById('heatButton').style.background = '#F2B963';
        document.getElementById('hexButton').style.background = '#F2B963';
        document.getElementById('scatterIcon').style.color = '#222831';
        document.getElementById('heatIcon').style.color = '#222831';
        document.getElementById('hexIcon').style.color = '#222831';
        document.getElementById('history').style.background = '#F2B963';
        document.getElementById('historyIcon').style.color = '#222831';
        document.getElementById('historyLabel').style.color = '#222831';
        this.curTheme = 'dark';
      }
    },
    convertSelect() {
      //   console.log("isSelected toggle");
      return (this.isSelected = !this.isSelected);
    },
    clearLayer() {
      this.overlay.setMap(null);
    },
    setLayerDefault() {
      //   console.log("setlayerdefault");
      return (this.layerSelected = false);
    },
    convertLayer() {
      return (this.layerSelected = !this.layerSelected);
    },
    async toggleScatter() {
      this.scatterStatus = !this.scatterStatus;
      await this.clearLayer();
      await this.renderLayer();
    },
    async toggleHeat() {
      this.heatStatus = !this.heatStatus;
      await this.clearLayer();
      await this.renderLayer();
    },
    async toggleHex() {
      this.hexStatus = !this.hexStatus;
      await this.clearLayer();
      await this.renderLayer();
    },
    toggleMapTheme(id) {
      if (id == '77019c2d28bf4b75') {
        this.currMapId = '142837500402f49f';
      } else {
        this.currMapId = '77019c2d28bf4b75';
      }
    //   console.warn(this.currMapId + ' is current MapId');
      this.initMap();
    },
    renderLayer() {
      const scatterplot = () =>
        new ScatterplotLayer({
          id: 'scatter',
          data: this.currentData.getIncidents, //this.accidentsData.getIncidents
          opacity: 0.8,
          filled: true,
          radiusMinPixels: 5,
          radiusMaxPixels: 15,
          getPosition: (d) => [d.Longitude, d.Latitude],
          getFillColor: (d) => [200, 0, 40],
          visible: this.scatterStatus,
          pickable: true,
          onHover: ({ object, x, y }) => {
            const el = document.getElementById('tooltip');
            if (object) {
              const { date, from, content, _id, Latitude, Longitude, type } =
                object;
              el.innerHTML = `
              <p style="font-weight:bold">ID : ${_id}</p>
              <p style="font-weight:bold;color:#F2B963">Type : ${type}</p>
              <div style="text-overflow:ellipsis"><p>${content}</p></div>
              <p style="font-weight:bold">Date : ${date}</p>
              <p style="font-weight:bold">Lat : ${Latitude}, Lng : ${Longitude}</p>
              <p style="font-weight:bold">Source : ${from}</p>
              `;
              el.style.display = 'block';
              el.style.opacity = 0.9;
              el.style.margin = '0 px';
              el.style.left = x + 'px';
              el.style.top = y + 'px';
            } else {
              el.style.opacity = 0.0;
              el.innerHTML = ``;
            }
          },
          onClick: ({ object, x, y }) => {
            window.open(`${object.link}`);
          },
        });
      const heatmap = () =>
        new HeatmapLayer({
          id: 'heat',
          data: this.currentData.getIncidents,
          getPosition: (d) => [d.Longitude, d.Latitude],
          getWeight: (d) => 0.5,
          radiusPixel: 60,
          visible: this.heatStatus,
        });
      const hexagon = () =>
        new HexagonLayer({
          id: 'hex',
          data: this.currentData.getIncidents,
          getPosition: (d) => [d.Longitude, d.Latitude],
          getElevationWeight: (d) => 1,
          elevationScale: 100,
          extruded: true,
          radius: 6000,
          opacity: 0.6,
          coverage: 0.88,
          lowerPercentile: 50,
          visible: this.hexStatus,
        });
      this.overlay = new GoogleMapsOverlay({
        layers: [heatmap(), scatterplot(), hexagon()],
      });
      this.overlay.setMap(this.myMap);
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
        maxZoom: 17,
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
    openDashboard() {
      // console.log('Hello From openDashboard()');
      this.$refs['dBoard'].onToggle();
    },
  },
  mounted() {
    this.initMap();
    this.setDefaultTheme();
    let input = document.getElementById('searchInput');
    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.fetchLatLng = null;
        fetch(
          'http://api.positionstack.com/v1/forward?access_key=5fc2925ba88b87feade4eaf068f4a2b4&query=' +
            e.target.value,
        )
          .then((res) => res.json())
          .then((data) => {
            this.fetchLatLng = data;
            let fetchLat = this.fetchLatLng.data[0].latitude;
            let fetchLng = this.fetchLatLng.data[0].longitude;
            let pos = {
              lat: fetchLat,
              lng: fetchLng,
            };
            this.myMap.setCenter(pos);
            this.myMap.setZoom(17);
            this.fetchLatLng = null;
          })
          .catch((err) => console.warn(err));
      }
    });
    fetch('http://178.128.89.207/api/v1/incidents/getOneDay')
      .then((res) => res.json())
      .then((data) => {
        this.oneDayData = data;
        this.currentData = data;
      })
      .catch((err) => console.warn(err));
    fetch('http://178.128.89.207/api/v1/incidents/getAllIncidents')
      .then((res) => res.json())
      .then((data) => {
        this.alltimeData = data;
      })
      .catch((err) => console.warn(err));
  },
});
</script>
