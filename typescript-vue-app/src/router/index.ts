import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Users from '../views/Users.vue'
import Machines from '../views/machines/Machines.vue'
import Connections from '../views/connections/Connections.vue'
import ConnectionForm from '../views/connections/ConnectionForm.vue'
import MachineForm from '../views/machines/MachineForm.vue'
import MachineTypeForm from '../views/machine-types/MachineTypeForm.vue'
import MachineTypes from '../views/machine-types/MachineTypes.vue'
import MachineModels from '../views/machine-models/MachineModels.vue'
import MachineModelForm from '../views/machine-models/MachineModelForm.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '',
    component: Layout,
    children: [
      { path: '/', redirect: '/machines' },
      { path: '/machines', component: Machines },
      { path: '/users', component: Users },
      { path: '/connections', component: Connections },
      { path: '/connections/create', component: ConnectionForm },
      { path: '/connections/:id/edit', component: ConnectionForm },
      { path: '/machines/create', component: MachineForm },
      { path: '/machines/:id/edit', component: MachineForm },
      { path: '/machine-types', component: MachineTypes },
      { path: '/machine-types/create', component: MachineTypeForm },
      { path: '/machine-types/:id/edit', component: MachineTypeForm },
      { path: '/machine-models', component: MachineModels },
      { path: '/machine-models/create', component: MachineModelForm },
      { path: '/machine-models/:id/edit', component: MachineModelForm },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
