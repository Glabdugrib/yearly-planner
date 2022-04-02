<template>
   <div class="month-card">
      <div class="month-name">{{ month }}</div>
      <div class="month-week-days">
         <div class="month-week-day"
            v-for="(weekDay,i) in weekDays" :key="weekDay">
            {{ weekDays[i][0] }}
         </div>
      </div>
   </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
   name: 'MonthCard',
   props: {
      month: {
         type: String,
         require
      }
   },
   data() {
      return {
         weekDays: [],
      }
   },
   methods: {
      capitalizeString: function(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      }
   },
   mounted() {
      const weekDays = dayjs.weekdays();
      weekDays.forEach(weekDay => { // italian words come lowercase
         this.weekDays.push( this.capitalizeString(weekDay) );
      });
   }
}
</script>

<style lang="scss" scoped>

.month-card {
   border-radius: 8px;
   width:  calc( ( 100% - 15px * 3 ) / 4 );
   min-height: 200px;
   background-color: rgba(white, 0.05);

   .month-name {
      padding: 10px 0;
      font-family: 'Lato', sans-serif;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: white;
   }

   .month-week-days {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;

      .month-week-day {
         font-family: 'Lato', sans-serif;
         font-size: 16px;
         font-weight: 700;
         color: rgba($color: white, $alpha: 0.3)
      }
   }
}

// L
@media screen and (max-width: 992px) {

   .month-card {
      width:  calc( ( 100% - 15px * 2 ) / 3 );
   }
}

// M
@media screen and (max-width: 768px) {

   .month-card {
      width:  calc( ( 100% - 15px * 1 ) / 2 );
   }
}

// S
@media screen and (max-width: 478px) {

   .month-card {
      width:  100%;
   }
}

</style>