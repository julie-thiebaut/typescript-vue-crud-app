import { MachineModel, MachineModelAddAttributes } from "@/models/machinemodel";
import { getCookie } from "@/utils/http-common";
import axios from "axios";

export async function getAll(query: string | undefined): Promise<MachineModel[]> {
    const token = getCookie("jwt")
    let url = '/machine-models';
    if (query) {
        url += query;
    }
    const response = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function get(id: number): Promise<MachineModel> {
    const token = getCookie("jwt")
    const response = await axios.get(`/machine-models/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function create(data: MachineModelAddAttributes): Promise<MachineModel> {
    const token = getCookie("jwt")
    const response = await axios.post("/machine-models", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function update(id: number, data: MachineModelAddAttributes): Promise<MachineModel> {
    const token = getCookie("jwt")
    return axios.put(`/machine-models/${id}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function remove(id: number): Promise<boolean> {
    const token = getCookie("jwt")
    return axios.delete(`/machine-models/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}