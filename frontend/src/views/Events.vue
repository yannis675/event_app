<template>
  <v-data-table :headers="headers" :items="projects" sort-by="project" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-fab-transition>
              <v-btn color="#b47bff" v-bind="attrs" v-on="on" fab v-if="button" dark>
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
                        <!-- ALO: jedesmal wenn die Auswahl sich ändert, wird get_students() aufgerfuen -->
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
                      <v-date-picker v-model="editedItem.date">Wählen sie bitte ein Datum aus!</v-date-picker>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#0026ffc4" text @click="close">Schliessen</v-btn>
              <v-btn color="#0026ffc4" text @click="save">Speichern</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)" v-if="button">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)" v-if="button">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="#b47bff" @click="noContent">Noch keine Termine vorhanden!</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  name: "Projects",
  data: () => ({
    students: [],
    classes: [],
    timespans: ["1", "3", "6"],
    teachers: [],
    groupsize: ["1", "2", "3", "4"],
    dialog: false,
    //array-objekt zum anzeigen der Termindaten
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
    //daten zur Verwendung in den Methoden
    projects: [],
    editedIndex: -1,
    editedItem: {
      eventname: "",
      groupsize: "",
    },
    defaultItem: {
      eventname: "",
    },
    button: true,
    picker: new Date().toISOString().substr(0, 10),
    actualIndex: 0, //used for generating events
  }),
  computed: {
    /**
     * Berechnung des Dialog-Titels
     */
    formTitle() {
      return this.editedIndex === -1
        ? "Aufgabe hinzufügen"
        : "Aufgabe editieren";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.get_class();
    //this.auto_match()
    if (localStorage.token != undefined) {
      console.log("Token vorhanden");
      this.button = true;
    } else {
      this.setButton();
    }
  },
  //methods
  methods: {
    setButton: function () {
      this.button = false;
    },

    //fetch um alle daten aus dem Backend zu holen
    initialize() {
      fetch("api/event")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          this.projects = data;
        });
    },

    noContent() {
      confirm('Erfassen sie eine Aufgabe mit "+"');
    },

    //methode zur bearbeitung eines Termins
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //methode um Termin zu löschen
    deleteItem(item) {
      const index = this.projects.indexOf(item);
      this.projects.splice(index, 1);
      fetch(`/api/event/${item.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        }); 
    },

    //dialog schliessen - Methode
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // get all classes for dropdown list
    async get_class() {
      let response = await axios.get("/api/get_class");
      console.log(response.data);
      this.classes = response.data;


      response.data.forEach((classes) => {
      this.teachers.push(classes.teacher);})
    },

/*     get_students() {
      let classname = this.editedItem.class;
      let response = axios.get("/api/test", classname);
      response.data.forEach((person) => {
        this.students.push(person.name);
        console.log(this.students);
      });
    }, */

     async get_students() {
      // get class name and clear array
      let classname = this.editedItem.class;
      this.students = [];

      // get students for selected class from backend
      let response = await axios.get("/api/" + classname);

      // push names to this.students
      response.data.forEach((person) => {
        this.students.push(person.name);
      });

      //console.log("this.students:" + this.students);
    },

    //methode zur Speicherung eines Termins mit POST in die DB
    save() {
      if (this.editedIndex > -1) {
        // Editing
        Object.assign(this.projects[this.editedIndex], this.editedItem);
        fetch(`/api/event/${this.editedItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editedItem),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("EventData:" + data);
          });
          this.close();
      } else {
        // Saving
        //sort array randomly
        this.students = this.randomSort(this.students);
        console.log(this.students);

        let countWeeks = this.editedItem.timespan * 4;
        this.actualIndex = 0;

        for (let week = 1; week <= countWeeks; week++) {
          //set students
          this.setStudents();

          var newdate = this.setDate();
          this.editedItem.date = newdate;

          // new event will be pushed
          fetch(`/api/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.editedItem),
          }).then((response) => response.json());
        }

        this.close();
        this.initialize();
      }
    },
    setStudents() {
      let groupsize = this.editedItem.groupsize;

      if (groupsize == 2) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
      } else if (groupsize == 3) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student3 = this.students[this.actualIndex];
        this.setNextIndex();
      } else if (groupsize == 4) {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student2 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student3 = this.students[this.actualIndex];
        this.setNextIndex();
        this.editedItem.student4 = this.students[this.actualIndex];
        this.setNextIndex();
      } else {
        this.editedItem.student1 = this.students[this.actualIndex];
        this.setNextIndex();
      }
    },
    setNextIndex() {
      if (this.actualIndex < this.students.length - 1) {
        this.actualIndex++;
      } else {
        this.actualIndex = 0;
      }
    },
    randomSort(array) {
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
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    setDate(dateObj) {
      dateObj = new Date(this.editedItem.date);

      dateObj.setDate(dateObj.getDate() + 7);

      //console.log(dateObj);

      dateObj = dateObj.toISOString().substr(0, 10);
      //console.log("new Date:" + dateObj);
      return dateObj;
    },
  },
};
</script>