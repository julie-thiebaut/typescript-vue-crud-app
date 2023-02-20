
<template>
  <v-app-bar d-flex app absolute color="#fcb69f" dark
    src="https://cdn.pixabay.com/photo/2017/03/20/21/00/server-2160321_1280.jpg">
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(0,150,136,.1),  rgba(0,150,136,.5)"></v-img>
    </template>
    <v-app-bar-title justify-center>Machines Dashboard</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!user" icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <div>{{ user.email }}</div>
    <v-btn v-if="user" @click="logout()" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <template v-if="user" v-slot:extension>
      <v-tabs justify-center>
        <v-tab>
          <router-link to="/users" class="nav-link white-text">
            Users
          </router-link>
        </v-tab>
        <v-tab>
          <router-link to="/machines" class="nav-link white-text">
            Machines
          </router-link>
        </v-tab>
        <v-tab><router-link to="/machine-models" class="nav-link white-text">
            Machines Models
          </router-link>
        </v-tab>
        <v-tab>
          <router-link to="/machine-types" class="nav-link white-text">
            Machines Types
          </router-link>
        </v-tab>
        <v-tab>
          <router-link to="/connections" class="nav-link white-text">
            Connections
          </router-link>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'NavBar',
  props: ['user'],
  methods: {
    async logout() {
      await this.$cookies.remove('jwt')
      await this.$router.push('/login')
    }
  }
})

</script>

<style>
.v-app-bar-title__content {
  text-overflow: clip !important;
}

.white-text {
  color: white !important;
}
</style>