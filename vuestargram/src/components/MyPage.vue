<template>
  <div>
    <div style="padding: 10px">
      <h4>팔로워</h4>
      <input placeholder="검색" @input="search($event.target.value)" />
      <div class="post-header" v-for="(a, i) in follower" :key="i">
        <div class="profile" :style="`background-image:url(${a.image})`"></div>
        <span class="profile-name">{{ a.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import axios from "axios";

export default {
  name: "MyPage",
  props : {
      one: Number,
  },
  //Composition API setup안에서 데이터생성,조작 가능/ methods,computed, watch 만들수도 있고 hook도 걸수 있다./ 거의 모든 기능 개발을 setup 한 곳에서 가능!
  setup(props) {
    let follower = ref([]); //reference data 를 만든다. 여따 뭐든 담아야함 무조건!
    let followerOriginal = ref([]);

    // let test = reactive({name : 'kim'}) -> ref 랑 똑같은 기능이다. 차이는 보통 안에 array,object를 넣는다.
    
    //검색
    function search(abc) {
        let newFollower = followerOriginal.value.filter((a) => {
            return a.name.indexOf(abc) != -1
        });
        follower.value = [...newFollower]
    }


    // props 쓸수 있다.
    let { one } = toRefs(props);
    console.log(one.value)

    

    //사용 전에 임포트 필수! 데이터는 항상 .value 써!!!
    //watch
    // watch(감시할거, ()=> {실행코드})

    //computed
    // computed(() => {return 연산결과})

    //methods
    // function hello() {

    //}
    // return {follower, hello}
    //}

    //vuex store 얘는 임포트 {userStore}
    //let store = useStore();
    //console.log(store.state.name)
    //console.log(store.commit())
    //mapState 는 없음. vuex 5버전 이상이면 될듯..?

    onMounted(() => { // on~쓰면된다.
      axios.get("/follower.json").then((a) => {
        follower.value = a.data; // value 써야지 데이터 조작 가능!
        followerOriginal.value = [...a.data];
      }).catch((err) => {
          console.log(err)
      })
    });

    return { follower, search, };
  },

  data() {
    return {};
  },
};
</script>

<style scoped> 
/* scoped 있으면 다른 vue파일로 전염이 안된다 css 막짜도됨 */
</style>
