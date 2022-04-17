<template>
   <div class="month-day"
      :class=" isToday(year, monthNum, day) ? 'today' : '' "
      @click="openEventEditor( day - 1 )"
      >
      {{ day }}
      <div class="label-wrapper">
         <div class="event-label"
         v-for="(event,i) in eventsDays" :key="`${date}-${event.id}-${i}`"
         :class="[event.color, event.firstDay ? 'first' : '', event.lastDay ? 'last' : '']">
         </div>
      </div>
   </div>
</template>

<script>
import state from '../store.js';
import dayjs from 'dayjs';

export default {
   name: 'DayCard',
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
      },
      day: {
         type: Number,
         require
      }
   },
   computed: {
      date: function() {
         let date = new Date( this.toStringDate( this.day ) );
         date.setHours(0,0,0,0);
         return date;
      },
      eventsDays: function() {
         return state.eventDays.filter( event => {
            // const startDateYear = dayjs(event.startDate).year();
            // const endDateYear = dayjs(event.endDate).year();
            return event.date.getTime() === this.date.getTime();
            // return startDateYear === this.displayedYear ||
            //    endDateYear === this.displayedYear ||
            //    ( startDateYear < this.displayedYear && endDateYear > this.displayedYear );
         } );
      },
   },
   methods: {
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
      },
      fetchEvents: function() {

      }
   }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';

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

      .label-wrapper {
         position: absolute;
         left: 0;
         right: 0;
         top: 100%;
         // border: 1px solid white;
         min-height: 25px;
         max-height: 25px;
         display: flex;
         flex-direction: column;
         gap: 2px;
         pointer-events: none;

         .event-label {
            width: 100%;
            flex-grow: 1;
            max-height: 7px;

            @include colors-bg;

            &.first {
               border-radius: 3px 0 0 3px;
            }

            &.last {
               border-radius: 0 3px 3px 0;
            }

            &.first.last {
               border-radius: 3px;
            }
         }
      }   
   }
</style>