<template>
  <div
    style="
      position: relative;
      z-index: 1;
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
import dropDownBtn from "./dropDownBtn.vue";
import hamburgerBtn from "./hamburgerBtn.vue";
export default {
  name: "component2",
  components: {
    dBtn: dropDownBtn,
    hBtn: hamburgerBtn,
  },
  data() {
    return {
      isSelected: false,
      layerSelected: false,
    };
  },
  methods: {
    convertSelect() {
      console.log("isSelected toggle");
      return (this.isSelected = !this.isSelected);
    },
    setLayerDefault() {
      console.log("setlayerdefault");
      return (this.layerSelected = false);
    },
    convertLayer() {
      console.log("layer toggle");
      return (this.layerSelected = !this.layerSelected);
    },
  },
};
</script>

<style>
.myButton {
  display: none;
}
.myButton:hover {
  cursor: pointer;
}

.myButton.selected {
  -webkit-border-radius: 8;
  -moz-border-radius: 8;
  border-radius: 8px;
  font-family: Arial;
  color: #222831;
  font-size: 20px;
  background: #f2b963;
  margin-top: 16px;
  width: 180px;
  height: 48px;
  text-align: start center;
  padding: 0;
  border: solid #707070 1px;
  text-decoration: none;
  display: inline-flex;
  animation: fadeIn 600ms;
  align-items: center;
}
.layerButton {
  display: none;
}
.layerButton:hover {
  cursor: pointer;
}
.layerButton.selected {
  -webkit-border-radius: 8;
  -moz-border-radius: 8;
  border-radius: 8px;
  font-family: Arial;
  color: #222831;
  font-size: 20px;
  background: #f2b963;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  text-align: start center;
  padding: 0;
  border: solid #707070 1px;
  text-decoration: none;
  display: inline-flex;
  animation: fadeIn 600ms;
  align-items: center;
}

.myMenu {
  -webkit-border-radius: 8;
  -moz-border-radius: 8;
  border-radius: 8px;
  font-family: Arial;
  color: #222831 /*#F1ECE3 */;
  font-size: 20px;
  background: transparent;
  margin-top: 16px;
  width: 180px;
  height: 48px;
  text-align: start center;
  padding: 0;
  border: transparent 1px;
  text-decoration: none;
  display: inline-flex;
  animation: fadeIn 600ms;
  align-items: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
