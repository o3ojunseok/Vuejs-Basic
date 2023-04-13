<template>
  <div>
    <div class="header">
      <ul class="header-button-left">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li v-if="step == 1" @click="step++">Next</li>
        <li v-if="step == 2" @click="publish()">작성하기</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>

    <!-- vuex store -->
    <h4>안녕 {{ $store.state.name }}</h4> 
    <!-- <button @click="$store.state.name = '박'"></button> -->
    <!-- store.js 에 있는 state 변경은 컴포넌트 안에서 직접 수정하기 금지!!!!!!!!!!!!!!!!!!!!!!!!!! 
    state 수정하고 싶으면?
    1. 미리 store.js에 수정방법을 정의 해둔다.
    2. 그 방법을 컴포넌트에서 소환해서 수정해야한다.store.js에 부탁한다.
     -->

    <!-- store.js에게 변경해달라고 부탁할거임 -->
    <button @click="$store.commit('nameChange')">버튼버튼</button>

    <!-- mutation 부탁 -->
    <p>{{ $store.state.age }}</p>
    <button @click="$store.commit('ageUp', 10)">나이 + 1</button> 

    <!-- actions 부탁 -->
    <p>{{ $store.state.more }}</p>
    <button @click="$store.dispatch('getData')">더보기</button>

    <p>{{ name }}</p>
    <MyContainer @writePost="writePost = $event" :image="image" :data="data" :step="step"  />


    <!-- 첨부파일 사진 업로드  -->
    <!-- 이미지 업로드한걸 HTML에 보여주려면?
    1. FileReader() 파일을 글자로 변환해줌
    2. URL.createObjectURL() 이미지의 가상 URL을 생성해줌 -->

    <!-- input 다루기
    이미지 여러개 선택 - multiple 
    제한 두기 - ex) 이미지만 선택할 수 있게 - > accept ="image/*" 이건 근본적 해결책은 아니다..이거는 type을 분석해서 걸러내야함. (자바스크립트에서 확장자 확인 가능)-->
    <div class="footer">
      <ul class="footer-button-plus">
        <input @change="upload" type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
    <!-- 동적 UI 만드는법
  1.UI 현재 상태를 데이터로 만들기
  2.상태에 따라 HTML이 어떻게 보일지  -->
    <!-- 
    <div v-if="step === 0">내용0</div>
    <div v-if="step === 1">내용1</div>
    <div v-if="step === 2">내용2</div>
    <button @click="step = 0">버튼0</button>
    <button @click="step = 1">버튼1</button>
    <button @click="step = 2">버튼2</button>
    <div style="margin-top : 500px;"></div> -->
  </div>
</template>

<script>
import MyContainer from "./components/MyContainer.vue";
import data from "./assets/data.js";
import axios from "axios";
import {mapMutations, mapState} from 'vuex'

export default {
  name: "App",
  components: {
    MyContainer,
  },
  data() {
    return {
      data: data,
      // plus: 0,
      step: 3, // 페이지
      image: '',
      writePost: '',
      filter: '',

    };
  },

  mounted() {    
    this.emitter.on('boxClick',(a)=> { // 차라리 vuex 쓰는게 편하다..ㅎ
      this.filter = a;
      console.log(a)
    });
    // this.emitter.on('작명', ()=>{})
  },
  methods: {
    ...mapMutations(['setMore','좋아요']),

    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.plus}.json`)
        .then((result) => {
          this.data.push(result.data);
          this.plus++;
        });
    },
    //axios.post('url', {name:'kim'}).then().catch() catch는 요청 실패 했을때 실행된다. 캐치도 콜백함수 안에 넣고 파라미터 err 추가하면 안내문띄워준다.

    upload(e) {
      let a = e.target.files;
      console.log(a); // 업로드 후엔 다음페이지로 보내야 함. + 업로드한 이미지 띄우기
      let url = URL.createObjectURL(a[0]); // 이미지 URL 생성
      console.log(url); // 0과 1로 이루어진 binary 데이터 -> BLOB 이라는 object에 담아서 다룬다.
      this.image = url;
      this.step = 1; // this.step++;
    },

    publish() {
      let myPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.image,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.writePost,
        filter: this.filter,
      };
      this.data.unshift(myPost);
      this.step = 0;
    },

    // 함수 만들때 vs methods 
  // 같은 기능을 하지만 methods 는 함수를 쓸때마다 실행된다. 근데 computed 안의 함수는 사용해도 실행되지 않는다. 첫 로드 됐을때만 읽고 지나간다.그리고 그 값을 간직한다.
  // 계산결과 저장용 함수들임 자원절약 
  // 함수 갖다쓸때 () 안쓴다.
  // return 을 함수에 꼭 넣어줘야한다.
  computed: {
    name() {
        return this.$store.state.name
    },
    // age() {
    //     return this.$store.state.age

    // }
    ...mapState(['name', 'age', 'likes']), // 이름 겹치지 않게 주의!!
    ...mapState({ kikiki : 'name',})
  }
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
