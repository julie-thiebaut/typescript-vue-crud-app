<template>
    <v-card outlined>
        <div class="my-5 px-10 d-flex" style="width:100%; justify-content: end;">
            <v-select class="pr-10" @change="filterByType()" v-model="selectedType" :items="types" label="Type"></v-select>
            <v-btn :href="`/machine-models/create`" color="primary" elevation="2">Add a machine model</v-btn>
        </div>
        <v-simple-table class="mx-3" fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left"> # </th>
                        <th class="text-left"> Type </th>
                        <th class="text-left"> Name </th>
                        <th class="text-left"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="machineModel in machineModels.slice((page - 1) * perPage, page * perPage)"
                        :key="machineModel.id">
                        <td>{{ machineModel.id }}</td>
                        <td>{{ machineModel.type.name }}</td>
                        <td>{{ machineModel.name }}</td>
                        <td>
                            <v-btn icon small class="mr-2" :href="`/machine-models/${machineModel.id}/edit`">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon small @click="remove(machineModel.id)">
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
import _ from 'lodash';
import { MachineModel } from '@/models/machinemodel';
import { getAll, remove } from '@/services/machinemodel.service'
import { defineComponent } from 'vue';

export default defineComponent({
    name: "MachineModelsVue",
    data() {
        return {
            machineModels: new Array<MachineModel>(),
            page: 1,
            perPage: 10,
            lastPage: 0,
            error: "",
            snackbar: false,
            selectedType: "",
            types: [] as string[],
        }
    },
    async mounted() {
        try {
            this.machineModels = await getAll("");
            this.types = _.map(this.machineModels, 'type.name');
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
        this.lastPage = Math.ceil(this.machineModels.length / this.perPage)
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

                this.machineModels = this.machineModels.filter(m => m.id !== id)
            }
        },
        async filterByType() {
            try {
                this.machineModels = await getAll("?type=" + this.selectedType);
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
    }
})

</script>