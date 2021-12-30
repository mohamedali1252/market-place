<template>
<div>
     <table class="table table-sm">
 <thead>
       <tr>
           <th>title</th>
           <th>seller</th>
           <th>buyer</th>
           <th>price</th>
       </tr>
       </thead>
<tr>
           <td>{{title}}</td>
           <td>{{seller}}</td>
           <td>{{buyer}}</td>
           <td>{{price}}</td>
       </tr>
        </table>
</div>
</template>
<script>
export default {
  name: "Secreport",
     props: ["title","seller","buyer","price"],
};
</script>
<style scoped>
table,tr,td
        {
            border: 1px solid black;
        }
</style>

