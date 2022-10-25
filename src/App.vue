<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Ordering from "./Layout/Ordering";

export default {
  name: 'app',
  components: {
    Login,
    Ordering
    
  },
  mounted() {
    window.addEventListener('unload', this.saveState());
  },
  methods:{
    loginClick(){
      //通过代码修改路径 vue-router
      this.$router.push('/login')
    },
    orderingClick(){
      this.$router.push('/ordering')
    },
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }

  },

}
</script>

<style>
.active {
  /*更改样式*/
  color: #e9eef3;
}

html,body{
  height: 100%;
  margin:0;
}

body {
  background-color: rgb(121, 187, 255);

  margin: 0;
  padding: 0;
  border: 0;
  
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
