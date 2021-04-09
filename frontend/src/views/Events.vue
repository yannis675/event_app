/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

<template>
  <v-data-table :headers="headers" :items="projects" sort-by="project" class="elevation-1">
  <!-- data-table creates a table filled with values from Array :headers -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-fab-transition>
              <v-btn color="#b47bff" v-bind="attrs" v-on="on" fab v-if="button" dark>
                <!-- with "v-if Parameter" the component is only visible if user is logged in -->
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- the following code-blocks are input fields on the dialog -->
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.eventname" label="Eventname:"></v-text-field>
                    <v-container fluid>
                      <v-row align="center">
                        <v-select :items="teachers" v-model="editedItem.teacher" label="Lehrer:"></v-select>
                      </v-row>
                    </v-container>

                    <v-container fluid>
                      <v-row align="center">
                        <v-select
                          :items="timespans"
                          v-model="editedItem.timespan"
                          label="Zeitspanne:"
                        ></v-select>
                      </v-row>
                    </v-container>

                    <!-- select class -->
                    <v-container fluid>
                      <v-row align="center">
                        <!-- Every time the input changes "get_students" - Method is called -->
                        <v-select
                          @change="get_students"
                          :items="classes"
                          item-text="class"
                          v-model="editedItem.class"
                          label="Klassen"
                        ></v-select>
                      </v-row>
                    </v-container>

                    <v-container fluid>
                      <v-row align="center">
                        <v-select
                          :items="groupsize"
                          v-model="editedItem.groupsize"
                          label="Gruppengrösse"
                        ></v-select>
                      </v-row>
                    </v-container>

                    <!-- NOTE: for development purposes the following v-container can be helpful to read Data from DB -->
                    <!-- 
                    <v-container fluid>
                      <v-select
                        v-model="editedItem.student1"
                        :items="students"
                        label="Schüler"
                        multiple
                      >
                        <template v-slot:prepend-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider class="mb-2"></v-divider>
                        </template>
                      </v-select>
                    </v-container> -->

                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-row justify="center">
                      <!-- the datepicker returns a date from a small calendar -->
                      <v-date-picker v-model="editedItem.date">Wählen Sie bitte ein Datum aus!</v-date-picker>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- quit-buttons in the open dialog, if clicked they call the named Method -->
              <v-btn color="#0026ffc4" text @click="close">Schliessen</v-btn>
              <v-btn color="#0026ffc4" text @click="save">Speichern</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- edit-buttons on the right side of the data table -->
      <v-icon small class="mr-2" @click="editItem(item)" v-if="button">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)" v-if="button">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <!-- if no data is in Database a Button element appears that opens a help dialog if clicked (Method "noContent")-->
      <v-btn color="#b47bff" @click="noContent">Noch keine Termine vorhanden!</v-btn>
    </template>
  </v-data-table>
</template>

<script>
//import dependencie "axios"
import axios from "axios";
export default {
  name: "Events",
  data: () => ({
    //empty arrays are later filled with data from DB
    students: [],
    classes: [],
    timespans: ["1", "3", "6"],
    teachers: [],
    groupsize: ["1", "2", "3", "4"],
    dialog: false,
    //array-object to display data in data-table
    headers: [
      { text: "Eventname:", value: "eventname" },
      { text: "Lernende:", value: "student1" },
      { text: "", value: "student2" },
      { text: "", value: "student3" },
      { text: "", value: "student4" },
      { text: "Klasse:", value: "class" },
      { text: "Gruppengrösse:", value: "groupsize" },
      { text: "Zeitspanne (Monate):", value: "timespan" },
      { text: "Datum (Wochentag):", value: "date" },
      { text: "Lehrkraft:", value: "teacher" },
      { text: "Optionen:", value: "actions", sortable: false },
    ],
    projects: [],
    //default set on -1
    editedIndex: -1,
    //editedItem is the data-object generated by the user
    editedItem: {
      eventname: "",
      groupsize: "",
    },
    //empty defaultItem
    defaultItem: {
      eventname: "",
    },
    button: true,
    //for the date-picker in the frontend a date is returned (shortened to ten characters)
    picker: new Date().toISOString().substr(0, 10),
    //used for generating events
    actualIndex: 0,
  }),
  computed: {
    //calculating the dialog state (dependent on clicked edit-button)
    formTitle() {
      return this.editedIndex === -1
        ? "Aufgabe hinzufügen"
        : "Aufgabe editieren";
    },
  },
  watch: {
    //closes the open dialog
    dialog(val) {
      val || this.close();
    },
  },
  //recalls "initialize" Method everytime
  created() {
    this.initialize();
  },
  //mounted is computed on every reload of the site
  mounted() {
    //calls Method to get Classes from DB to Frontend
    this.get_class();
    //for the appearence of the buttons the token is checked (if there is a token = button is visible)
    if (localStorage.token != undefined) {
      console.log("Token vorhanden");
      this.button = true;
    } else {
      //else the Method is called to set the Button on false (not visible)
      this.setButton();
    }
  },
  //methods
  methods: {
    //hide the Buttons in the frontend components
    setButton: function () {
      this.button = false;
    },

    //fetches all events saved in the DB and saves them in local Array "this.projects"
    initialize() {
      fetch("api/event")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          this.projects = data;
        });
    },
    //if no content available, then a button calls a helping dialog
    noContent() {
      confirm('Erfassen sie eine Aufgabe mit "+"');
    },

    //method to change an event
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      //the new created user Object gets assigned to "item"
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //method to delete an event
    deleteItem(item) {
      const index = this.projects.indexOf(item);
      //deletes it locally -> is still saved in DB!
      this.projects.splice(index, 1);
      //event with matching id gets deleted and then logged to console
      fetch(`/api/event/${item.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        }); 
    },

    //method to close the dialog (user clicks "close")
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // get all classes for dropdown list in frontend component
    async get_class() {
      let response = await axios.get("/api/get_class");
      console.log(response.data);
      this.classes = response.data;
      //pushes the teacher for each class in the "this.teachers" Array (gets displayed in Frontend)
      response.data.forEach((classes) => {
      this.teachers.push(classes.teacher);})
    },
    
    //gets all the students from the user-selected class
    async get_students() {
      //get the inserted classname and a clear array to save the data
      let classname = this.editedItem.class;
      this.students = [];
      //get students for selected class from backend
      let response = await axios.get("/api/" + classname);
      //push student names to this.students
      response.data.forEach((person) => {
        this.students.push(person.name);
      });
      //console.log("this.students:" + this.students);
    },

    //save-Method inserts the user-generated events in the database
    /* note: "codingConventions" this Method needs to be as long as it is because of the 
    different user inputs who need to be set and saved*/
    save() {
      //if-case for existing record (index -1)
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem);
        fetch(`/api/event/${this.editedItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editedItem),
        })
          .then((response) => response.json())
          .then((data) => {
            //logs the data object
            console.log("EventData:" + data);
          });
          //closes dialog if "save" is pressed
          this.close();
      } else {
        //saving a completely new record in DB, sort "students" array randomly
        this.students = this.randomSort(this.students);
        //the user-edited timespan for an event is in months, gets converted in weeks (*4)
        let countWeeks = this.editedItem.timespan * 4;
        this.actualIndex = 0;
        //loops as much times as the timespan is
        for (let week = 1; week <= countWeeks; week++) {
          //setStudents Method is called to get correct amount of students (groupsize)
          this.setStudents();
          //the date gets edited each time it goes trough loop (one Week later)
          var newdate = this.setDate();
          this.editedItem.date = newdate;
          //new event is saved to database
          fetch(`/api/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.editedItem),
          }).then((response) => response.json());
        }
        //closes "save" dialog
        this.close();
        //reloads all records from db so the created records are also displayed
        this.initialize();
      }
    },
    setStudents() {
      //user-set groupsize saved in a variable
      let groupsize = this.editedItem.groupsize;
      //if the groupsize is 2 then two students are assigned to an event
      if (groupsize == 2) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
      //case for a groupsize of 3
      } else if (groupsize == 3) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student3 = this.students[this.actualIndex];
        this.setNextIndex();
      //case for a groupsize of 4
      } else if (groupsize == 4) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student3 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student4 = this.students[this.actualIndex];
        this.setNextIndex();
      //case for a groupsize of 1 (last option)
      } else {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
      }
    },
    //switches the index for assigning the students in the previous Method
    setNextIndex() {
      //if Index is < -1 it add 1 and else its set to 0
      if (this.actualIndex < this.students.length - 1) {
        this.actualIndex++;
      } else {
        this.actualIndex = 0;
      }
    },
    //sort the "students" array
    randomSort(array) {
      //the returned object
      let sourceArray = array;
      let newArray = [];
      //take one random elemt from sourceArray until empty
      while (sourceArray.length > 0) {
        //get random element and remove from source
        let randomIndex = this.getRandomInt(sourceArray.length);
        let randomElement = this.students[randomIndex];
        sourceArray.splice(randomIndex, 1);
        //push to new array
        newArray.push(randomElement);
      }
      return newArray;
    },
    //returns random int
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    //modifies the date of an event to one week later
    setDate(dateObj) {
      dateObj = new Date(this.editedItem.date);
      dateObj.setDate(dateObj.getDate() + 7);
      //console.log(dateObj);
      //shortened to substring
      dateObj = dateObj.toISOString().substr(0, 10);
      //console.log("new Date:" + dateObj);
      //return generated object
      return dateObj;
    },
  },
};
</script>