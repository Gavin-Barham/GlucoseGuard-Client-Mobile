import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateExercise, getExercise } from "../requests"
import { User } from "Types/users"
import type { Exercise } from "Types/exercise";

export const useExerciseQuery = (user: User, date: string) => {
    return (useQuery({
            queryKey: ["exercise"],
            queryFn: () => getExercise(user, date),
        })
    );
};
export const useExerciseMutation = (user: User, date: string, body: Exercise) => {
    const queryClient = useQueryClient();
    return (useMutation({
            mutationFn: async () => await updateExercise(user, date, body),
            onSuccess: async () => await queryClient.invalidateQueries({
                queryKey: ['exercise'],
                exact: true,
            })
        })
    );
};