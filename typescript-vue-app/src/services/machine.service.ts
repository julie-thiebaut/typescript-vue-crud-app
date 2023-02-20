import { Machine, MachineAddAttributes } from "@/models/machine";
import { getCookie } from "@/utils/http-common";
import axios from "axios";

export async function getAll(query: string | undefined): Promise<Machine[]> {
    const token = getCookie("jwt")
    let url = '/machines';
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

export async function get(id: number): Promise<Machine> {
    const token = getCookie("jwt")
    const response = await axios.get(`/machines/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function create(data: MachineAddAttributes): Promise<Machine> {
    const token = getCookie("jwt")
    const response = await axios.post("/machines", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function update(id: number, data: MachineAddAttributes): Promise<Machine> {
    const token = getCookie("jwt")
    return axios.put(`/machines/${id}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function remove(id: number): Promise<boolean> {
    const token = getCookie("jwt")
    return axios.delete(`/machines/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}