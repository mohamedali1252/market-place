<template>
       <div class="slider">
            <div id="slider" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="../assets/images/img4.png" class="d-block w-100" height="500px">
                  </div>
                  <div class="carousel-item">
                    <img src="../assets/images/img5.jpg" class="d-block w-100" height="500px">
                  </div>
                  <div class="carousel-item">
                    <img src="../assets/images/img1.jpg" class="d-block w-100" height="500px">
                  </div>
                </div>
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
            </div>
        
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
.slider
{
    width: 85%;
    /* height: -100px; */
    margin-left: 15%;
    padding: 0 10px;
}
 
.carousel
{
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.5);
}

@media only screen and (max-width: 997px)
{
    .slider
    {
        width: 100%;
        margin-left: 0;
    }

}
</style>