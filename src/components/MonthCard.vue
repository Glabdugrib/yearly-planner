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
            <div class="other-month-day"
               v-for="(el,i) in firstDayWeekDay" :key="`${ month }-prev-${ i }`">
               {{ prevMonthDays +  i - firstDayWeekDay + 1 }}
            </div>

            <!-- Month days -->
            <div class="month-day"
               v-for="(el,i) in monthDays" :key="`${ month }-${ i }`"
               :class=" isToday(year, monthNum, i + 1) ? 'today' : '' "
               @click="openEventEditor( i )"
               :data-date="toStringDate(i+1)">
               {{ i + 1 }}
               <!-- <div class="event-label"></div> -->
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
import state from '../store.js';

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
      },
      isToday: function(year, month, day) {
         return dayjs(`${ year }-${ month + 1 }-${ day }`).isToday();
      },
      openEventEditor: function(day) {
         state.eventEditorOpen = true;
         state.editor.startDate = new Date(this.year, this.monthNum, day +1, 2); // aggiunte 2h per il fuso USA - Europa
      },
      toStringDate: function(dayParam) {
         const year = this.year;

         let month = this.monthNum + 1;
         month < 10 ? month = `0${month}` : '';

         let day = dayParam;
         day < 10 ? day = `0${day}` : '';

         return `${year}-${month}-${day}`;
      }
   }
}
</script>

<style lang="scss" scoped>

.month-card {
   border-radius: 8px;
   width:  calc( ( 100% - 15px * 3 ) / 4 );
   background-color: rgba(white, 0.05); // <--

   .month-name {
      padding: 15px 0;
      font-family: 'Lato', sans-serif; // <--
      font-size: 18px; // <--
      font-weight: 700;
      text-align: center;
      color: white; // <--
   }

   .month-week-days {
      display: flex;
      margin-bottom: 10px;

      .month-week-day {
         font-family: 'Lato', sans-serif; // <--
         font-size: 16px; // <--
         font-weight: 700;
         color: rgba($color: white, $alpha: 0.3); // <--
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
         font-size: 14px; // <--
         font-weight: 700;
         font-family: 'Lato', sans-serif; // <--
      }

      .other-month-day {
         color: rgba($color: white, $alpha: 0.1); // <--
         cursor: default;
      }

      .month-day {
         color: rgba($color: white, $alpha: 0.6); // <--
         cursor: pointer;
         position: relative;

         &:hover {
            color: rgba($color: white, $alpha: 0.75); // <--
         }

         &.today {
            background-color: rgb(221, 221, 221); // <--
            color: rgb(51, 51, 51); // <--
            border-radius: 15px;
         }

         .event-label {
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            height: 7px;
            // border-radius: 2px;
            background-color: yellow;
         }
      }
   }
}

// XL screens
@media screen and (max-width: 1200px) {

   .month-card {
      width:  calc( ( 100% - 15px * 2 ) / 3 );
   }
}

// M screens
@media screen and (max-width: 768px) {

   .month-card {
      width:  calc( ( 100% - 15px * 1 ) / 2 );
   }
}

// S screens
@media screen and (max-width: 532px) {

   .month-card {
      width:  100%;
   }
}

</style>