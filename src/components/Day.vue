<template>
   <!-- Day card -->
   <div class="month-day"
      :class="[isToday(year, monthNum, day) ? 'today' : '', otherMonth ? 'other-month-day' : '']"
      @click="openEventEditor( day - 1 )"
      >
      {{ day }}
      <div class="label-wrapper">
         <!-- Event colored label -->
         <div class="event-label"
         v-for="(event,i) in eventsDays" :key="`${date}-${event.id}-${i}`"
         :class="[event.color, event.isfirstDay ? 'first' : '', event.islastDay ? 'last' : '',
         event.id != eventHover.eventId && eventHover.active ? 'semitransparent' : '']"
         @mouseenter="eventHoverTrigger( event.id )"
         @mouseleave="eventLeaveTrigger">
            <!-- Event name -->
            <div class="event-label-name">{{ event.name }}</div>
         </div>
      </div>
   </div>
</template>

<script>
import state from '../store.js';
import dayjs from 'dayjs';
import { eventHover } from '../store.js';
import { eventLeave } from '../store.js';

export default {
   name: 'DayCard',
   data() {
      return {
         eventHover: state.eventHover,
      }
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
      },
      day: {
         type: Number,
         require
      },
      otherMonth: { // tells if the date belongs to the previous or next month
         type: Boolean,
         require
      }
   },
   computed: {
      date: function() {
         let date = new Date( this.toStringDate( this.day ) );
         date.setHours(0,0,0,0);
         return date;
      },
      // array of objects representing each day for each event and various information
      eventsDays: function() {
         return state.eventDays.filter( event => {
            return event.date.getTime() === this.date.getTime();
         } );
      },
   },
   methods: {
      // return if a date is today
      isToday: function(year, month, day) {
         return dayjs(`${ year }-${ month + 1 }-${ day }`).isToday();
      },
      openEventEditor: function(day) {
         state.eventEditorOpen = true;
         state.editor.startDate = new Date(this.year, this.monthNum, day +1, 2); // +hour ?
      },
      toStringDate: function(dayParam) {
         const year = this.year;

         let month = this.monthNum + 1;
         month < 10 ? month = `0${month}` : '';

         let day = dayParam;
         day < 10 ? day = `0${day}` : '';

         return `${year}-${month}-${day}`;
      },
      // triggers hover effect on event and labels with same id
      eventHoverTrigger: function( id ) {
         eventHover( id );
      },
      // removes hover effect on event and labels with same id
      eventLeaveTrigger: function() {
         eventLeave();
      }
   }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';

   .month-day {
      color: rgba($color: white, $alpha: 0.6);
      cursor: pointer;
      position: relative;

      &:hover {
         color: rgba($color: white, $alpha: 0.75);
      }

      &.today {
         background-color: rgb(221, 221, 221);
         color: rgb(51, 51, 51);
         border-radius: 15px;
      }

      &.other-month-day {
         color: rgba($color: white, $alpha: 0.1);
         cursor: default;

         &:hover {
            color: inherit;
         }
      }

      .label-wrapper {
         position: absolute;
         left: 0;
         right: 0;
         top: 100%;
         min-height: 25px;
         max-height: 25px;
         display: flex;
         flex-direction: column;
         gap: 2px;

         .event-label {
            width: 100%;
            flex-grow: 1;
            max-height: 7px;
            position: relative;
            cursor: pointer;

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

            &.semitransparent {
               opacity: 0.3;
            }

            &:hover {

               .event-label-name {
                  display: block;
               }
            }

            .event-label-name {
               display: none;
               position: absolute;
               bottom: calc( 100% + 8px );
               padding: 5px;
               background-color: rgba($color: #000000, $alpha: 0.5);
               color: white;
               white-space: nowrap;
               border-radius: 3px;
            }
         }
      }  
   }
</style>