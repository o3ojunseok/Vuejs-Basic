<template>
<div>
  <div v-for="(blog, i) in blogWrite" :key="i">
      <h5 v-on:click="$router.push('/detail/'+i)">{{ blog.title }}</h5>
      <p>{{ blog.date }}</p>
  </div>
  <!-- <div>
      <h5 @click="$router.push('/detail/1')">{{blogWrite[1].title}} 제목</h5>
      <p>{{blogWrite[1].date}} 날짜</p>
  </div>
  <div>
      <h5 @click="$router.push('/detail/2')">{{blogWrite[2].title}} 제목</h5>
      <p>{{blogWrite[2].date}} 날짜</p>
  </div> -->
</div>
<!-- route 현재 url의 관련된 변수 현재 경로
router 페이지 이동이나 라우터 자체  -->
</template>

<script>
export default {
    name: 'MyList',
    props: {
        blogWrite : Array,
    }

}
</script>

<style>

</style>