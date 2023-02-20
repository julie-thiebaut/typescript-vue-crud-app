<template>
    <v-card>
        <v-card-title>Create a machine type</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="submit">
            <v-card-text>
                <div class="mb-3">
                    <v-text-field v-model="name" label="Name"></v-text-field>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="primary" type="submit">Save</v-btn>
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
</template>

<script lang="ts">
import { MachineTypeAddAttributes } from '@/models/machinetype.js'
import { get, update, create } from '@/services/machinetype.service'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MachineTypeForm",
    data() {
        return {
            name: '',
            error: '',
            snackbar: false,
        }
    },
    async mounted() {
        if (this.$route.params.id) {
            try {
                const machinetype = await get(Number(this.$route.params.id))
                this.name = machinetype.name
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
        }
    },
    methods: {
        async submit() {
            try {
                const data = {
                    name: this.name,
                } as MachineTypeAddAttributes;
                if (this.$route.params.id) {
                    await update(Number(this.$route.params.id), data)

                } else {
                    await create(data)
                }
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
            await this.$router.push('/machine-types')
        }
    }
})
</script>