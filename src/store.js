import Vue from 'vue';
// import dayjs from 'dayjs';

let eventCounter = 0;

class Event {

   constructor(_color, _name, _startDate, _endDate) {
      this.id = ++eventCounter;
      this.color = _color;
      this.name = _name;

      this.startDate = new Date(_startDate);
      this.startDate.setHours(0,0,0,0);
      
      this.endDate = new Date(_endDate);
      this.endDate.setHours(0,0,0,0);

      this.calcEventDays();

      // console.log( this );
   }

   delete() {
      // elimina tutti gli oggetti dom con data-id = this.id
   }

   calcEventDays() {
      let dayIndex = new Date(this.startDate);
      dayIndex.setHours(0,0,0,0);

      while (dayIndex.getTime() <= this.endDate.getTime()) {
         // console.log('dayIndex: ' + dayIndex);
         // console.log('endDate: ' + this.endDate);
         state.eventDays.push({
            id: this.id,
            color: this.color,
            date: new Date( dayIndex ),
            firstDay: this.startDate.getTime() === dayIndex.getTime(),
            lastDay: this.endDate.getTime() === dayIndex.getTime()
         });
         dayIndex.setDate( dayIndex.getDate() + 1 );
      }
   }
}

const state = Vue.observable(
   {
      displayedYear: null,
      months: [], // months' names
      weekDays: [], // days' names
      eventEditorOpen: false,
      editor: {
         activeColor: 0,
         inputText: '',
         startDate: null,
         endDate: null,
      },
      colors: [
         'orange',
         'redorange',
         'red',
         'ruby',
         'magenta',
         'purple',
         'blue',
         'azure',
         'lime',
         'green',
         'white',
         'grey',
         'black'
      ],
      eventHover: {
         active: false,
         eventId: null
      },
      events: [],
      eventDays: []
   }
);

// Eventi prova
state.events.push( new Event('orange', 'Prova', '2022-01-01', '2022-01-03') );
state.events.push( new Event('red', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', '2022-03-01', '2022-03-01') );
state.events.push( new Event('lime', 'Another event', '2022-02-01', '2022-02-03') );
state.events.push( new Event('black', 'Compleanno', '2022-03-09', '2022-03-09') );
state.events.push( new Event('purple', 'Vacanze', '2023-04-15', '2023-05-20') );
// console.log( state.eventDays );

export default state;

export function closeEventEditor() {
   state.eventEditorOpen = false;
}

export function pushEvent() {
   const checkDates = Date.parse(state.editor.startDate) && Date.parse(state.editor.endDate);

   if( checkDates ) {

      state.events.push( new Event(
         state.colors[ state.editor.activeColor ],
         state.editor.inputText === '' ? 'Unlabeled' : state.editor.inputText,
         state.editor.startDate < state.editor.endDate ? state.editor.startDate : state.editor.endDate,
         state.editor.startDate < state.editor.endDate ? state.editor.endDate : state.editor.startDate
      ) );

      closeEventEditor();
   } 
}

export function eventHover( id ) {
   state.eventHover.active = true;
   state.eventHover.eventId = id;
}

export function eventLeave() {
   state.eventHover.active = false;
   state.eventHover.eventId = null;
}
