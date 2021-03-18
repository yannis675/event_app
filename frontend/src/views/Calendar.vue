<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
      <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
      <v-calendar
          ref="calendar"
          v-model="focus2"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
              >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-list-item-title class="font-weight-bold">Name:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.name"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Klasse:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details1"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Gruppengrösse:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details2"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Schüler:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details3"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details4"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details5"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details6"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Lehrer:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.details7"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false">
                Fertig
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template> 

<script>
  export default {
    data: () => ({
      focus: new Date(),
      focus2: new Date(),
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      copyEvents: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      dates: [],
    }),

    mounted () {
      this.$refs.calendar.checkChange()
      this.initialize()
      let oneMonthLater = new Date(Date.now());
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      this.focus2 = oneMonthLater;
    },
    //Funktionsaufrufe beim starten der App (mounted)
    
    methods: {
      //fetch um Daten ins Frontend zu laden..
      initialize () {
        fetch('api/event')
          .then(response => response.json())
          .then(data => {
              data.forEach(element => {
                 let event = {
                     name : element.eventname, 
                     start : element.date.substr(0, 10),
                     color: this.colors[this.rnd(0, this.colors.length - 1)],
                     timed: false,
                     details1: element.class,
                     details2: element.groupsize,
                     details3: element.student1,
                     details4: element.student2,
                     details5: element.student3,
                     details6: element.student4,
                     details7: element.teacher
                 }
                this.events.push(event)
                //console.log(this.events);
               });
          });
      },

      //kalender formatierungs-Methoden
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        let start1 = new Date(this.focus);
        let start2 = new Date(this.focus2);

        start1.setMonth(start1.getMonth() - 1);
        start2.setMonth(start2.getMonth() - 1);

        this.focus = start1;
        this.focus2 = start2;
      },

      next () {
        let start1 = new Date(this.focus);
        let start2 = new Date(this.focus2);

        start1.setMonth(start1.getMonth() + 1);
        start2.setMonth(start2.getMonth() + 1);

        this.focus = start1;
        this.focus2 = start2;
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>