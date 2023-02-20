<template>
  <v-app style="background: #F5F5F5;">
    <Nav :user="user" />
    <v-main>
      <v-container fluid d-flex class="h-100">
        <v-container fluid d-flex style="justify-content: center; align-items: center;">
          <main class="col-md-9 col-lg-10 px-md-4">
            <router-view />
          </main>
        </v-container>
      </v-container>
      <v-snackbar v-model="snackbar">
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Nav from '../components/Nav.vue';
import { User } from '../models/user'
import { defineComponent } from 'vue';
import { auth } from '@/services/user.service';
import axios from 'axios';

export default defineComponent({
  name: "AppLayout",
  components: { Nav },
  data() {
    return {
      user: new User(),
      error: "",
      snackbar: false
    }
  },
  async mounted() {
    try {
      this.user = await auth();
    } catch (err) {
      this.error = "An error occured";
      if (axios.isAxiosError(err)) {
        if (err?.response) {
          if (err.response?.status === 400) {
            this.error = err.response?.data;
            this.snackbar = true;
          } else if (err.response?.status === 401) {
            this.$router.push('/login');
          }
        }
      }
      this.snackbar = true;
    }
  }
})
</script>