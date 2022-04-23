<template>
   <footer id="footer">
      <div class="credits">
         <div class="credits_info">
            <p>©2022 - YearlyPlanner</p>
            <p>by <a href="https://www.linkedin.com/in/simone-sada/">Simone Sada</a> aka <a href="https://github.com/stars/Glabdugrib/lists/projects">@Glabdugrib</a></p>
         </div>
         <p class="credits_built">Built with Vue 2</p>
      </div>
   </footer>
</template>

<script>
export default {
   name: 'MainFooter'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

#footer {
   padding: 50px 20px 20px 20px;
   display: flex;
   justify-content: center;

   .credits {
      max-width: 1000px;
      flex-grow: 1;
      padding: 10px 20px;
      background-color: rgba(black, 0.35);
      border-radius: 10px;
      color: rgba($color: white, $alpha: 0.7);
      text-align: center;
      font-size: 17px;
      line-height: 30px;
      word-spacing: 3px;

      a {
         font-weight: 700;
         font-size: 18px;
         transition: color ease-in-out 0.2s;
         color: rgba($color: $anchor-color, $alpha: 0.7);

         &:hover {
            color: $anchor-color;
         }
      }

      .credits_info {
         display: flex;
         justify-content: center;
         gap: 5px;
      }

      .credits_with {
         font-size: 0.9em;
      }
   }
}

// Medium screens
@media screen and (max-width: 768px) {

   #footer {

      .credits {
         font-size: 16px;
      }
   }
}

// Small screens
@media screen and (max-width: 532px) {

   #footer {
      padding: 50px 30px 20px 30px;

      .credits {
         font-size: 15px;

         .credits_info {
            gap: 0;
            flex-direction: column;
         }
      }
   }
}

</style>