import axios from "axios";

export const APIManager = axios.create({ 
    baseURL: "https://www.health-tracker-api.com",
    responseType: "json",
    headers: { 'Content-Type': 'application/json' },
});