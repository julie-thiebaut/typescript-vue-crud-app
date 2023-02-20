import { Connection, ConnectionAddAttributes } from "@/models/connection";
import { getCookie } from "@/utils/http-common";
import axios from "axios";

export async function getAll(): Promise<Connection[]> {
    const token = getCookie("jwt")
    const response = await axios.get('/connections', {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function get(id: number): Promise<Connection> {
    const token = getCookie("jwt")
    const response = await axios.get(`/connections/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function create(data: ConnectionAddAttributes): Promise<Connection> {
    const token = getCookie("jwt")
    const response = await axios.post("/connections", data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function update(id: number, data: ConnectionAddAttributes): Promise<Connection> {
    const token = getCookie("jwt")
    return axios.put(`/connections/${id}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function remove(id: number): Promise<boolean> {
    const token = getCookie("jwt")
    return axios.delete(`/connections/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}