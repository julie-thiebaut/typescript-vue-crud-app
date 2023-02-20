<template>
    <v-card>
        <v-card-title>Create a machine type</v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent="submit">
            <v-card-text>
                <div class="mb-3">
                    <v-text-field v-model="name" label="Name"></v-text-field>
                </div>
                <div class="mb-3">
                    <v-select v-model="machineTypeId" :items="machineTypes" item-text="name" item-value="id"
                        label="Machine Type"></v-select>
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
import { MachineModelAddAttributes } from '@/models/machinemodel.js'
import { MachineType } from '@/models/machinetype'
import { get, update, create } from '@/services/machinemodel.service'
import { getAll } from '@/services/machinetype.service'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MachineModelForm",
    data() {
        return {
            name: '',
            machineTypeId: 0,
            machineTypes: new Array<MachineType>(),
            error: "",
            snackbar: false
        }
    },
    async mounted() {
        try {
            if (this.$route.params.id) {

                const machinemodel = await get(Number(this.$route.params.id))
                this.name = machinemodel.name
            }
            this.machineTypes = await getAll()
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
        }
    },
    methods: {
        async submit() {
            try {
                const data = {
                    name: this.name,
                    machineTypeId: this.machineTypeId,
                } as MachineModelAddAttributes;
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
                    await this.$router.push('/machine-models')
                }
            }
        }
    }
})
</script>