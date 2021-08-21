<template>
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
        <span @click="
        convertSelect();
        setLayerDefault();
      ">
          <hBtn></hBtn>
        </span>
        <span style="font-family: Prompt; font-weight: 750;font-size:30px;margin-left:8px">SONAR</span>
        <span><searchBar></searchBar></span>
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
</template>

<script>
import hamburgerBtn from "./hamburgerBtn.vue";
import searchbar from "./searchBar.vue"
export default {
  components: {
    hBtn: hamburgerBtn,
    searchBar: searchbar,
  },
  data() {
    return {
      isSelected: false,
      layerSelected: false,
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
  },
};
</script>

