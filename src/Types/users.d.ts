export interface User {
	id?: number;
	email?: string;
	fname?: string;
	lname?: string;
	height?: number;
	targetCal?: number;
	refreshToken?: string;
	isAuthenticated?: boolean;
  	accessToken?: string;
};