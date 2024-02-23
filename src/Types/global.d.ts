export interface APIResponse {
    ok: boolean;
    message: string;
}
export interface Day {
    date: string,
    medical: Medical
    nutrition: Nutrition
    exercise: Exercise
}