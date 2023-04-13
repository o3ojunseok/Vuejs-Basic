<template>
  <!-- custom event ex)모달
- 이걸로 부모데이터 수정해야함. 데이터 수정해달라는 메세지를 보내야함. -->

  <!-- emit (부모에게 메세지 보내는법) -->
  <!-- 부모에게 메세지 보낼땐 $emit('작명, 데이터')

  부모가 메세지 수신할땐 @작명한거 = "" -->

  <!-- 카드 안의 제목을 눌러야 모달창 뜨게?
  -> 카드 컴포넌트에 써도 되지만 그러면 여기서 하고싶은 제목만 눌러서가 되지 않는다 -->

  <div>
    <div>
      <img :src="원룸.image" class="room-img" />
      <h4 @click="$emit('openModal', 원룸.id)">{{ 원룸.title }}</h4>
      <p>{{ 원룸.price }}원</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCard",
  props: {
    원룸: Object,
    모달창열렸니: Boolean,
  },
};
</script>

<style></style>
