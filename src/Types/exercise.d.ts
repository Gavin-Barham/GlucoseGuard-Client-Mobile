declare type Sleep = {
	morning?: string | null;
	night?: string | null;
};

interface Exercise {
	weight?: number;
	dailySteps?: number;
	miles?: number;
	calsBurned?: number;
	sleep?: Sleep;
}


export {
	Exercise,
	Sleep,
};
