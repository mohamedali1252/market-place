<template>
<div>
 <div class="top-nav-bar" style="background-color: #33bfb4; width: 100%;"> </div>
<loginComp/>
</div>
</template>
<script>
// @ is an alias to /src
import loginComp from '../components/loginComp.vue';


export default {
  name: "login",
  components: {
    loginComp
  },
};
</script>
<style scoped>
.top-nav-bar
{
    height: 60px;
    top: 0;
    position: sticky;
    background: #fff;
    margin-bottom: 20px;
    border-bottom: 3px solid #33bfb4;
    z-index: 2;
}
@media only screen and (max-width: 997px) {
    .top-nav-bar
    {
        height: 110;
        border-bottom: 0;
        display: block;
    }
}
</style>
