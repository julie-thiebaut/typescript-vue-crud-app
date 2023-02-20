import { User, UserAddAttributes } from "@/models/user";
import { getCookie } from "@/utils/http-common";
import axios from "axios";

export async function getAll(): Promise<User[]> {
    const token = getCookie("jwt")
    const response = await axios.get('/users', {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function get(id: string): Promise<User> {
    const token = getCookie("jwt")
    const response = await axios.get(`/users/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function auth(): Promise<User> {
    const token = getCookie("jwt")
    const response = await axios.get(`/users/auth`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

export async function register(data: UserAddAttributes): Promise<User> {
    const response = await axios.post("/register", data);
    return response.data.data;
}

export async function login(data: UserAddAttributes): Promise<User> {
    const response = await axios.post("/login", data);
    return response.data.data;
}

export async function update(id: string, data: UserAddAttributes): Promise<User> {
    const token = getCookie("jwt")
    return axios.put(`/users/${id}`, data, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function remove(id: string): Promise<boolean> {
    const token = getCookie("jwt")
    return axios.delete(`/users/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}