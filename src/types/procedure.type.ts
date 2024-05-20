import { IDoctor } from './doctor.types'

export interface IProcedure {
	id: string
	procedureName: string
	procedureDescription: string
	averageRating: number
	doctor: IDoctor
}

export interface IProcedureForPatient
	extends Omit<IProcedure, 'averageRating' | 'doctor'> {}
