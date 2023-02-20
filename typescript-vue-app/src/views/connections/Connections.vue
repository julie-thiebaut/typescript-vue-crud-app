<template>
    <v-card outlined>
        <div class="my-5 pr-5 d-flex" style="width:100%; justify-content: end;">
            <v-btn :href="`/connections/create`" color="primary" elevation="2">Add a connection</v-btn>
        </div>
        <v-simple-table class="mx-3" fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left"> # </th>
                        <th class="text-left"> Machine ID </th>
                        <th class="text-left"> Connected To Machine ID </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="connection in connections.slice((page - 1) * perPage, page * perPage)" :key="connection.id">
                        <td>{{ connection.id }}</td>
                        <td>{{ connection.machine.model.name }}</td>
                        <td>{{ connection.connectedToMachine.model.name }}</td>
                        <td>

                            <v-btn icon small class="mr-2" :href="`/connections/${connection.id}/edit`">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon small @click="remove(connection.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div class="text-right pr-5 my-3">
            <v-pagination v-model="page" total-visible="7" :length="lastPage"></v-pagination>
        </div>
        <v-snackbar v-model="snackbar">
            {{ error }}
            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script lang="ts">

import axios from 'axios'
import { Connection } from '@/models/connection'
import { defineComponent } from 'vue';
import { getAll, remove } from '@/services/connection.service'

export default defineComponent({
    name: "ConnectionsVue",
    data() {
        return {
            connections: new Array<Connection>(), //as Player[]
            page: 1,
            perPage: 10,
            lastPage: 0,
            error: "",
            snackbar: false
        }
    },
    async mounted() {
        try {
            this.connections = await getAll();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (!err?.response) {
                    this.error = "An error occured";
                    this.snackbar = true;
                } else if (err.response?.status === 400) {
                    this.error = err.response?.data;
                    this.snackbar = true;
                } else if (err.response?.status === 401) {
                    this.$router.push('/login');
                } else {
                    this.error = "An error occured";
                    this.snackbar = true;
                }
            }
        }
        this.lastPage = Math.ceil(this.connections.length / this.perPage)
    },
    methods: {
        async remove(id: number) {
            if (confirm('Are you sure?')) {
                try {
                    await remove(id)
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
                    this.connections = this.connections.filter(m => m.id !== id)
                }
            }
        }
    }
})

</script>
