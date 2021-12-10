<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
       <router-view />
    </div>
    <AppFooter/>
  </div>
  
 
</template>
<script>
import AppFooter from  "@/components/AppFooter.vue";
export default {
  name: "App",
  components: {
    AppFooter
  },
};
</script>


