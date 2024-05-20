import { IUserDoctor } from './auth.types'

export interface IDoctor {
	id: string
	specialty: string
	qualification: string
}

export interface IDoctorDetails extends IDoctor {
	account: IUserDoctor
}
