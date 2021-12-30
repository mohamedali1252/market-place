<template>
  <div class="home">
    <AppHeader/>
    <section class="header">
      <sidemenu/>
      <slider/>
    </section>
      <RecProducts/>
       <section class="on-sale">
        <div class="container">
            <div class="title-box">
                <h2>On-Sale</h2>
            </div>
            <div class="row">
            <HomeProd v-for="co in orders" :key="co.id" :id="co._id" :img="co.img" :price="co.price" :title="co.title"/>
            </div>
        </div>
       </section>
  </div>
</template>

// @ is an alias to /src

<script>
import AppHeader from  "@/components/AppHeader.vue";
import sidemenu from  "@/components/sidemenu.vue";

import Slider from '../components/slider.vue';
import RecProducts from '../components/RecProducts.vue';
import HomeProd from '../components/HomeProd.vue';

// @ is an alias to /src
import axios from 'axios'

//import carts from '../Api/carts.json';

export default {
  name: "Home",
   data:function()
  {
return{
  orders:undefined
}
  },
  components: {
    AppHeader,
    sidemenu,
    Slider,
    RecProducts,
    HomeProd,  
    },

async beforeMount(){

  this.orders = await (await axios.get('/api/products/findAllProducts')).data;
  console.log(this.orders);

}
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
.title-box
{
    background-color: #33bfb4;
    color: #fff;
    width: 180px;
    padding: 4px 10px;
    height: 40px;
    margin-bottom: 30px;
    display: flex;
}

.title-box h2
{
    font-size: 24px;
}

.title-box::after
{
    content: '';
    border-top: 40px solid #33bfb4;
    border-right: 50px solid transparent;
    position: absolute;
    display: flex;
    margin-top: -4px;
    margin-left: 170px;
}
</style>
