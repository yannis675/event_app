/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

<template>
  <div class="login">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <!--login card-->
        <v-card class="elevation-12 mb-12">
          <v-toolbar color="red" dark flat>
            <!-- login button -->
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <!-- displays the login form input fields -->
              <v-text-field name="Username" label="Username" v-model="loginData.username"></v-text-field>
              <v-text-field name="Password" label="Password" type="password" v-model="loginData.password"></v-text-field>
              <p style="color: red; text-align: center" v-if="msg">{{ msg }}</p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <!-- Note: for the future a login with "register" Function would be possible! -->
            <!--<v-btn color="warning" @click="register">Register</v-btn>-->

            <!-- if user clicks login, the login Method is called -->
            <v-btn color="grey" @click="login()">Einloggen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//necessary import
import axios from "axios";
export default {
  data() {
    return {
      //default empty login data
      loginData: {
        username: '',
        password: '',
      },
      //default empty login message (possible error message)
      msg: "",
    };
  },

  methods: {
    //method is called if a user clicks on "login"
    login() {
      //console.log(this.loginData)
      //login data is sent to backend
      axios.post('/api/user/login', this.loginData)
      .then(resp => {
        let data = resp.data
        //console.log(data)
        //if theres a token the view "events" gets pushed, else a console error is sent
        if (data.token) {
          localStorage.setItem('token', data.token)
          console.log("token set!");
          this.$router.push('/events')
        } else {
          console.log("error! no token");
        }
      })
    }
  },
};
</script>