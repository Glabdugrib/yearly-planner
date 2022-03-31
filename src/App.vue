<template>
   <div id="app">
      <Header />
   </div>
</template>

<script>
import Header from './components/MainHeader.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import './assets/scss/_variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&display=swap');

#app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Teko', sans-serif;
}

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
}

body {
   background-color: $main-bg;
}

.container {
   max-width: 1400px;
   margin: 0 auto;
}

img {
   display: block;
   max-width: 100%;
}

</style>
