<template>
   <main id="main-content">
      <div class="container">

         <!-- Titolo e controlli -->
         <section class="year">
            <button class="year-btn year-down" @click="yearDecrement">
               <i class="fa-solid fa-chevron-left"></i>
            </button>
            <h2 class="year-title">Year {{ displayedYear }}</h2>
            <button class="year-btn year-up" @click="yearIncrement">
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
                  :month="months[i]"
                  :monthNum="i"
                  :year="displayedYear"
               />
            </div>
         </section>
      </div>
   </main>
</template>

<script>
import Month from './MonthCard.vue';
import dayjs from 'dayjs';

export default {
   name: 'MainContent',
   components: {
      Month
   },
   data() {
      return {
         displayedYear: 0,
         months: []
      }
   },
   methods: {
      yearIncrement: function() {
         this.displayedYear++;
      },
      yearDecrement: function() {
         this.displayedYear--;
      },
      capitalizeString: function(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      }
   },
   mounted() {
      const months = dayjs.months();
      months.forEach(month => { // italian words come lowercase
         this.months.push( this.capitalizeString(month) );
      });

      this.displayedYear = dayjs().year();
   }
}
</script>

<style lang="scss" scoped>

#main-content {
   // border: 1px solid white;

   .year {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;

      .year-btn {
         padding: 3px 5px 0 5px;
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
         min-width: 250px;
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