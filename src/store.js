import Vue from 'vue';
// import dayjs from 'dayjs';

let eventCounter = 0;

class Event {

   constructor(_color, _name, _startDate, _endDate) {
      this.id = ++eventCounter;
      this.color = _color;
      this.name = _name;
      this.startDate = new Date(_startDate);
      this.endDate = new Date(_endDate);
      this.eventDays = [];
      this.calcEventDays();
      // const prova = document.querySelectorAll("[data-day='2022-03-09']");
      console.log( this );
   }

   delete() {
      // elimina tutti gli oggetti dom con data-id = this.id
   }

   calcEventDays() {
      // console.log('Start: ' + this.startDate);
      // console.log('End: ' + this.endDate);
      let dayIndex = new Date(this.startDate);
      // console.log('dayIndex: ');

      while (dayIndex.getTime() <= this.endDate.getTime()) {
         // push dentro array eventDays
         this.eventDays.push( new Date( dayIndex ) );
         // console.log( dayIndex );
         dayIndex.setDate( dayIndex.getDate() + 1 );
      }
      // console.log( this.eventDays );
   }

}

const state = Vue.observable(
   {
      // prova: new Event('giallo', 'Testo', '2022-01-01', '2022-01-05'),
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
      // eventCounter: 4,
      events: [
         // {
         //    id: 1,
         //    color: 'orange',
         //    name: 'Prova',
         //    startDate: '2022-01-01',
         //    endDate: '2022-01-01'
         // },
         // {
         //    id: 2,
         //    color: 'red',
         //    name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
         //    startDate: '2022-01-01',
         //    endDate: '2022-01-01'
         // },
         // {
         //    id: 3,
         //    color: 'lime',
         //    name: 'Another event',
         //    startDate: '2022-01-01',
         //    endDate: '2022-01-01'
         // },
         // {
         //    id: 4,
         //    color: 'black',
         //    name: 'Ciao, come stai?',
         //    startDate: '2020-01-01',
         //    endDate: '2022-01-01'
         // },
      ],
   }
);

export default state;

export function closeEventEditor() {
   state.eventEditorOpen = false;
}

export function pushEvent() {
   const checkDates = Date.parse(state.editor.startDate) && Date.parse(state.editor.endDate);

   if( checkDates ) {
      // const event = {
      //    id: ++state.eventCounter,
      //    color: state.colors[ state.editor.activeColor ],
      //    name: state.editor.inputText === '' ? 'Unlabeled' : state.editor.inputText,
      //    startDate: state.editor.startDate < state.editor.endDate ? state.editor.startDate : state.editor.endDate,
      //    endDate: state.editor.startDate < state.editor.endDate ? state.editor.endDate : state.editor.startDate
      // }

      state.events.push( new Event('giallo', 'Testo', '2022-01-01', '2022-01-05' ) );
      // state.events.push( event );
      // console.log(event);
      closeEventEditor();
      // aggiungere reset editor
   } 
}
