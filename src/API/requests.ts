import type { User } from "Types/users";
import type { Medical } from "Types/medical";
import type { Nutrition } from "Types/nutrition";
import type { Exercise } from "Types/exercise";

import { APIManager } from "./APIManager";

interface DateRange {
    startDate: string;
    endDate: string;
}

// AUTH
const login = async (email: string, password: string) => {
    return (await APIManager.post('/authn/login', {
        email: email,
        password: password
    })).data
}
const register = async (email: string, password: string) => {
    return (await APIManager.post('/authn/register', {
        email: email,
        password: password
    })).data
}
const refreshAuth = async () => {
    return (await APIManager.get('/authn/refresh')).data
}

// DATA

// USER ENPOINTS
const getUser = async (user: User | undefined) => {
    return (await APIManager.post(`/users/${user?.id!}`,{ 
            headers: {
                Authorization: `Bearer ${user?.accessToken!}`,
            }
        }
    )).data;
}
const updateUser = async (user: User | undefined, body: User) => {
    return (await APIManager.put(`/users/${user?.id!}`, body, {
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).status;
}
const deleteUser = async (user: User | undefined) => {
    return (await APIManager.delete(`/users/${user?.id!}`, {
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).status;
}

// DAY/Range ENDPOINTS
const createDay = async (user: User | undefined, date: string) => {
    return (await APIManager.post(`/${user?.id!}/day`, {
            date
        }, { 
            headers: {
                Authorization: `Bearer ${user?.accessToken!}`,
            }
        }
    )).status;
}
const getDay = async (user: User | undefined, date: string) => {
    const res = await APIManager.get(`/${user?.id!}/day`, {
        params: {
            date
        },
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        },
        validateStatus: (status) => {
            return status >= 200 && status <= 404
        }
    });
    if (res.status === 404) {
        const createRes = await createDay(user, date);
        if (createRes === 200 || createRes === 201) {
            return (await APIManager.get(`/${user?.id!}/day`, {
                params: {
                    date
                },
                headers: {
                    Authorization: `Bearer ${user?.accessToken!}`,
                },
                validateStatus: (status) => {
                    return status >= 200 && status <= 404
                }
            })).data.day
        }
    }
    return res.data.day
}
const getDayRange = async (user: User | undefined, range: DateRange) => {
    return (await APIManager.get(`/${user?.id!}/range`, {
        params: {
            start: range.startDate,
            end: range.endDate,
        },
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).data.days;
}

// MEDICAL ENDPOINTS
const getMedical = async (user: User | undefined, date: string) => {
    return (await APIManager.get(`/${user?.id!}/medical`, {
        params: {
            date
        },
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).data.day;
}
const updateMedical = async (user: User | undefined, date: string, body: Medical) => {
    return (await APIManager.put(`/${user?.id!}/medical`, body, { 
            params: {
                date
            },
            headers: {
                Authorization: `Bearer ${user?.accessToken!}`,
            }
        }
    )).status;
}

// NUTRITION ENDPOINTS
const getNutrition = async (user: User | undefined, date: string) => {
    return (await APIManager.get(`/${user?.id!}/nutrition`, {
        params: {
            date
        },
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).data.day;
}
const updateNutrition = async (user: User | undefined, date: string, body: Nutrition) => {
    return (await APIManager.put(`/${user?.id!}/nutrition`, body, { 
            params: {
                date
            },
            headers: {
                Authorization: `Bearer ${user?.accessToken!}`,
            }
        }
    )).status;
}

// EXERCISE ENDPOINTS
const getExercise = async (user: User | undefined, date: string) => {
    return (await APIManager.get(`/${user?.id!}/exercise`, {
        params: {
            date
        },
        headers: {
            Authorization: `Bearer ${user?.accessToken!}`,
        }
    })).data.day;
}
const updateExercise = async (user: User | undefined, date: string, body: Exercise) => {
    return (await APIManager.put(`/${user?.id!}/exercise`, body, { 
            params: {
                date
            },
            headers: {
                Authorization: `Bearer ${user?.accessToken!}`,
            }
        }
    )).status;
}

export {
    register,
    login,
    refreshAuth,
    getUser,
    updateUser,
    deleteUser,
    getDay,
    createDay,
    getDayRange,
    getMedical,
    updateMedical,
    getNutrition,
    updateNutrition,
    getExercise,
    updateExercise,
}