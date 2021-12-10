<template>
                <div class="col-md-3">
                    <div class="a"></div>
                    <div class="product-top">
                        <img v-bind:src=img>
                        <h3>{{title}}</h3>
                        <h5>{{price}} L.E</h5>
                        <button v-on:click="addCart()" type="button" class="btn btn-secondary">
                            <i class="fa fa-shopping-cart"></i> Add to Cart
                        </button>
                            <button v-on:click="addMarket()" type="button" class="btn btn-secondary">
                            <i class="fas fa-store fa-md"></i> Add to Market
                        </button>
                    </div>
                </div>
</template>
<script>
import axios from 'axios'

export default {

  name: "HomeProd",
  props: ["img","title","price","id"],

 methods:{
        async addCart()
        {
        const userid = localStorage.getItem('id');
        console.log(this.id)

        const product = {
             productId:this.id, 
             quantity:1
        }

        const data = {
             products: product
        }

        const  res =  await axios.put('api/cart/'+userid,data);
        console.log(userid)
        console.log(res);
        },
         async addMarket()
        {
        const userid = localStorage.getItem('id');
         console.log(this.id)

        const productId=this.id;

        const  res =  await axios.put('api/market/'+userid+"/"+productId);
        console.log(userid)
         console.log(res);
        }
      
    }
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
.a
{
    height:60px;
}
.product-top img
{
    width: 100%;
}

.col-md-3{
    display: inline-block;
    padding: 0 20px;
}

.product-top{

    padding: 5%;
    text-align: center;
}

.product-top h3
{
    font-size: 25px;
    font-weight: bold;
}

.product-top h5
{
    font-size: 20px;
    padding-bottom: 10px;
}

.btn-secondary{
    cursor: pointer;
    color: white;
}

.product-top:hover .btn-secondary{
    display: inline-block;
}

@media only screen and (max-width: 997px)
{
    .product-bottom
    {
        margin-top: 65%;
    }

    .product-bottom h3
    {
        font-size: 30px;
    }

    .product-bottom h5
    {
        font-size: 20px;
        padding-bottom: 10px;
    }
}
</style>