<template>
<div>
     <table class="table table-sm">
 <thead>
       <tr>
           <th>sport</th>
           <th>clothes</th>
           <th>food</th>
           <th>home devices</th>
           <th>digital devices</th>
           <th>other</th>
       </tr>
       </thead>
<tr>
           <td>{{sport}}</td>
           <td>{{clothes}}</td>
           <td>{{food}}</td>
           <td>{{homedevices}}</td>
           <td>{{digitaldevices}}</td>
           <td>{{other}}</td>
       </tr>
        </table>
</div>
</template>
<script>
export default {
  name: "Thireport",
     props: [ "sport",
           "clothes",
           "food",
           "homedevices",
           "digitaldevices",
           "other"]
};
</script>
<style scoped>
table,tr,td
        {
            border: 1px solid black;
        }
</style>



