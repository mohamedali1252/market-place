<template>
     <div class="side-menu" id="side-menu">
            <ul>
                <li><router-link to="/search">Sport</router-link><i class="fa fa-angle-right"></i>
                 
                </li>
                <li><router-link to="/search"> Clothes</router-link><i class="fa fa-angle-right"></i>
                
                </li>
                <li><router-link to="/search">Food</router-link><i class="fa fa-angle-right"></i>
                  
                </li>
                <li><router-link to="/search">Home Devices</router-link><i class="fa fa-angle-right"></i>
                
                </li>
                <li><router-link to="/search">Digital Device</router-link><i class="fa fa-angle-right"></i>
                  
                </li>
                <li><router-link to="/search">Others</router-link><i class="fa fa-angle-right"></i>
                 
                </li>
            </ul>
        </div>
       
</template>
<script>
export default {
  name: "sidemenu",
  props: {
    msg: String,
  },
};
</script>
<style scoped>



@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
.side-menu
{
    height: 500px;
    width: 15%;
    font-size: 14px;
    float: left;
    z-index: 2;
    background-color: #ddd;
}

.side-menu ul
{
    margin-left: 10px;
}

.side-menu ul li
{
    list-style-type: none;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
}
.side-menu ul li a
{
 color:black;
 text-decoration: none;
}
.side-menu ul li a:hover
{
     color: #33bfb4;
}



.side-menu ul li ul
{
    display: none;
    z-index: 4;
    top: 77px;
}



.fa-angle-right
{
    margin: 4px 8px 0 0;
    float: right;
}

#menu-btn, #close-btn
{
    font-size: 30px;
    margin: 15px 0 0 15px;
    color: #33bfb4;
    display: none;
}

@media only screen and (max-width: 997px)
{
    .side-menu
    {
        width: 34%;
        z-index: 20;
        top: 133px;
        position: fixed;
        font-size: 14px;
        font-size: bold;
        display: none;
    }

    .side-menu ul li ul
    {
        top: 133px;
    }

   
    #menu-btn
    {
        display: block;
    }
}

</style>