import { useQuery } from "@tanstack/react-query"
import { getDay } from "../requests"
import { User } from "Types/users"

export const useDayQuery = (user: User, date: string) => {
    return (useQuery({
            queryKey: ["day"],
            queryFn: () => getDay(user, date),
        })
    );
};
// export const useDayMutation = (user: User, date: string) => {
//     const queryClient = useQueryClient();
//     return (useMutation({
//             mutationFn: async () => await createDay(user, date),
//             onSuccess: async () => await queryClient.invalidateQueries({
//                 queryKey: ['day'],
//                 exact: true,
//             })
//         })
//     );
// };