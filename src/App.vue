<template>
   <div id="app">

      <Header />

      <Main />

      <EventEditor />

      <Footer />

      <!-- Da far apparire solo in modalità desktop (non mobile) -->
      <a href="#header" class="scroll-up-btn"> 
         <i class="fa-solid fa-arrow-up"></i>
      </a>
   </div>
</template>

<script>
import Header from './components/MainHeader.vue';
import Main from './components/MainContent.vue';
import EventEditor from './components/EventEditor.vue';
import Footer from './components/MainFooter.vue';

// Import DayJs
import dayjs from 'dayjs';
var localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);
dayjs().localeData();
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
dayjs().isToday();

// IT version
// require('dayjs/locale/it'); // aggiungere anche today basato sul locale time
// dayjs.locale('it');

export default {
   name: 'App',
   components: {
      Header,
      Main,
      EventEditor,
      Footer
   }
}
</script>

<style lang="scss">
@import './assets/scss/_variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
}

html {
   scroll-behavior: smooth;
   // aggiungere funzionalità per altri browser
   user-select: none;
   
   &::-webkit-scrollbar {
      display: none;
   }
}

body {
   background-color: $main-bg;
   cursor: default;
   position: relative;
   padding: 0 2.5vw;
}

.container {
   max-width: 1400px;
   margin: 0 auto;
}

img {
   display: block;
   max-width: 100%;
}

ul, ol {
   list-style: none;
}

a {
   color: currentColor;
   text-decoration: none;
}

button {
   border: none;
   background-color: transparent;
   cursor: pointer;
}

.scroll-up-btn {
   position: fixed;
   bottom: 15px;
   right: 15px;
   width: 50px;
   aspect-ratio: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 5px;
   font-size: 20px; // <--
   color: white;  // <--
   background-color: rgba($color: black, $alpha: 0.3);  // <--
   opacity: 0.5;

   &:hover {
      opacity: 1;
   }
}

// TO DO
   // colors
   // fonts
   // em/rem fotn size
   // check user locale date
   // aggiungere funzionalità per altri browser
   // scorrimento automatico orizzonatale nome evento quando in hover
   // linee colorate sul planner
   // decidere quante linee sono visibili
   // aggiungere date inizio/fine evento sulla legenda
   // aggiungere limite di caratteri al nome evento
   // spostare legenda in basso in versione mobile

</style>
