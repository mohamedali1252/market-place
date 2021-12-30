<template>
     <section class="featured-categories">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="../assets/images/buy-1.jpg" alt="Product">
                </div>
                <div class="col-md-4">
                    <img src="../assets/images/buy-2.jpg" alt="Product">
                </div>
                <div class="col-md-4">
                    <img src="../assets/images/buy-3.jpg" alt="Product">
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  name: "RecProducts",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
.featured-categories
{
    margin: 50px 0;
}

.featured-categories img
{
    width: 100%;
    padding: 20px 0;
    transition: 1s;
    cursor: pointer;
}

.featured-categories img:hover
{
    transform: scale(1.1);
}
</style>