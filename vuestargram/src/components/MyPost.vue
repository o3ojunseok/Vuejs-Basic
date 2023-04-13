<template>
    <div class="post">
      <div class="post-header">
        <div class="profile"></div>
        <span class="profile-name">{{ data.name }}</span>
      </div>
      <div @click="$store.commit('likeUpDown')" :class="data.filter" class="post-body" :style="{ backgroundImage : `url(${data.postImage})` }"></div> 
                                        <!-- 빽틱 기호로도 문자 표현 가능하다. 얘는 뺵틱속에 문자${변수} 문자 넣어주면 편리하다. -->
      <div class="post-content">
        <p>{{ $store.state.likes }}</p>
        <p><strong>{{ data.name }}</strong> {{ data.content }}</p>
        <p class="date">May 15</p>
      </div>
    </div>

</template>

<script>
export default {
    name: 'MyPost',
    props: {
        data: Object,
    },
};
</script>

<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://placeimg.com/640/480/animals");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
