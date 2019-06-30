<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { TypeGet, Get } from '../utils/service';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Get
  private get!: TypeGet;

  constructor() {
    super();
    console.log(this.get);
  }
}
</script>
