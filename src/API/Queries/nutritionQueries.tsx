import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateNutrition, getNutrition } from "../requests"
import { User } from "Types/users"
import type { Nutrition } from "Types/nutrition";

export const useNutritionQuery = (user: User, date: string) => {
    return (useQuery({
            queryKey: ["nutrition"],
            queryFn: () => getNutrition(user, date),
        })
    );
};
export const useNutritionMutation = (user: User, date: string, body: Nutrition) => {
    const queryClient = useQueryClient();
    return (useMutation({
            mutationFn: async () => await updateNutrition(user, date, body),
            onSuccess: async () => await queryClient.invalidateQueries({
                queryKey: ['nutrition'],
                exact: true,
            })
        })
    );
};