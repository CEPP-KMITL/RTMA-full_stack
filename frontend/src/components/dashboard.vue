<template>
    <div>
        <q-btn
    label="Card"
    color="primary"
    @click="isClose = true"
    class= "text-weight-bold" />

    <q-dialog
      v-model="isClose"
      class = "flex justify-center items-center content-center"
      style = "height: 100vh">
      <q-card
      class="my-card bg-secondary"
      bordered
      >
        <q-card-section class="text-white q-py-xs q-mx-md">
          <div class="text-h4 q-mt-sm q-mb-sm">Top 5 Risk Area</div>
          <div v-if="first.length || second.length || third.length || third.length ||fourth.length|| fifth.length">
            <div v-if="first.length" class="text-base q-mx-md q-my-xs">
              อันดับที่ 1
              <span
              v-for="(item, index) in first"
              v-bind:key="index">
              {{item}}
              </span>
            </div>
            <div v-if="second.length" class="text-base q-mx-md q-my-xs">
              อันดับที่ 2
              <span
              v-for="(item, index) in second"
              v-bind:key="index">
              {{item}}
              </span>
            </div>
            <div v-if="third.length" class="text-base q-mx-md q-my-xs">
              อันดับที่ 3
              <span
              v-for="(item, index) in third"
              v-bind:key="index">
              {{item}}
              </span>
            </div>
            <div v-if="fourth.length" class="text-base q-mx-md q-my-xs">
              อันดับที่ 4
              <span
              v-for="(item, index) in fourth"
              v-bind:key="index">
              {{ item }}
              </span>
            </div>
            <div v-if="fifth.length" class="text-base q-mx-md q-my-xs">
              อันดับที่ 5
              <span
              v-for="(item, index) in fifth"
              v-bind:key="index">
              {{item}}
              </span>
            </div>
          </div>

          <div v-else >
            ไม่มีข้อมูล
          </div>
        </q-card-section>

        <q-card-actions class="bg-secondary float-right">
          <q-btn
          rounded
          class= "bg-white text-secondary text-weight-bold"
          @click="isClose = false"
          size= "md"
          label= "close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'


export default {
  name : 'dashbroad',
  data() {
    return {
      interval: 0,

    }
  },
  computed:{
    ...mapGetters({
        first: "getFirst",
        second: "getSecond",
        third: "getThird",
        fourth: "getFourth",
        fifth: "getFifth",

    })
  },
  setup () {
    return {
      isClose: ref(false)
    }
  },
   created() {
    window.clearInterval(this.interval);
    this.$store.dispatch("fetchData");
    this.interval = window.setInterval(() => {
      this.$store.dispatch("fetchData");
    }, 3000);
  },
}
</script>

<style>

</style>