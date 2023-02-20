<template>
    <v-card outlined>
        <div class="my-5 px-10 d-flex" style="width:100%; justify-content: end;">
            <v-select class="pr-5" @change="filterByState()" v-model="selectedState" :items="states"
                label="State"></v-select>
            <v-select @change="filterByType()" v-model="selectedType" :items="types" label="Type"></v-select>
        </div>
        <v-data-table :headers="machineHeaders" :items="machines" :single-expand="false" :expanded.sync="expanded"
            item-key="name" show-expand class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Machines</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn :href="`/machines/create`" color="primary" elevation="2">Add a machine</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <ul style="margin-top:1rem;">
                        <li v-for="connection in item.connections" :key="connection.id">Connected to machine {{
                            connection.connectedToMachineId }} from {{ connection.startDate }}<span
                                v-if="connection.endDate"> to {{ connection.endDate }}</span>
                        </li>
                    </ul>
                </td>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" :href="`/machines/${item.id}/edit`">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="remove(item.id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
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

import axios from 'axios';
import _ from 'lodash';
import { Machine } from '@/models/machine'
import { getAll, remove } from '@/services/machine.service'
import { defineComponent } from 'vue';

export default defineComponent({
    name: "MachinesVue",
    data() {
        return {
            machines: new Array<Machine>(),
            page: 1,
            perPage: 10,
            lastPage: 0,
            error: "",
            snackbar: false,
            expanded: [],
            states: [] as string[],
            selectedState: "",
            types: [] as string[],
            selectedType: "",
            singleExpand: false,
            machineHeaders: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Model', value: 'model.type.name' },
                { text: 'MAC', value: 'mac' },
                { text: 'State', value: 'state' },
                { text: 'Actions', value: 'actions' },
                { text: '', value: 'data-table-expand' },
            ]
        }
    },
    async mounted() {
        try {
            this.machines = await getAll("");
            this.states = _.map(this.machines, 'state');
            this.types = _.map(this.machines, 'model.type.name');
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
        this.lastPage = Math.ceil(this.machines.length / this.perPage)
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

                this.machines = this.machines.filter(m => m.id !== id)
            }
        },
        async filterByState() {
            try {
                this.machines = await getAll("?state=" + this.selectedState);
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
        },
        async filterByType() {
            try {
                this.machines = await getAll("?type=" + this.selectedType);
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