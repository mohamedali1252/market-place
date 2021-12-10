<template>
<div>
 <div class="top-nav-bar" style="background-color: #33bfb4; position: fixed; width: 100%; text-align: center;">
        <p style="color: #fff; font-size: 30px; padding: 6px; margin-bottom:60px">Search Results for ""</p>
    </div> 
            <HomeProd v-for="co in orders" :key="co.id" :img="co.img" :price="co.price" :title="co.title"/>
    </div>
</template>


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
.footer
{
    margin-top: 50px;
    background: #121212;
    color: #fff;
}

.footer h1
{
    font-size: 15px;
    margin: 25px 0;
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
 
.footer hr
{
    margin-top: 10px;
    background-color: #ccc;    
}

