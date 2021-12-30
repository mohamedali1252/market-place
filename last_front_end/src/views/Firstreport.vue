<template>
  <div>
      Generating report:
      <button class="btn btn-primary" @click="generaterep()" style=" margin-left:7rem; background-color: #33bfb4; width:15rem; border:none; padding:1rem 0rem;" type="submit">Generate report:</button>
      
  
   <Firreport v-for="co in results" :key="co.id" :_id="co._id" :total="co.total"/>
      
  </div>
</template>
<script>
// @ is an alias to /src
import Firreport from '../components/Firreport.vue';

import axios from 'axios';
export default {
  name: "Firstreport",
   data:function()
  {
return{
  results:undefined
}
  },
  components: {
     Firreport
    },
methods:{
async generaterep(){
console.log("clicked");
  this.results = await (await axios.get('/api/user/stats')).data;
  console.log(this.results);
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