<template>
   <main>
      <div class="container">

         <!-- Titolo e controlli -->
         <section class="year">
            <button class="year-btn year-down">
               <i class="fa-solid fa-chevron-left"></i>
            </button>
            <h2 class="year-title">Year 2022</h2>
            <button class="year-btn year-up">
               <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="add-event-btn">
               <i class="fa-solid fa-plus"></i>
            </button>
         </section>

         <section class="planner-wrapper">
            <div class="planner-legend">

            </div>
            <div class="planner-calendar">
               <Month
                  v-for="(month,i) in 12" :key="i"
               />
               <!-- <div class="month-card" v-for="(month,i) in 12" :key="i">

               </div> -->
            </div>
         </section>
      </div>
   </main>
</template>

<script>
import Month from './MonthCard.vue';

export default {
   name: 'MainContent',
   components: {
      Month
   }
}
</script>

<style lang="scss" scoped>

main {
   // border: 1px solid white;

   .year {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;

      .year-btn {
         padding: 0 5px;
         font-size: 21px;
         color: rgba($color: white, $alpha: 0.5);

         &:hover {
            color: rgba($color: white, $alpha: 0.75);
         }
      }

      .year-title {
         font-size: 35px;
         font-weight: 700;
         font-family: 'Lato', sans-serif;
         color: white;
      }

      .add-event-btn {
         position: absolute;
         right: 0;
         font-size: 35px;
         color: rgba($color: white, $alpha: 0.8);

         &:hover {
            color: rgba($color: white, $alpha: 1);
         }
      }
   }

   .planner-wrapper {
      display: flex;
      gap: 5px;
      
      .planner-legend {
         width: 250px;
         min-height: 200px;
         border: 1px solid yellow;
      }

      .planner-calendar {
         flex-grow: 1;
         min-height: 200px;
         // border: 1px solid yellow;
         display: flex;
         flex-wrap: wrap;
         gap: 15px;  
      }
   }
}

// L
@media screen and (max-width: 992px) {

   main {

      .planner-wrapper {

         .planner-legend {
            display: none;
         }
      }
   }
}

</style>