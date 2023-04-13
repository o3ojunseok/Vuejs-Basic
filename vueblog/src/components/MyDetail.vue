<template>
<div>
<div>
    <h4>상세페이지</h4>
    <h5>{{blogWrite[$route.params.id].title}}</h5>
    <p>{{blogWrite[$route.params.id].content}}</p>
    

    <!-- 상세 상세상세 -->
    <router-view></router-view> 
</div>
</div>
</template>

<script>
export default {
    name: 'MyDetail',
    props: {
        blogWrite : Array,
    }

}
</script>

<style>

</style>