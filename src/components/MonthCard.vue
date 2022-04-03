<template>
   <div class="month-card">

      <!-- Month name -->
      <div class="month-name">{{ month }}</div>

      <!-- Weekdays legend -->
      <div class="month-week-days">
         <div class="month-week-day"
            v-for="(weekDay,i) in weekDays" :key="weekDay">
            {{ weekDays[i][0] }}
         </div>
      </div>

      <div class="month-days">
            <!-- Previous month days -->
            <div class="other-month-day"
               v-for="(el,i) in firstDayWeekDay" :key="`${ month }-prev-${ i }`">
               {{ prevMonthDays +  i - firstDayWeekDay + 1 }}
            </div>

            <!-- Month days -->
            <div class="month-day"
               v-for="(el,i) in monthDays" :key="`${ month }-${ i }`"
               :class=" isToday(year, monthNum, i + 1) ? 'today' : '' ">
               {{ i + 1 }}
            </div>

            <!-- Next month days -->
            <div class="other-month-day"
               v-for="(el,i) in nextMonthDays" :key="`${ month }-next-${ i }`">
               {{ i + 1 }}
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
      },
      monthNum: { // starts from 0 to 11 (0 = January)
         type: Number,
         require
      },
      year: {
         type: Number,
         require
      }
   },
   data() {
      return {
         weekDays: [],
      }
   },
   computed: {
      monthDays: function() {
         return dayjs(`${ this.year }-${ this.monthNum + 1 }-01`).daysInMonth();
      },
      prevMonthDays: function() {
         const prevMonthNum = this.monthNum === 0 ? 12 : this.monthNum - 1;
         return dayjs(`${ this.year }-${ prevMonthNum + 1 }-01`).daysInMonth();
      },
      firstDayWeekDay: function() {
         return dayjs(`${ this.year }-${ this.monthNum + 1 }-01`).day();
      },
      nextMonthDays: function() { // num of next month's days to show
         const lastDayWeekDay = dayjs(`${ this.year }-${ this.monthNum + 1 }-${ this.monthDays }`).day();
         return 6 - lastDayWeekDay;
      }
   },
   methods: {
      capitalizeString: function(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      },
      isToday: function(year, month, day) {
         return dayjs(`${ year }-${ month + 1 }-${ day }`).isToday();
      }
   },
   mounted() {
      const weekDays = dayjs.weekdays(); // operazione ripetuta per ogni mese, ha senso spostarla nel backend?
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
   // min-height: 200px;
   background-color: rgba(white, 0.05);

   .month-name {
      padding: 15px 0;
      font-family: 'Lato', sans-serif;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: white;
   }

   .month-week-days {
      display: flex;
      margin-bottom: 10px;

      .month-week-day {
         font-family: 'Lato', sans-serif;
         font-size: 16px;
         font-weight: 700;
         color: rgba($color: white, $alpha: 0.3);
         width: calc(100% / 7);
         text-align: center;
      }
   }

   .month-days {
      display: flex;
      flex-wrap: wrap;

      & > div {
         width: calc(100% / 7);
         padding: 4px 0;
         margin-bottom: 25px;
         text-align: center;
         font-size: 14px;
         font-weight: 700;
         font-family: 'Lato', sans-serif;
      }

      .other-month-day {
         color: rgba($color: white, $alpha: 0.1);
         cursor: default;
      }

      .month-day {
         color: rgba($color: white, $alpha: 0.6);
         cursor: pointer;

         &:hover {
            color: rgba($color: white, $alpha: 0.75);
         }

         &.today {
            background-color: rgb(221, 221, 221);
            color: rgb(51, 51, 51);
            border-radius: 15px;
         }
      }
   }
}

// XL
@media screen and (max-width: 1200px) {

   .month-card {
      width:  calc( ( 100% - 15px * 2 ) / 3 );
   }
}

// L
// @media screen and (max-width: 992px) {

//    .month-card {
//       width:  calc( ( 100% - 15px * 2 ) / 3 );
//    }
// }

// M
@media screen and (max-width: 768px) {

   .month-card {
      width:  calc( ( 100% - 15px * 1 ) / 2 );
   }
}

// S
@media screen and (max-width: 532px) {

   .month-card {
      width:  100%;
   }
}

</style>