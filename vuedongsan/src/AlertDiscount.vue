<template>
  <!-- 컴포넌트
1. App.vue 에 vue파일 import 해오고
2. components: {} 에 등록하고
3. 갖다쓰셈 -->

  <!-- 왜쓰죠?
- 심미적 이유 (깔끔하게 만들어준다)
- 축약해놓으면 재사용이 쉽다 
- 수정이 편한다
- 데이터 관리가 복잡해지니까 진짜 잘써야함
- 반복적으로 출현할 부분만 컴포넌트화를 권장한다!!!-->
  <div class="discount">
    <h4>지금 결제하면 {{amount}}% 할인</h4>
  </div>
</template>

<script>
export default {
  name: "AlertDiscount",

  props: {
    amount: Number,
  },
};
</script>

<style>
.discount {
  background: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
