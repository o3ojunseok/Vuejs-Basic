<template>
  <!-- props!! 부모컴포넌트에서 자식컴포넌트한테 데이터 보낸다. 즉, 부모데이터를 자식이 쓰고 싶을때 쓰는게 props!
1. 데이터 보내고
2. 등록하고
3. 갖다쓴다 -->

  <!-- props 보낼때 다양한 자료형도 입력이 가능하다  // :작명="Array,Object" // 간단한 문자,숫자는 브이바인딩없이도 입력 가능 숫자 바로 보낼거면 : 붙여야한다 안붙이면 문자로 판단-->

  <!-- 주의!!
props 는 read-only이다. 받아온거 수정하면 안된다. 재할당 안됨! 여기서는 모달창 열렸니가 해당된다.-->

  <!-- 애초에 여기에 데이터 만들면 되잖음?
-> 되긴하는데 부모도 쓰는 데이터라면 애초에 부모컴포넌트에 만들어 두자!!!!!!! -->
  <div class="black-bg" v-if="모달창열렸니 === true">
    <div class="white-bg">
      <h4>{{ 원룸들[누른거].title }}</h4>
      <p><img :src="원룸들[누른거].image" style="width: 100%" /></p>
      <p>{{ 원룸들[누른거].content }}</p>
      <input v-model="month">
      <!-- @input="month = $event.target.value"  -> v-model = 데이터이름 select(+ option 태그),textarea 등등 사용가능. 
      v-model.number >> 숫자로 바뀜 근데 문자로 입력하는건 막을수가 없다. 참고-->
      <p>  {{ month }}개월 선택함 : {{ 원룸들[누른거].price * month }}</p>
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HiModal",
  data() {
    return {
      month : 1,
      // 초기값 설정 중요함 잘 신경써서 할것
    };
  },
  watch : {
    // watcher 데이터를 감시하는 함수 함수식으로 개발하면된다. watch : {감시할데이터(){} }
    month(a) {
      if (isNaN(a) == true) {
        alert('문자 입력 ㄴㄴ');
        this.month = 1;
      }
      if (a >= 13) {
        alert('장난ㄴ')
      } 
    },
  },
  beforeUpdate() {
    if(this.month == 2) {
      this.month = 3;
      alert('2개월 안팜')
    }
  },

  props: {
    원룸들: Object, // Array, String, Number,Boolean ...데이터 형식
    누른거: Number,
    모달창열렸니: Boolean,
  },
  
};
</script>
<style></style>
