<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { getMethod } from '@/config/service';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    console.log(getMethod);
  }
};
</script>
