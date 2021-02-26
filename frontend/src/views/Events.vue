<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    sort-by="project"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
              <v-fab-transition>
                <v-btn
                  color="#b47bff"
                  v-bind="attrs"
                  v-on="on"
                  fab
                  v-if="button"
                  dark>
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
                    <!-- <v-text-field v-model="editedItem.teacher" label="Lehrkraft:"></v-text-field> -->
                    
                      <v-container fluid>
                      <v-row align="center">
                          <v-select
                            :items="teachers"
                            v-model="editedItem.teacher"
                            label="Lehrer:"
                          ></v-select>
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

                    <!--<v-text-field v-model="editedItem.name3" label="Lernender 3:"></v-text-field>
                    <v-text-field v-model="editedItem.teacher" label="Fachverantwortlicher:"></v-text-field> -->

                      <v-container fluid>
                      <v-row align="center">
                          <v-select                         
                            :items="classes"
                            v-model="editedItem.class"
                            label="Klassen"
                          ></v-select>
                      </v-row>
                      </v-container>
                    
                      <v-container fluid>
                      <v-row align="center">
                          <v-select
                            @click="get_students()" 
                            :items="groupsize"
                            v-model="editedItem.groupsize"
                            label="Gruppengrösse"
                          ></v-select>
                      </v-row>
                      </v-container>

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
                    </v-container>
                  
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
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="#b47bff" @click="noContent">Keine Termine vorhanden!</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
  export default {
    name: 'Projects',
    data: () => ({
      students: [
        /* 'Yannis','Usman','Kavindu' */
        ], 
      classes: [
        /* 'INF 17','INF 18','INF 19', */
        ],
      timespans: [
        '1','3','6'
        ],
      teachers: [
        'Altin Özcan',
        'Heimberg Matthias',
        'Fankhauser Claude',
        'Iannatone Giulio',
        'Berger Lukas',
        'Heinzen Stephan'
        ],
      groupsize: [
        '1','2','3','4',
        ],
      class_size: [],
      dialog: false,
      //array-objekt zum anzeigen der Termindaten
      headers: [
        { text: 'Eventname:', value: 'eventname'},
        { text: 'Lernende:', value: 'student1'},
        { text: '', value: 'student2'},
        { text: '', value: 'student3'},
        { text: '', value: 'student4'},
        { text: 'Klasse:', value: 'class'},
        { text: 'Gruppengrösse:', value: 'groupsize'},
        { text: 'Zeitspanne (Monate):', value: 'timespan'},
        { text: 'Datum (Wochentag):', value: 'date'},
        { text: 'Lehrkraft:', value: 'teacher'},
        { text: 'Optionen:', value: 'actions', sortable: false },
      ],
      //daten zur Verwendung in den Methoden 
      projects: [],
      positions: [],
      editedIndex: -1,
      editedItem: {
        eventname: '',
        groupsize: ''
      }, 
      defaultItem: {
        eventname: '',
      },
      return: {
        picker: new Date().toISOString().substr(0, 10),
        button: true
      }
    }),
    //daten für editierungs Pop-Up
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Aufgabe hinzufügen' : 'Aufgabe editieren'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    mounted () {
      this.get_class()
      //this.auto_match()
      if (localStorage.token != undefined) {
         console.log("Token vorhanden");
        this.button = true
      }
      else {
        this.setButton()
      }
    },
    //methods
    methods: {
      setButton() {
        this.button = false
      },

    // get all (selected) students
    async get_students (){
      var i;      
      console.log(this.editedItem.class)

             if (this.editedItem.class == "inf18") {

              while( (i = this.students.shift()) !== undefined ) {
              console.log("DELETED ITEM");}

              let response = await axios.get("/api/inf18", this.editedItem);
              let person = response.data;
              person.forEach(person => {
              this.students.push(person.name)})
              console.log("inf18 succesfully selected!")
            }
            else if (this.editedItem.class == "inf19") {
              
              while( (i = this.students.shift()) !== undefined ) {
              console.log("DELETED ITEM");}

              let response = await axios.get("/api/inf19");
              let person = response.data;
              person.forEach(person => {
              this.students.push(person.name)})
              console.log("inf19 succesfully selected!")
            }
            else if(this.editedItem.class == "inf20") {
              
              while( (i = this.students.shift()) !== undefined ) {
              console.log("DELETED ITEM");}

              let response = await axios.get("/api/inf20");
              let person = response.data;
              person.forEach(person => {
              this.students.push(person.name)})
              console.log("inf20 succesfully selected!")
            }
            else {
              
              while( (i = this.students.shift()) !== undefined ) {
              console.log(i);}

              console.log("failed to select class!")

            }
    },

    async get_class() {
            let response = await axios.get("/api/class_size");
            let class2 = response.data;
            class2.forEach(class2 => {
              //this.classes.push(class2.class)
              let class_object = {
                classname: class2.class,
                classsize: class2.class_size
              }
              this.classes.push(class_object.classname)
              this.class_size.push(class_object.classsize)
            })
            //console.log(this.classes)
            //console.log(this.class_size);
            //console.log(person)
      },

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
      },

    set_class_size(size){
      if(this.editedItem.class == this.classes[0]){
        size = this.class_size[0]
      }
      else if(this.editedItem.class == this.classes[1]){
        size = this.class_size[1]
      }
      else if(this.editedItem.class == this.classes[2]){
        size = this.class_size[2]
      }
      return size;
    },

    // choose n students (n=groupsize) and save them in editItem
    setStudents() {

/*       const newArr = this.students.filter((elem) => elem !== undefined); 
      console.log(newArr);     
      newArr.forEach(newArr => {
        this.students.push(newArr);
      })  */

      // get user input
      var i = this.editedItem.groupsize
      var m = this.set_class_size()
      // var m = this.editedItem.class.length

      do {
          // choose 4 random students (s1-s4)
          var z = this.getRandomInt(m)
          var x = this.getRandomInt(m)
          var y = this.getRandomInt(m)
          var k = this.getRandomInt(m)

          }

      while (
            z == x || z == y || z == k || x == y || x == k || y == k
            )
      
      var s1 = this.students[z]
      var s2 = this.students[x]
      var s3 = this.students[y]
      var s4 = this.students[k]

      while (s1 == undefined||s2 == undefined||s3 == undefined||s4 == undefined)
      {
        this.students.reverse()
        this.students.copyWithin()
      }

      console.log("students per event: " + s1 + s2 + s3 + s4);

      if (i == 2) {
          this.editedItem.student1 = s1
          this.editedItem.student2 = s2
          var removed1 = this.students.splice(z, 1)
          var removed2 = this.students.splice(x, 1)
          console.log("REMOVED: " + removed1 + removed2);
          console.log(this.students);
          }
      else if (i == 3){
          this.editedItem.student1 = s1
          this.editedItem.student2 = s2
          this.editedItem.student3 = s3
          var removed3 = this.students.splice(z, 1)
          var removed4 = this.students.splice(x, 1)
          var removed5 = this.students.splice(y, 1)
          console.log("REMOVED: " + removed3 + removed4 + removed5);
          console.log(this.students)
          }
      else if (i == 4){
          this.editedItem.student1 = s1
          this.editedItem.student2 = s2
          this.editedItem.student3 = s3
          this.editedItem.student4 = s4
          var removed6 = this.students.splice(z, 1)
          var removed7 = this.students.splice(x, 1)
          var removed8 = this.students.splice(y, 1)
          var removed9 = this.students.splice(k, 1)
          console.log("REMOVED: " + removed6 + removed7 + removed8 + removed9);
          console.log(this.students)
          }
      else{
          this.editedItem.student1 = s1
          var removed10 = this.students.splice(z, 1)
          console.log("REMOVED: " + removed10);
          console.log(this.students)
          }
          
      },

    async auto_match () {
            let response = await axios.get("/api/pre_students");
            let laststudents = response.data;
             laststudents.forEach(laststudents => { 
            //this.students.push(laststudents.name)
            console.log("default: " + laststudents);
            })
            
/*             do {
              this.setStudents()
            } while (condition);
            //var removed1 = this.students.splice(1, 1)
            //console.log("deleted: "+z); */


    },

    //fetch um alle daten aus dem Backend zu holen
      initialize () {
        fetch('api/project')
          .then(response => response.json())
          .then(data => {
              //console.log(data)
              this.projects = data
          });
      },

      noContent (){
        (confirm('Erfassen sie eine Aufgabe mit "+"'))
      },
      //methode zur bearbeitung eines Termins
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true;
      },
      //methode um Termin zu löschen
      deleteItem (item) {
        const index = this.projects.indexOf(item)
          this.projects.splice(index, 1)
          fetch(`/api/project/${item.id}`, {
            method: 'DELETE',
          })
          .then(response => response.json())
          .then(data => {
          console.log(data)
          });
      },

      //dialog schliessen - Methode
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      setDate (dateObj) {
          dateObj = new Date(this.editedItem.date);

          dateObj.setDate(dateObj.getDate() + 7 )

          //console.log(dateObj);

          dateObj = dateObj.toISOString().substr(0, 10);
          //console.log("new Date:" + dateObj);
          return dateObj;
      },

      clear_array () {
        var students = this.students.filter(function (e) {return e != null;});
        console.log(students);

        this.students = students;
        },
      //methode zur Speicherung eines Termins mit POST in die DB
      /* async  */save () {
        if (this.editedIndex > -1) {
          // events is beeing edited
          Object.assign(this.projects[this.editedIndex], this.editedItem)
          fetch(`/api/project/${this.editedItem.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.editedItem)
          })
          .then(response => response.json())
          .then(data => {
              console.log("EventData:" + data)
          });
        } 
        else {
          // berechne Anzahl Wochen
          let z = this.editedItem.timespan * 4;

          //console.log(z);
          // iteriere über alle Wochen
          for (let i = 0; i < z; i++) {

            // TODO... method name change
            this.setStudents()

            var newdate = this.setDate()
            this.editedItem.date = newdate;

            // new event will be pushed
            this.projects.push(this.editedItem)
            /* await  */fetch(`/api/project`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(this.editedItem)
            })
            .then(response => response.json())

            //this.auto_match()
          }
          this.close()
          this.initialize()
      }},
    },
  }
</script>