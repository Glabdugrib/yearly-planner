<template>
   <header id="header">
      <div class="main-title">
         <figure class="logo-wrapper">
            <img src="../assets/img/akita-logo.png" alt="" class="logo">
         </figure>
         <h1 class="logo-title">YearlyPlanner</h1>
      </div>
      <div class="header-menu">
         <a href="#" class="header-menu-btn">
            <i class="fa-solid fa-list-check"></i>
            <span>Other Projects</span>
         </a>
         <a href="#" class="header-menu-btn">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Login</span>
         </a>
      </div>
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
   // border: 1px solid red;

   .main-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      // padding: 0 50px;
      margin: 0 auto 20px auto;
      transition: letter-spacing ease-in-out 0.3s;
      // border: 1px solid red;

      &:hover {
         letter-spacing: 5px; //rimuovere l'effetto nel mobile
      }

      .logo-wrapper {
         width: 70px;
         aspect-ratio: 1;

         .logo {
            // 
         }
      }

      .logo-title {
         font-family: 'Teko', sans-serif;
         font-size: 56px;
         font-weight: 600;
         color: $text-light;
         padding-top: 12px;
      }
   }

   .header-menu {
      display: flex;
      justify-content: center;
      gap: 10px;
      font-family: 'Lato', sans-serif;
      // border: 1px solid red;

      .header-menu-btn {
         padding: 5px 10px;
         display: flex;
         align-items: center;
         color: rgba(255, 255, 255, 0.75);
         background-color: $secundary-bg-light;
         border-radius: 3px;

         &:hover {
            color: white;
         }

         i {
            font-size: 18px;
            margin-right: 5px;
         }

         span {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
         }
      }
   }
}

// M
@media screen and (max-width: 768px) {
   header {

      .main-title {

         .main-title {
            font-size: 51px;
         }
      }
   }
}

// S
@media screen and (max-width: 478px) {
   header {

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