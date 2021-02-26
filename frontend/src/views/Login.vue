<template>
  <div class="login">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <!--login card-->
        <v-card class="elevation-12 mb-12">
          <v-toolbar color="red" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field name="Username" label="Username" v-model="loginData.username"></v-text-field>
              <v-text-field name="Password" label="Password" type="password" v-model="loginData.password"></v-text-field>
              
              <p style="color: red; text-align: center" v-if="msg">{{ msg }}</p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <!--<v-btn color="warning" @click="register">Register</v-btn>-->
            <v-btn color="grey" @click="login()">Einloggen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginData: {
        username: '',
        password: '',
      },
      msg: "",
    };
  },

  methods: {
    login() {
      console.log(this.loginData)
      axios.post('/api/user/login', this.loginData)
      .then(resp => {
        let data = resp.data
        if (data.token) {
          localStorage.setItem('token', data.token)
          this.$router.push('/events')
        } else {
          console.log("error");
        }
      })
    }
    /*login() {
      //
      let opt = {};
      opt.headers = { "Content-Type": "application/json" };
      opt.body = JSON.stringify(this.loginData);
      fetch("/api/user/login", opt)
        .then((response) => response.json())
        .then((data) => {
          if ("token" in data) {
            localStorage.setItem("token", data.token);
            console.log(data.token);
          } else {
            this.msg = data.message;
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },*/
  },
};
</script>