<template>
    <v-card outlined>
        <v-simple-table class="mx-3" fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left"> # </th>
                        <th class="text-left"> Email </th>
                        <th class="text-left"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.slice((page - 1) * perPage, page * perPage)" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <v-btn icon small @click="remove(user.id)">
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
import { User } from '@/models/user'
import { defineComponent } from 'vue';
import { getAll, remove } from '@/services/user.service';
import axios from 'axios';

export default defineComponent({
    name: "UsersVue",
    data() {
        return {
            users: new Array<User>(),
            page: 1,
            perPage: 10,
            lastPage: 0,
            error: "",
            snackbar: false
        }
    },
    async mounted() {
        try {
            this.users = await getAll();
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

        this.lastPage = Math.ceil(this.users.length / this.perPage)
    },
    methods: {
        async remove(id: string) {
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
                    this.snackbar = true;
                }

                this.users = this.users.filter(u => u.id !== id)
            }
        }
    }
})

</script>