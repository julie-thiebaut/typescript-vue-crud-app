<template>
  <v-app style="background: #F5F5F5;">
    <v-main>
      <v-container fluid d-flex class="h-100">
        <v-container class="w-50" fluid d-flex style="justify-content: center; align-items: center;">
          <main class="w-100">
            <v-card>
              <v-card-title style="justify-content: center;">Please register</v-card-title>
              <v-form @submit.prevent="submit">
                <v-card-text>
                  <div class="form-floating">
                    <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
                    <label>Email address</label>
                  </div>
                  <div class="form-floating">
                    <input v-model="password" type="password" class="form-control" placeholder="Password">
                    <label>Password</label>
                  </div>
                  <div class="form-floating">
                    <input v-model="passwordConfirm" type="password" class="form-control" placeholder="Password">
                    <label>Password</label>
                  </div>
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                  <v-btn class="mb-3" color="primary" type="submit"> <v-icon left>mdi-account</v-icon>
                    Register</v-btn>
                </v-card-actions>
              </v-form>
              <v-snackbar v-model="snackbar">
                {{ error }}
                <template v-slot:action="{ attrs }">
                  <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card>
          </main>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { register } from '@/services/user.service'
import { UserAddAttributes } from '@/models/user';
import axios from 'axios';

export default defineComponent({
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      error: "",
      snackbar: false
    }
  },
  methods: {
    async submit() {
      try {
        await register({
          email: this.email,
          password: this.password,
        } as UserAddAttributes)
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

      await this.$router.push('/login')
    }
  }
})
</script>