import { useQuery } from "@tanstack/react-query"
import { createDay, getDay } from "../requests"
import { User } from "Types/users"

export const useDayQuery = (user: User, date: string) => {
    return (useQuery({
            queryKey: ["day"],
            queryFn: () => {
                createDay(user, date);
                return getDay(user, date)
            },
        })
    );
};