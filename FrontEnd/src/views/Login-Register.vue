<template>
    <div>
        <loginComp/>
    </div>
</template>
<script>
// @ is an alias to /src
import loginComp from '../components/loginComp.vue';


export default {
  name: "Login-Register",
  components: {
    loginComp,
  },
};
</script>