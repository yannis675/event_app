/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

<template>
  <v-app>
    <div id="nav">
      <!-- navbar displayed on each site -->
      <router-link to="/Events">
        <v-btn value="recent">
          Termine
        </v-btn>
      </router-link>
      <router-link to="/Calendar">
        <v-btn value="favorites">
          Kalender
        </v-btn>
      </router-link>
      <!-- if a user is logged in the logout button is displayed -->
        <v-btn v-if="isLoggedIn" href="/" @click="logout" text>
          <span class="secondary--text mr-2" prepend-icon="mdi-folder">Logout</span>
          <v-icon v-if="isLoggedIn">mdi-logout</v-icon>
        </v-btn>
      <v-main>
        <v-container>
          <router-view @loggedIn="loggedIn" />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
  export default {
    data() {
      //on default no one is logged in
      return {
        isLoggedIn: false,
      };
    },
    mounted() {
      //Token getter
      let token = localStorage.getItem("token");
      //Checks if Token is there
      if (!token) {
        this.isLoggedIn = false;
        //Sets the Login on false if there is NO Token!
        if (this.$router.history.current.name !== "login") {
          this.$router.push("/login");
        }
        //if theres a token loggedIn is set on true
      } else {
        this.isLoggedIn = true;
      }
    },
    methods: {
      //default the Variable "isLoggedIN" is Set on "false" and if the User is Logged in it is then set to "True"
      loggedIn() {
        this.isLoggedIn = true;
      },
      //logout deletes Token from Localstorage
      logout() {
        console.log("Logout sucessfull!");
        localStorage.removeItem("token");
      },
    },
  };
</script>

<style>
  /* style elements in CSS*/
  #nav {
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
  }
  #nav a {
    font-weight: bold;
    color: #0026ffc4;
  }
  #nav a.router-link-exact-active {
    color: #6f00ff;
  }

</style>