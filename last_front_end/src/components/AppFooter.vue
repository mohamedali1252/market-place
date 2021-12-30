<template>
<div>
<div class="b"></div>
      <section class="footer" style="bottom: 0;position: fixed; height: 60px; width: 100%; margin-top: 60px;">
        <p class="copyright" style="padding: 20px;"> Developed by Team No. 22 - 4th CSE-ASU</p>
    </section>
</div>
</template>
<script>
export default {
  name: "AppFooter",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
.b
{
    height:60px;
}
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
.footer
{
    margin-top: 60px;
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

</style>