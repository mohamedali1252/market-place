<template>
  <div class="container">
 <div class="top-nav-bar"> <!-- Top Bar -->
        <div class="search-box">
            <img src="../assets/market online.png" class="logo"> <!-- Logo -->
            <input v-model="search" type="search" class="form-control"> <!-- Search Text Bar -->
            <router-link class="input-group-text" to="/search" style="text-decoration: none;"> <i class="fas fa-search"></i> </router-link> <!-- Search Icon -->
        </div>
          <div class="menu-bar">
            <ul>
                <li>
                    <router-link to="/Cart" style="color: white;"> <i class="fas fa-shopping-basket fa-lg"></i> Cart</router-link>
                </li>
                <li>
                    <router-link to="/Market" style="color: white;"> <i class="fas fa-store fa-lg"></i> Market</router-link>
                </li>
                <li class="droplist">
                    <div class="dropdown">
                        <button class="dropbtn"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="dropdown-content">
                            <router-link class="dropdown-item" to="/Account">My Account</router-link>
                            <a class="dropdown-item" href="#">Help</a>
                            <div class="dropdown-divider"></div>
                            <a @click="handleClick"  class="dropdown-item" href="javascript:void()">Logout</a>
                        </div>
                    </div>
                    
                    <!-- <a href="login.html" style="color: white;">Log out</a> -->
                </li>
            </ul>
        </div>
  </div>
  </div>
</template>
<script>
    import axios from 'axios'

export default {
  name: "AppHeader",
  props: {
    msg: String,
  },
  methods:{
      async handleClick(){
        
          localStorage.clear(); 
          await axios.get('auth/logout');
          this.$router.push('/');
      }
  }
};
</script>
<style scoped>
body
{
    font-family: sans-serif;
}

@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
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
.search-box
{
    display: inline-flex;
    width: 60%;
}
.logo
{
    height: 46px;
    margin: 5px 15px 0px;
}
@media only screen and (max-width: 997px) {
    .top-nav-bar
    {
        height: 110;
        border-bottom: 0;
        display: block;
    }
     .search-box
    {
        padding-bottom: 10px;
        width: 100%;
    }
    #menu-btn, #close-btn
{
    font-size: 30px;
    margin: 15px 0 0 15px;
    color: #33bfb4;
    display: none;
}
  #menu-btn
    {
        display: block;
    }
}
.form-control
{
    color: #06b4a6 !important;
    height: 39px; /* Found by Experiment */
    margin: 9px 0px 0px 0px !important;
    border: 1px solid #33bfb4 !important;
    border-radius: 20px 0px 0px 20px !important;
    box-shadow: none !important;
}
.input-group-text
{
    color: #fff !important;
    background-color: #33bfb4 !important;
    border: 1px solid #33bfb4 !important;
    border-radius: 0px 20px 20px 0px !important;
    margin: 9px 10px 3px 0px !important;
    padding-left: 10px !important;
    cursor: pointer;
}
 #menu-btn
    {
        display: block;
    }
    .menu-bar
{
    width: 40%;
    height: 60px;
    float: right;
}
    
.menu-bar ul
{
    display: inline-flex;
    float: right;
}

.menu-bar ul li
{
    border-left: 1px solid #fff;
    list-style-type: none;
    padding: 17px 35px;
    text-align: center;
    background-color: #33bfb4;
    color: #fff;
    cursor: pointer;
}

.menu-bar ul li a
{
    font-size: 16px;
    font-size: bold;
    text-decoration: none;
}

.fa-shopping-basket
{
    margin-right: 5px;
}

.dropbtn {
    background-color: #33bfb4;
    color: white;
    padding: 0px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-content {
    right: 3%;
    display: none;
    position: fixed;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: #33bfb4;
    padding: 5px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {background-color: #f1f1f1}
  
  .droplist:hover .dropdown .dropdown-content {
    display: block;
  }
  


@media only screen and (max-width: 997px) {
    .top-nav-bar
    {
        height: 110;
        border-bottom: 0;
        display: block;
    }
    .search-box
    {
        padding-bottom: 10px;
        width: 100%;
    }
    .menu-bar
    {
        width: 100%;
        margin-bottom: 10px;
    }
    .menu-bar ul
    {
        padding: 0;
        width: 100%;
    }
    .menu-bar ul li
    {
        padding: 17px 5px;
        height: 60px;
        width: 100%;
    }
}

</style>