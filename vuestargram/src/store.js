import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      //데이터 보관 장소 state
        name: 'kim',
        age: 20,
        likes : 0,
        likeClick : false,
        more: {},
    }
  },

  //데이터 수정 
  mutations: {
      setMore(state, data) {
            state.more = data;
      },

      nameChange(state) {
          state.name = 'park'
      },

      ageUp(state, payload) {
          state.age++;
          state.age += payload;
      },

      likeUpDown(state){
          if(state.likeClick === false){
              state.likes++;
              state.likeClick = true;
          } else {
              state.likes--;
              state.likeClick = false;
          }
      }
  },

  // ajax하는곳 입니다. 또는 오래걸리는 작업들
  actions: {
    getData() {
        axios
        .get(`https://codingapple1.github.io/vue/more0.json`)
        .then((a) => {
            this.commit('setMore', a.data)
            console.log(a.data)
        })
    },
  },

  
})

export default store