import { MachineType, MachineTypeAddAttributes } from "@/models/machinetype";
import { getCookie } from "@/utils/http-common";
import axios from "axios";

export async function getAll(): Promise<MachineType[]> {
    const token = getCookie("jwt")
    const response = await axios.get('/machine-types', {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function get(id: number): Promise<MachineType> {
    const token = getCookie("jwt")
    const response = await axios.get(`/machine-types/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function create(data: MachineTypeAddAttributes): Promise<MachineType> {
    const token = getCookie("jwt")
    const response = await axios.post("/machine-types", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function update(id: number, data: MachineTypeAddAttributes): Promise<MachineType> {
    const token = getCookie("jwt")
    return axios.put(`/machine-types/${id}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function remove(id: number): Promise<boolean> {
    const token = getCookie("jwt")
    return axios.delete(`/machine-types/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}