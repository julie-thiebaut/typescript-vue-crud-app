<template>
    <v-card outlined>
        <div class="my-5 pr-5 d-flex" style="width:100%; justify-content: end;">
            <v-btn :href="`/machine-types/create`" color="primary" elevation="2">Add a machine type</v-btn>
        </div>
        <v-simple-table class="mx-3" fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left"> # </th>
                        <th class="text-left"> Name </th>
                        <th class="text-left"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="machineType in machineTypes.slice((page - 1) * perPage, page * perPage)"
                        :key="machineType.id">
                        <td>{{ machineType.id }}</td>
                        <td>{{ machineType.name }}</td>
                        <td>
                            <v-btn icon small class="mr-2" :href="`/machine-types/${machineType.id}/edit`">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon small @click="remove(machineType.id)">
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
import { MachineType } from '@/models/machinetype';
import { getAll, remove } from '@/services/machinetype.service'
import { defineComponent } from 'vue';

export default defineComponent({
    name: "MachineTypesVue",
    data() {
        return {
            machineTypes: new Array<MachineType>(),
            page: 1,
            perPage: 10,
            lastPage: 0,
            error: "",
            snackbar: false
        }
    },
    async mounted() {
        try {
            this.machineTypes = await getAll();
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
        this.lastPage = Math.ceil(this.machineTypes.length / this.perPage)
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
                    this.snackbar = true;
                }

                this.machineTypes = this.machineTypes.filter(m => m.id !== id)
            }
        },
    }
})

</script>