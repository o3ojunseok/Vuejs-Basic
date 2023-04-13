<template>
  <div>
    <div @click="fire" :class="a + ' filter-item'" :style="`background-image:url(${image})`">
        <!-- props 보다 훨씬 쉬운 slot 좀 더 직관적으로 데이터 전송 가능 
        1. <slot></slot> 자식은 원하는곳에 빵꾸만들기
        2. 부모는 태그사이에 데이터 넣으면됨. 여기선 필터박스가 되겠죠 
        단! 태그안에 데이터바인딩할 때만 slot이 가능하기 때문에 props를 대체할 순 없다.
        slot을 여러개를 쓰고싶다? 하면 <slot name="a"></slot> 이런식으로 이름을 설정해주면 된다.네임드 슬롯!
        그럼 부모에 <template v-slot:a></template> 이런식으로 부모에 쓴다.그래서 구멍이 여러개면 그냥 props가 낫다.. -->
        <slot></slot>
        
        <!-- mitt 전송하는법 
        1.발사하고
        2.수신하면 된다.-->
        <button @click="fire">버튼</button> 
    </div>
  </div>
</template>

<script>
export default {
    name: 'FilterBox',
    props: {
        image: String,
        a: String,
    },
    methods: {
        fire() {
            this.emitter.emit('boxClick', this.a)
            // this.emitter.emit('작명','데이터')
        }
    }

};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
