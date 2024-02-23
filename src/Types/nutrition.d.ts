declare type Meal = {
	cal: number;
	time: string;
	food: string;
};

interface Nutrition {
	breakfast?: Meal;
	lunch?: Meal;
	dinner?: Meal;
	snacks?: Meal[];
}


export {
	Nutrition,
	Meal,
};
