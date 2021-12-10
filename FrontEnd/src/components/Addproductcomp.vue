<template>
<div>
    <div class="top-nav-bar" style="background-color: #33bfb4; width: 100%; text-align: center;"> <!-- Top Bar -->
        <p style="color: #fff; font-size: 30px; padding: 6px;">Add New Product</p>
    </div> 
    <div class="account">
        <div class="container">
            <div class="row">
                <div class="col-4" style="color: #33bfb4; margin-top: 0px;">
                    <h3>Upload Photo</h3>
                    <row>
                        <img src="../assets/ecommerce-default-product.png" class="img-fluid rounded mx-auto d-block">
                    </row>
                    <row>
                        <form class="md-form md-outline" >
                            <div>
                                <input type="text"  v-model="img_link" class="form-control-1" placeholder="img link">
                            </div>
                        </form>
                    </row>
                </div>
                <div class="col-8" style="color: #33bfb4; margin-top: 0px;">
                    <h3>Enter The Product data</h3>
                    <div class="row">
                        <label for="Product_Name">Product Name</label>
                        <input type="text" class="form-control" placeholder="eg. Watch" required v-model="product_name">
                    </div>
                    <div class="row">
                        <label for="Description">Description</label>
                        <input type="text" class="form-control" v-model="description">
                    </div>
                    <div class="row">
                        <label for="Product_Price">Price</label>
                        <input type="number" min="0" class="form-control" placeholder="eg. 50 LE" required v-model="product_price">
                    </div>
                    <div class="row">
                        <label for="number">No. of Products</label>
                        <input type="number" value="1" min="1" class="form-control" required v-model="No_of_products">
                    </div>
                    <div class="row">
                        <label for="number">Categories:</label>
                        <select name="cars" id="categories" class="form-control" v-model="selected">
                           <option value="volvo">Sport</option>
                           <option value="saab">Clothes</option>
                           <option value="opel">Food</option>
                           <option value="audi">Home Devices</option>
                           <option value="audi">Digital Devices</option>
                           <option value="audi">Other</option>
                       </select>
                    </div>
                    <div class="row" style="margin-bottom: 70px;">
                        <button v-on:click="ProductSubmit()" type="button" class="btn">Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Addproductcomp",
    data: () => ({
            img_link: '',
            product_name:'',
            description: '',
            product_price: '',
            No_of_products:'',
            selected:''
    }),
  props: {
    msg: String,
  },
  methods:{
   async ProductSubmit()
            {
                const product = {
                    title:this.product_name,
                    desc: this.description,
                     img: this.img_link,
                      categories:this.selected,
                     price: this.product_price,
                      sellerId:localStorage.getItem('id'),
                      quantity:this.No_of_products,
                }
                
                const respone = await axios.post('/api/products/',product);

                this.$router.push('/');      


                console.log(respone);

            }
  },
};
</script>


<style scoped>
/* ------------------------------ add new product ---------------------------- */
.form-control-1
{
     color: #06b4a6;
    margin: 10px 11px;
    border-radius: 0;
    width:100%;
    height:40px;
    border:2px black solid;
}
form .btn 
{
    padding: 10px 0;
    margin-top: 10px;
    height: 45px;
    border-radius: 5px;
    border: none;
    background-color: #33bfb4;
    width: 100%;
}

form .btn:hover
{
    background-color: #06b4a6;
}

form input
{
    text-align: center;
    border: none;
}

.form-control
{
    color: #06b4a6;
    margin: 10px 11px;
    border-radius: 0;
}

button:not(:disabled)
{
    color: #fff;
    background-color: #33bfb4;
    border: none;
    height: 50px;
    width: 100%;
    margin: 15px 11px;
    padding: 0;
}

button:not(:disabled):hover
{
    color: #fff;
    background-color: #06b4a6;
}

/* ======================== footer CSS =========================== */
.footer
{
    margin-top: 50px;
    background: #121212;
    color: #fff;
}

.footer p
{
    font-size: 12;
    color: #ccc;
}

.copyright
{
    margin-bottom: -80px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 20px;
}
 @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.7.0/css/all.css');
</style>