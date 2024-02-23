declare type Medication = {
	morning: boolean;
	night: boolean;
};
declare type BloodPressureReading = {
	sys: number;
	dias: number;
};
declare type BloodPressure = BloodPressureReading[];

interface Medical {
	oxygen?: string;
	heartRate?: number[];
	bloodPressure?: BloodPressure;
	bloodGlucose?: number[];
	medication?: Medication;
}


export {
	Medical,
	Medication,
	BloodPressure,
};
