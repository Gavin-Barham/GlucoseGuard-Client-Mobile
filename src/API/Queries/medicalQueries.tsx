import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateMedical, getMedical } from "../requests"
import { User } from "Types/users"
import { Medical } from "Types/medical";

export const useMedicalQuery = (user: User, date: string) => {
    return (useQuery({
            queryKey: ["medical"],
            queryFn: () => getMedical(user, date),
        })
    );
};
export const useMedicalMutation = (user: User, date: string, body: Medical) => {
    const queryClient = useQueryClient();
    return (useMutation({
            mutationFn: async () => await updateMedical(user, date, body),
            onSuccess: async () => await queryClient.invalidateQueries({
                queryKey: ['medical'],
                exact: true,
            })
        })
    );
};