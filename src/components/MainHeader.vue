<template>
   <header id="header">

      <!-- Main title -->
      <div class="main-title">
         <figure class="logo-wrapper">
            <img src="../assets/img/calendar-logo.png" alt="">
         </figure>
         <h1 class="logo-title">YearlyPlanner</h1>
      </div>

      <!-- Menu -->
      <nav class="header-menu">
         <a href="#" class="header-menu-btn">
            <i class="fa-solid fa-list-check"></i>
            <span><a href="https://github.com/stars/Glabdugrib/lists/projects">Other Projects</a></span>
         </a>
         <a href="#" class="header-menu-btn">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Coming soon</span>
         </a>
      </nav>

   </header>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

#header {
   padding: 30px 0;
   display: flex;
   flex-direction: column;
   justify-content: center;

   .main-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin: 0 auto 20px auto;
      transition: letter-spacing ease-in-out 0.3s;

      &:hover {
         letter-spacing: 5px;
      }

      .logo-wrapper {
         width: 70px;
         aspect-ratio: 1;
      }

      .logo-title {
         padding-top: 12px;
         font-family: 'Teko', sans-serif; // <--
         font-size: 56px; // <--
         font-weight: 600;
         color: $text-light; // <--
      }
   }

   .header-menu {
      display: flex;
      justify-content: center;
      gap: 10px;
      font-family: 'Lato', sans-serif; // <--

      .header-menu-btn {
         padding: 5px 10px;
         display: flex;
         align-items: center;
         color: rgba(255, 255, 255, 0.75);  // <--
         background-color: $secundary-bg-light;  // <--
         border-radius: 3px;

         &:hover {
            color: white;  // <--
         }

         i {
            font-size: 18px; // <--
            margin-right: 5px;
         }

         span {
            font-size: 14px; // <--
            font-weight: 700;
            text-transform: uppercase;
         }
      }
   }
}

// Medium screens
@media screen and (max-width: 768px) {
   
   #header {

      .main-title {

         .logo-title {
            font-size: 51px; // <--
         }
      }
   }
}

// Small screens
@media screen and (max-width: 478px) {
   
   #header {

      .main-title {

         &:hover {
            letter-spacing: initial;
         }

         .logo-wrapper {
            width: 60px;
         }
      }
   }
}

</style>