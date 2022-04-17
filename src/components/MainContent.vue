<template>
   <main id="main-content">
      <div class="container">

         <!-- Year and controls -->
         <section class="year">
            <button class="year-btn year-down" @click="yearDecrement">
               <i class="fa-solid fa-chevron-left"></i>
            </button>
            <h2 class="year-title">Year {{ displayedYear }}</h2>
            <button class="year-btn year-up" @click="yearIncrement">
               <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="add-event-btn" @click="openEventEditor">
               <i class="fa-solid fa-plus"></i>
            </button>
         </section>

         <!-- Planner main content -->
         <section class="planner-wrapper">

            <!-- Legend -->
            <div class="planner-legend">
               <h4 class="planner-legend_title">Legend</h4>
               <p class="no-events" v-if="events.length === 0">No events</p>
               <ul class="event_list" v-if="events.length > 0">
                  <li class="event"
                  v-for="event in events" :key="`event-${ event.id }`"
                  @mouseenter="eventHoverTrigger( event.id )"
                  @mouseleave="eventLeaveTrigger"
                  :class="event.id != eventHover.eventId && eventHover.active ? 'semitransparent' : '' "
                  >
                     <div class="event_color-swatch" :class="event.color"></div>
                     <div class="event_name">{{ event.name }}</div>
                     <div class="event_delete-btn" @click="deleteEvent(event.id)">
                        <i class="fa-solid fa-trash-can"></i>
                     </div>
                  </li>
               </ul>
            </div>

            <!-- Calendar -->
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
import state from '../store.js';
import { eventHover } from '../store.js';
import { eventLeave } from '../store.js';

export default {
   name: 'MainContent',
   components: {
      Month
   },
   data() {
      return {
         // events: state.events,
         eventHover: state.eventHover,
      }
   },
   computed: {
      events: function() {
         return state.events.filter( event => {
            const startDateYear = dayjs(event.startDate).year();
            const endDateYear = dayjs(event.endDate).year();
            return startDateYear === this.displayedYear ||
               endDateYear === this.displayedYear ||
               ( startDateYear < this.displayedYear && endDateYear > this.displayedYear );
         } );
      },
      displayedYear: function() {
         return state.displayedYear;
      },
      months: function() {
         return state.months;
      }
   },
   methods: {
      yearIncrement: function() {
         state.displayedYear++;
      },
      yearDecrement: function() {
         state.displayedYear--;
      },
      capitalizeString: function(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      },
      deleteEvent: function(id) {
         // eliminazione evento da lista eventi
         for (let i = 0; i < state.events.length; i++) {
            if( state.events[i].id === id ) {
               state.events.splice(i,1);
               i--; // perché una volta eliminato un elemento, quelli successivi slittano di posizione
            }
         }

         // eliminazione evento da lista giorni evento
         for (let i = 0; i < state.eventDays.length; i++) {
            if( state.eventDays[i].id === id ) {
               state.eventDays.splice(i,1);
               i--; // come sopra
            }
         }

         // Reset hover
         this.eventLeaveTrigger();
      },
      openEventEditor: function() {
         state.eventEditorOpen = true;
      },
      eventHoverTrigger: function( id ) {
         eventHover( id );
      },
      eventLeaveTrigger: function() {
         eventLeave();
      }
   },
   mounted() {
      // Fetch months names
      const months = dayjs.months();
      months.forEach(month => { // italian words come lowercase
         state.months.push( this.capitalizeString(month) );
      });

      // Fetch current year
      state.displayedYear = dayjs().year();

      // Fetch days names
      const weekDays = dayjs.weekdays();
      weekDays.forEach(weekDay => {  // italian words come lowercase
         state.weekDays.push( this.capitalizeString(weekDay) );
      });

      // Reset event hover effect
      this.eventLeaveTrigger();
   }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import '../assets/scss/_mixins.scss';

#main-content {

   .year {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;

      .year-btn {
         padding: 3px 5px 0 5px;
         font-size: 21px; // <--
         color: rgba($color: white, $alpha: 0.5);  // <--

         &:hover {
            color: rgba($color: white, $alpha: 0.75);  // <--
         }
      }

      .year-title {
         font-size: 35px;  // <--
         font-weight: 700;
         font-family: 'Lato', sans-serif;  // <--
         color: white;  // <--
      }

      .add-event-btn {
         position: absolute;
         right: 0;
         font-size: 35px;  // <--
         color: rgba($color: white, $alpha: 0.8);  // <--

         &:hover {
            color: rgba($color: white, $alpha: 1);  // <--
         }
      }
   }

   .planner-wrapper {
      display: flex;
      gap: 10px;
      
      .planner-legend {
         min-width: 250px;
         min-height: 200px;

         .planner-legend_title {
            font-family: 'Lato', sans-serif;  // <--
            font-size: 16px;  // <--
            font-weight: 700;
            text-transform: uppercase;
            color: rgba($color: white, $alpha: 0.6);  // <--
            margin-bottom: 5px;
         }

         .no-events {
            font-family: 'Lato', sans-serif;
            font-size: 18px;
            color: white;
         }

         .event_list {

            .event {
               padding: 8px 5px 8px 0;
               display: flex;
               align-items: center;
               gap: 8px;
               cursor: pointer;
               position: relative;
               overflow: hidden;

               &.semitransparent {
                  opacity: 0.4;
               }

               .event_color-swatch {
                  min-width: 15px;
                  aspect-ratio: 1;
                  border-radius: 50%;

                  @include colors-bg;
               }

               .event_name {
                  font-family: 'Lato', sans-serif; // <--
                  font-size: 17px; // <--
                  color: rgba($color: white, $alpha: 0.7); // <--
                  white-space: nowrap;
                  margin-right: 5px;
               }

               .event_delete-btn {
                  position: absolute;
                  right: 0;
                  height: 100%;
                  aspect-ratio: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: rgba($color: white, $alpha: 0.9); // <--
                  font-size: 14px; // <--
                  opacity: 0;
                  transition: opacity ease-in-out 0.3s;
                  z-index: 3;

                  &::before {
                     content: '';
                     display: block;
                     position: absolute;
                     top: 0;
                     bottom: 0;
                     right: 0;
                     aspect-ratio: 5 / 3;
                     background-image: linear-gradient(
                        to left,
                        rgba($color: $main-bg, $alpha: 1) 50%,
                        rgba($color: $main-bg, $alpha: 0)
                     );  // <--
                     z-index: -1;
                     pointer-events: none;
                  }

                  &:hover {
                     color: #FC4F4F;  // <--
                  }
               }

               &:hover {

                  .event_name {
                     color: rgba($color: white, $alpha: 0.9);  // <--
                  }

                  .event_delete-btn {
                     opacity: 1;
                  }
               }
            }
         }
      }

      .planner-calendar {
         flex-grow: 1;
         min-height: 200px;
         display: flex;
         flex-wrap: wrap;
         gap: 15px;  
      }
   }
}

// Large screens
@media screen and (max-width: 992px) {

   main {

      .planner-wrapper {
         flex-direction: column-reverse;
      }
   }
}

</style>