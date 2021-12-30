<template>
  <div>
      Generating report:
      <button class="btn btn-primary" @click="generaterep2()" style=" margin-left:7rem; background-color: #33bfb4; width:15rem; border:none; padding:1rem 0rem;" type="submit">Generate report:</button>
      
  
   <Secreport v-for="co in result" :key="co.id" :title="co.title" :seller="co.seller" :buyer="co.buyer" :price="co.price"/>
      
  </div>
</template>
<script>
// @ is an alias to /src
import  Secreport from '../components/Secreport.vue';

import axios from 'axios';
export default {
  name: "Secondreport",
   data:function()
  {
return{
  result:undefined
}
  },
  components: {
     Secreport
    },
methods:{
async generaterep2(){
console.log("clicked");
  this.result = await (await axios.get('/api/user/generateTransactionReport')).data;
  console.log(this.result);
}
}
};
</script>
<style scoped>


*
{
    margin: 0;
    padding: 0;
}

/* #33bfb4 */
body
{
    font-family: sans-serif;
}

 table,tr,th,td
        {
            border: 1px solid black;
        }

/* CSS for All Top Bar */



@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.7.0/css/all.css');






</style>