<template>
    <v-card>
        <v-card-title>Create a connection</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="submit">
            <v-card-text>
                <div class="mb-3">
                    <v-text-field v-model="machineId" type="number" min-value="0" label="machineId"></v-text-field>
                </div>
                <div class="mb-3">
                    <v-text-field v-model="connectedToMachineId" type="number" min-value="0"
                        label="connectedToMachineId"></v-text-field>
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
import { create } from '@/services/connection.service'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ConnectionForm",
    data() {
        return {
            machineId: 0,
            connectedToMachineId: 0,
            startDate: new Date(),
            endDate: new Date(),
            error: "",
            snackbar: false
        }
    },
    methods: {
        async submit() {
            try {
                await create({
                    machineId: this.machineId,
                    connectedToMachineId: this.connectedToMachineId,
                    startDate: this.startDate,
                    endDate: this.endDate,
                })
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
                await this.$router.push('/connections')
            }
        }
    }
})
</script>