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

      <!-- Months' days -->
      <div class="month-days">

            <!-- Previous month days -->
            <Day
               v-for="(el,i) in firstDayWeekDay" :key="`${ month }-prev-${ i + 1 }`"
               :month="month"
               :monthNum="(monthNum - 1) < 0 ? 11 : (monthNum - 1)"
               :year="(monthNum - 1) < 0 ? (year - 1) : year"
               :day="prevMonthDays +  i - firstDayWeekDay + 1"
               :otherMonth="true"
            />

            <!-- Actual month days -->
            <Day
               v-for="(el,i) in monthDays" :key="`${ month }-${ i + 1 }`"
               :month="month"
               :monthNum="monthNum"
               :year="year"
               :day="i + 1"
               :otherMonth="false"
            />

            <!-- Next month days -->
            <Day
               v-for="(el,i) in nextMonthDays" :key="`${ month }-next-${ i + 1 }`"
               :month="month"
               :monthNum="(monthNum + 1) > 11 ? 0 : (monthNum + 1)"
               :year="(monthNum + 1) > 11 ? (year + 1) : year"
               :day="i + 1"
               :otherMonth="true"
            />
      </div>
   </div>
</template>

<script>
import Day from './Day.vue';
import dayjs from 'dayjs';
import state from '../store.js';

export default {
   name: 'MonthCard',
   components: {
      Day
   },
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
         weekDays: state.weekDays,
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
      }
   }
}
</script>

<style lang="scss" scoped>

.month-card {
   border-radius: 8px;
   width:  calc( ( 100% - 15px * 3 ) / 4 );
   background-color: rgba(white, 0.05);

   .month-name {
      padding: 15px 0;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: white;
   }

   .month-week-days {
      display: flex;
      margin-bottom: 10px;

      .month-week-day {
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
      }

      .other-month-day {
         color: rgba($color: white, $alpha: 0.1);
         cursor: default;
      }
   }
}

// XL screens
@media screen and (max-width: 1200px) {

   .month-card {
      width:  calc( ( 100% - 15px * 2 ) / 3 );
   }
}

// Medium screens
@media screen and (max-width: 768px) {

   .month-card {
      width:  calc( ( 100% - 15px * 1 ) / 2 );
   }
}

// Small screens
@media screen and (max-width: 532px) {

   .month-card {
      width:  100%;
   }
}

</style>