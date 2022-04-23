import Vue from 'vue';

let eventCounter = 0;

// Compare function to sort events by startDate and endDate
function sortEvents(a,b) {

   if( a.startDate < b.startDate ) {
      return -1;
   } else if( a.startDate > b.startDate ) {
      return 1;
   } else if( a.endDate < b.endDate ) {
      return -1;
   } else if( a.endDate > b.endDate ) {
      return 1;
   } else {
      return 0;
   }
}

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

      this.pushIntoArray()
   }

   calcEventDays() {
      let dayIndex = new Date(this.startDate);
      dayIndex.setHours(0,0,0,0);

      while (dayIndex.getTime() <= this.endDate.getTime()) {
         state.eventDays.push({
            id: this.id,
            color: this.color,
            name: this.name,
            date: new Date( dayIndex ),
            isfirstDay: this.startDate.getTime() === dayIndex.getTime(),
            islastDay: this.endDate.getTime() === dayIndex.getTime(),
            startDate: this.startDate,
            endDate: this.endDate
         });
         dayIndex.setDate( dayIndex.getDate() + 1 );

         // Sort eventDays
         state.eventDays.sort( sortEvents );
      }
   }

   pushIntoArray() {
      state.events.push( this );

      // Sort events
      state.events.sort( sortEvents );
   }
}


// STATE DATA
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


// Demo events creation
new Event('blue', 'Holidays', '2022-01-08', '2022-01-13');
new Event('orange', 'Trip to Berlin', '2022-01-10', '2022-01-12');
new Event('green', 'Birthday', '2022-03-09', '2022-03-09');
new Event('red', 'Project', '2022-03-30', '2022-04-03');
new Event('lime', 'New event', '2022-05-12', '2022-05-13');
new Event('purple', 'Holidays', '2023-02-15', '2023-02-27');
new Event('white', 'Dentist appointment', '2021-11-08', '2021-11-08');


export default state;

export function closeEventEditor() {
   state.eventEditorOpen = false;
}

export function pushEvent() {
   const checkDates = Date.parse(state.editor.startDate) && Date.parse(state.editor.endDate);

   if( checkDates ) {

      new Event(
         state.colors[ state.editor.activeColor ],
         state.editor.inputText === '' ? 'Unlabeled' : state.editor.inputText,
         state.editor.startDate < state.editor.endDate ? state.editor.startDate : state.editor.endDate,
         state.editor.startDate < state.editor.endDate ? state.editor.endDate : state.editor.startDate
      );

      closeEventEditor();
   } 
}

// triggers hover effect on event and labels with same id
export function eventHover( id ) {
   state.eventHover.active = true;
   state.eventHover.eventId = id;
}

// removes hover effect on event and labels with same id
export function eventLeave() {
   state.eventHover.active = false;
   state.eventHover.eventId = null;
}
