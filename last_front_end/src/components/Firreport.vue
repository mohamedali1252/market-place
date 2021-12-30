<template>
<div>
     <table class="table table-sm">
 <thead>
       <tr>
           <th>id</th>
           <th>total</th>
       </tr>
       </thead>
<tr>
           <td>{{_id}}</td>
           <td>{{total}}</td>
       </tr>
        </table>
</div>
</template>
<script>
export default {
  name: "Firreport",
     props: ["_id","total"],
};
</script>
<style scoped>
table,tr,td
        {
            border: 1px solid black;
        }
</style>

