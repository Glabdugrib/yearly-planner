<template>
   <section id="event-editor" :class="eventEditorOpen ? 'open' : ''">

      <!-- Event name -->
      <div class="editor_text-input">
         <h5>Event Name</h5>
         <input type="text" name="event_name" v-model="textInput">
      </div>

      <!-- Dates -->
      <div class="editor_date-input">
         <div class="date-wrapper">
            <h5>Start Date</h5>
            <input type="date" name="event_start-date" id="event_start-date"
            :value="startDate && startDate.toISOString().split('T')[0]"
            @input="startDate = $event.target.valueAsDate"> <!-- per far funzionare input date -->
         </div>
         <div class="date-wrapper">
            <h5>End Date</h5>
            <input type="date" name="event_end-date" id="event_end-date"
            :value="endDate && endDate.toISOString().split('T')[0]"
            @input="endDate = $event.target.valueAsDate"> <!-- per far funzionare input date -->
         </div>
      </div>

      <!-- Color swatch -->
      <div class="editor_colors">
         <h5>Color</h5>
         <div class="colors-wrapper">
            <div class="color-swatch"
               v-for="(color,i) in colors" :key="`editor-swatch-${ color }`"
               :class="[color, activeColor === i ? 'active' : '']"
               @click="selectColor(i)"
            ></div>
         </div>
      </div>

      <!-- Editor control buttons -->
      <div class="editor-buttons">
         <button @click="resetEventEditor">Cancel</button>
         <button @click="addEvent">Save</button>
      </div>
   </section>
</template>

<script>
import state from '../store.js';
import { pushEvent } from '../store.js';

export default {
   name: 'EventEditor',
   data() {
      return {
         textInput: '',
         startDate: null,
         endDate: null,
         colors: state.colors,
      }
   },
   computed: {
      // selected color in the event editor
      activeColor: function() {
         return state.editor.activeColor;
      },
      eventEditorOpen: function() {
         return state.eventEditorOpen;
      }
   },
   watch: {
      eventEditorOpen: function(newVal) {
         if( newVal ) {
            this.startDate = state.editor.startDate;
         } else {
            this.startDate = null;
         }
      }
   },
   methods: {
      selectColor: function(i) {
         state.editor.activeColor = i;
      },
      // reset function
      resetEventEditor: function() {
         state.eventEditorOpen = false;
         state.editor.startDate = null;
         state.editor.endDate = null;
         state.editor.textInput = '';
         this.startDate = null;
         this.endDate = null;
         this.textInput = '';
      },
      // create new event
      addEvent: function() {         
         state.editor.inputText = this.textInput;
         state.editor.startDate = this.startDate;
         state.editor.endDate = this.endDate;
         pushEvent();
         this.resetEventEditor();
      }
   }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import '../assets/scss/_mixins.scss';

#event-editor {
   position: fixed;
   bottom: 0;
   left: 50%;
   transform: translateX(-50%);
   width: 90vw;
   max-width: 500px;
   padding: 15px 10px;
   border-radius: 10px 10px 0 0;
   color: rgba($color: white, $alpha: 0.75);
   background-color: $event-editor-bg;
   box-shadow: 0px 0px 15px 0px rgba($color: #000000, $alpha: 0.15);
   transition: all 0.7s;
   transform: translate3d(-50%, 100%, 0px);
   pointer-events: none;
   opacity: 0;

   &.open {
      transform: translate3d(-50%, 0%, 0px);
      pointer-events: auto;
      opacity: 1;
   }

   & > div {
      margin-bottom: 10px;
   }

   h5 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 5px;
   }

   input {
      width: 100%;
      padding: 5px;
      border: none;
      border-radius: 2px;
      color: inherit;
      font-size: 18px;
      font-weight: 400;
      background-color: rgba($color: white, $alpha: 0.2);

      &:focus-visible {
         outline: none;
      }
   }

   .editor_date-input {
      display: flex;
      gap: 5px;

      .date-wrapper {
         width: 50%;
      }
   }

   .editor_colors {

      .colors-wrapper {
         display: flex;
         justify-content: space-between;

         .color-swatch {
            width: 20px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 2px solid rgba($color: white, $alpha: 0.4);

            @include colors-bg;

            &.active {
               border: 2px solid white;
               transform: scale(1.2);
            }

            &:hover {
               border: 2px solid rgba($color: white, $alpha: 0.8);
               cursor: pointer;
            }
         }
      }
   }

   .editor-buttons {
      margin-bottom: 0;
      display: flex;
      gap: 5px;

      button {
         width: calc( ( 100% - 5px ) / 2) ;
         padding: 6px 25px;
         border-radius: 4px;
         background-color: $event-editor-btn;
         color: white;
         font-size: 16px;
         cursor: pointer;
         font-weight: 700;
         text-transform: uppercase;
         box-shadow: 2px 2px 0px 0px rgba($color: #000000, $alpha: 0.07);
         align-self: center;

         &:hover {
            background-color: $event-editor-btn-hover;
            box-shadow: 2px 2px 0px 0px rgba($color: #000000, $alpha: 0.1);
         }
      }
   }
}

</style>