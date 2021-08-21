import { createStore } from 'vuex'

const store = createStore({
  state: {
    first : ["จ.AAA"],
    second : ["จ.BBB"],
    third : ["จ.CCC"],
    fourth : ["จ.DDD"],
    fifth : ["จ.EEE"],
  },
  mutations: {
    setFirst(state,newData){
      state.first = newData
    },
    setSecond(state,newData){
      state.second = newData
    },
    setThird(state,newData){
      state.third = newData
    },
    setFourth(state,newData){
      state.fourth = newData
    },
    setFifth(state,newData){
      state.fifth = newData
    },

  },
  getters:{
    getFirst:state => state.first,
    getSecond:state => state.second,
    getThird:state => state.third,
    getFourth:state => state.fourth,
    getFifth:state => state.fifth
  },
  actions: {
    async fetchData(context) {
      const url = 'http://178.128.89.207/api/v1/incidents/getFive'
      try {
        const res = await fetch(url)
        const data = await res.json()

        if (res.ok) {

          context.commit('setFirst',data.getIncidents.st1)
          context.commit('setSecond',data.getIncidents.nd2)
          context.commit('setThird',data.getIncidents.rd3)
          context.commit('setFourth',data.getIncidents.th4)
          context.commit('setFifth',data.getIncidents.th5)

        }
        else {
          throw new Error(res)
        }
      } catch (err) {
          console.log(err)
      }
  },
  },
  modules: {
  }
})

export default store