<template>
  <div>
    <div>
      <div v-if="step == 0">
        <MyPost :data="a" v-for="(a, i) in data" :key="i" />
      </div>
      <!-- 앞에 a는 작명이므로 data="data[i]" 와 같다 -->

      <!-- 필터선택페이지 -->
      <div v-if="step == 1">
        <div
          :class="selectFilter"
          class="upload-image"
          :style="`background-image:url(${image})`"
        ></div>
        <!-- 빽틱 - 문자중간에 변수를 넣고 싶을때 사용 그리고 ${변수} 하면된다.  -->
        <div class="filters">
          <FilterBox :a="a" :image="image" v-for="a in filters" :key="a">
            <!-- {{필터}} --> {{a}}
          </FilterBox>
        </div>
      </div>

      <!-- 글작성페이지 -->
      <div v-if="step == 2">
        <div
          :class="selectFilter"   
          class="upload-image"
          :style="`background-image:url(${image})`"
        ></div>
        <div class="write">
          <textarea
            class="write-box"
            @input="$emit('writePost', $event.target.value)"
            >write!</textarea>
          <!-- @input=$emit('write', $event.target.value) -->
        </div>
      </div>


      <!-- 마이페이지 -->
      <div v-if="step == 3">
        <MyPage :one="1"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyPost from "./MyPost.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from "./MyPage.vue"

export default {
  name: "MyContainer",
  data() {
    return {
      filters: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      selectFilter : '',
    };
  },

  mounted() {
    this.emitter.on('boxClick', (b)=>{
      this.selectFilter = b;
    })
  },

  components: {
    MyPost,
    FilterBox,
    MyPage,
  },
  props: {
    data: Array,
    step: Number,
    image: String,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
