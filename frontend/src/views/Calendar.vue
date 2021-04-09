/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
        <!-- Toolbar for the switches to next/previous Month -->
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
          <!-- Icon to move one Month back -->
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
          <!-- Icon to move one Month forward -->
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
        <!-- The calendar Obejct is made with "v-calendar" -->
        <!-- It gets the Events with their Attributes from array "events" -->
      <v-calendar
          ref="calendar"
          v-model="firstFocus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <!-- The calendar Obejct is made with "v-calendar" -->
        <!-- It gets the Events with their Attributes from array "events" -->
        <!-- The second Calendar for the second Month -->
      <v-calendar
          ref="calendar"
          v-model="secondFocus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>

        <!-- If a event is selected, a popup menu opens -->
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
            <!-- Every Attribute of the selected Event is getting displayed -->
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
              <span v-html="selectedEvent.class"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Gruppengrösse:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.groupsize"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Schüler:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.student1"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.student2"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.student3"></span>
              <v-divider></v-divider>
              <span v-html="selectedEvent.student4"></span>
              <v-divider></v-divider>
              <v-list-item-title class="font-weight-bold">Lehrer:</v-list-item-title>
              <v-divider></v-divider>
              <span v-html="selectedEvent.teacher"></span>
            </v-card-text>

            <!-- To close the Menu of a Event -->
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
    /* Variables are getting declared, "focus" is for the startdate of a calendar */
    /* "Events" is a Array with all the Events displayed in the calendars */
    /* "Colors" are static and are later random mixed by a method */
    data: () => ({
      firstFocus: new Date(),
      secondFocus: new Date(),
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),

    //Is recalled at every reload of the site
    mounted () {
      this.$refs.calendar.checkChange()
      //Method "initialize" gets called to display all Events
      this.initialize()
      //For the second calendar a Date is declared (One month after the first calendar)
      let oneMonthLater = new Date(Date.now());
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      this.secondFocus = oneMonthLater;
    },
    
    //All the Methods used in the View
    methods: {

/*    Over Fetch all Records from the Table "Events" are loaded in 
      (Note: "CODING CONVENTION" needs to be that long because of the Object Parameters) */
      initialize () {
        fetch('api/event')
          .then(response => response.json())
          .then(data => {
              data.forEach(element => {
                 let event = { //for each record a new Object-Array Object is generated
                     name : element.eventname, 
                     start : element.date.substr(0, 10),
                     //As mentioned a random color is getting selected
                     color: this.colors[this.rnd(0, this.colors.length - 1)],
                     timed: false,
                     class: element.class,
                     groupsize: element.groupsize,
                     student1: element.student1,
                     student2: element.student2,
                     student3: element.student3,
                     student4: element.student4,
                     teacher: element.teacher}
                //The created Object-Array is pushed into "events" to display them in the calendars
                this.events.push(event)});
          });
      },


    //Calendar Methods
      //Sets the Focus on the actual day
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      //Returns the Color for an Event (random)
      getEventColor (event) {
        return event.color
      },
      //The current view in the calendar should be empty (date gets generated elsewhere)
      setToday () {
        this.focus = ''
      },
      //Method for the Button to switch to the previous Month
      prev () {
        //Two random Dates are generated
        let firstStart = new Date(this.firstFocus);
        let secondStart = new Date(this.secondFocus);
        //Subtracts one Month from each Date
        firstStart.setMonth(firstStart.getMonth() - 1);
        secondStart.setMonth(secondStart.getMonth() - 1);
        //The new dates are now in the "Focus" Variable for the Calendar
        this.firstFocus = firstStart;
        this.secondFocus = secondStart;
      },
      //The same Method as "prev()" but this time one Month gets added to both dates
      next () {
        let firstStart = new Date(this.firstFocus);
        let secondStart = new Date(this.secondFocus);
  
        firstStart.setMonth(firstStart.getMonth() + 1);
        secondStart.setMonth(secondStart.getMonth() + 1);

        this.firstFocus = firstStart;
        this.secondFocus = secondStart;
      },
      //To show information if an event is clicked
      showEvent ({ nativeEvent, event }) {
        //if an event ic clicked
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }
        //if an event gets closed
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      //Returns random Number for the Color mentioned before
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>