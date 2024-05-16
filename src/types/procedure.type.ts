import { IDoctor } from './doctor.types'

export interface IProcedure {
	id?: string
	procedureName?: string
	procedureDescription?: string
	averageRating?: number
	doctor: IDoctor
}
