<template>
   <header>
      <div class="main-title">
         <figure class="logo-wrapper">
            <img src="../assets/img/akita-logo.png" alt="" class="logo">
         </figure>
         <h1 class="logo-title">YearlyPlanner</h1>
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

header {
   display: flex;
   justify-content: center;
   border: 1px solid white;

   .main-title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 0 100px;
      margin: 0 auto;
      transition: letter-spacing ease-in-out 0.3s;
      border: 1px solid red;

      &:hover {
         letter-spacing: 5px;
      }

      .logo-wrapper {
         width: 70px;
         aspect-ratio: 1;

         .logo {
            // 
         }
      }

      .logo-title {
         font-size: 56px;
         font-weight: 600;
         color: $text-light;
         padding-top: 12px;
      }
   }
}



</style>