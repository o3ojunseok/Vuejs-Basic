<template>
  <div>
    <div class="menu">
      <a v-for="a in 메뉴들" :key="a">{{ a }}</a>
    </div>
    <div class="start" :class="{ end : 모달창열렸니 }"> 
      <!-- html속성에 데이터바인딩하려면 :속성 = 데이터이름 
      오브젝트로 넣으면 end라는 클래스를 집어넣지만 오른쪽 true 일때만 class 명을 조건부로 넣을때 사용한다.!!-->

      <!-- <transition name="작명">안에 넣을거</transition> -> vue에서 제공하는 애니메이션 -> css에 .작명 작명-enter-from,active,to {} 세개 클래스명이 필요하다.
      각 클래스에 from 시작에서 to 끝날시 스타일 순서대로 opacity : 0; // 끝에 opacity: 1; // active 는 transition: all 1s 하면 애니메이션 적용된다. 뇌가없어도 된다.
      퇴장 애니메이션은 enter를 leave로 그리고 opacity 도 1 에서 0 으로 하면 퇴장도 끝!-->
    <Modal
      @closeModal="모달창열렸니 = false"
      :원룸들="원룸들"
      :누른거="누른거"
      :모달창열렸니="모달창열렸니"
    />
    </div>
    <Discount v-if="showDiscount === true" :amount="amount"/>

    <!-- 컴포넌트는 웹페이지에 표기되기까지 일련의 step을 가진다 lifecycle
    create 단게 -> mount 단계 (html장착단계) -> 컴포넌트 생성 -> update 단계(data변하면 컴포넌트 재렌더링) -> unmount 단계 (컴포넌트 삭제) -->

    <!-- lifecycle hook 뭐하기전에 실행해주셈  -->
    <!-- 여기서 보면 discount 컴포넌트를 어떻게 띄울지 말지 핸들링할 수 있음 -->
    <!-- 서버에서 데이터 가져올때도 lifecycle hook 안에 코드 짠다 -->

    <button @click="priceSort">가격순 정렬</button>
    <button @click="priceBackSort">가격 역순 정렬</button>
    <button @click="nameSort">이름 정렬</button>
    <button @click="nameBackSort">이름 역순 정렬</button>
    <button @click="sortBack">되돌리기</button>
    <Card @openModal="모달창열렸니 = true; 누른거 = $event;"
      :원룸="원룸들[i]" v-for="(원룸, i) in 원룸들" :key="i"/>

    <!-- $event -> 자식이 보낸 데이터는 이 변수에 담겨있다. -->

    <!-- @~ 자식이 openModal 이름이 메세지 보내면 자바스크립트 실행해주세요~ -->

    <!-- <Card :원룸="원룸들[1]" />
    <Card :원룸="원룸들[2]" />
    <Card :원룸="원룸들[3]" />
    <Card :원룸="원룸들[4]" />
    <Card :원룸="원룸들[5]" /> -->
    <!-- 
    <div v-for="(r, i) in 원룸들" :key="i">
      <img :src="원룸들[i].image" class="room-img" />
      <h4
        @click="
          모달창열렸니 = true;
          누른거 = i;
        "
      >
        {{ 원룸들[i].title }}
      </h4>
      <p>{{ 원룸들[i].price }}</p>
    </div> -->
  </div>

  <!-- <div v-for="pro in products" :key="pro">
      <h4>{{ pro }}</h4>
      <p>45 만원</p>
    </div> -->
  <!-- <div v-for="(pro,i) in 3" :key="i">
      <h4>{{ products[i] }}</h4>
      <p>45 만원</p>
    </div> -->
</template>

<script>
import data from "./oneroom";
import AlertDiscount from "./AlertDiscount.vue";
import HiModal from "./HiModal.vue";
import MyCard from "./MyCard.vue";


export default {
  name: "App",
  data() {
    return {
      amount: 30,
      showDiscount : true,
      원룸들오리지널: [...data], // [...~] 사본을 만드는거임
      오브젝트: { name: "kim", age: 20 },
      누른거: 0,
      원룸들: data,
      모달창열렸니: false,
      신고수: [0, 1, 2, 3, 4, 5],
      메뉴들: ["Home", "Shop", "About"],
      products: ["역삼동원룸", "천호동원룸", "마포구원룸"],
    };
  },
  methods: {
    //함수 만드는 공간
    // 함수 안에서는 this. 써야한다

    increase() {
      this.신고수 += 1;
    },

    sortBack() {
      this.원룸들 = [...this.원룸들오리지널];
    },
    //점 3개 ... 문법
    // 등호를 사용해 복사가 가능하지만, array / object 자료를 등호로 복사 ㄴㄴ
    // 값 공유가 일어나지 않게 독립적인 array 복사본을 만들고 싶으면 ... 문법 사용해라

    priceBackSort() {
      this.원룸들.sort(function(a, b) {
        return b.price - a.price
      })
    },

    nameSort() {
      this.원룸들.sort(function(a, b){
        return a.title < b.title ? -1 : a.title < b ? 1 : 0;
      })
    },

    nameBackSort() {
      this.원룸들.sort(function(a, b){ 
        return a.title > b.title ? -1 : a.title < b ? 1 : 0;
      })
    },

    priceSort() {
      this.원룸들.sort(function(a, b) {
        return a.price - b.price
      })
      },

  },

  mounted() {
   let timmer = setInterval(() => {
      this.amount--;
    
    if(this.amount == 0){
      clearInterval(timmer);
      }
    }, 1000);


  

  //  setTimeout(() => {
  //    this.showDiscount = false;
  //  }, this.amount*1000);
  },


  components: {
    Discount: AlertDiscount, // 좌우 이름 동일시 하나만 가능
    Modal: HiModal,
    Card: MyCard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.start {
  opacity: 0;
  transition: all 1s;
}

.end {
  opacity: 1;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>

