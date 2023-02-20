<template>
    <v-card>
        <v-card-title>Create a machine</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="submit">
            <v-card-text>
                <div class="mb-3">
                    <v-text-field v-model="mac" label="MAC"></v-text-field>
                </div>
                <div class="mb-3">
                    <v-select v-model="state" :items="states" label="State"></v-select>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="primary" type="submit"> <v-icon left>mdi-content-save</v-icon>
                    Save</v-btn>
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
import { MachineAddAttributes } from '@/models/machine'
import { get, update, create } from '@/services/machine.service'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MachineForm",
    data() {
        return {
            mac: '',
            state: '',
            states: ['installed', 'maintenance', 'stock'],
            error: "",
            snackbar: false
        }
    },
    async mounted() {
        if (this.$route.params.id) {
            try {
                const machine = await get(Number(this.$route.params.id))
                this.mac = machine.mac
                this.state = machine.state
                if (this.state == "installed") {
                    this.states = ['installed', 'maintenance']
                } else if (this.state == "maintenance") {
                    this.states = ['stock', 'maintenance']
                } else if (this.state == "stock") {
                    this.states = ['stock', 'installed']
                }
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
    },
    methods: {
        async submit() {
            try {
                const data = {
                    mac: this.mac,
                    state: this.state,
                } as MachineAddAttributes;
                if (this.$route.params.id) {
                    await update(Number(this.$route.params.id), data)

                } else {
                    await create(data)
                }
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

            await this.$router.push('/machines')
        }
    }
})
</script>