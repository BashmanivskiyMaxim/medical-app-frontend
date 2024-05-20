import { IDoctorDetails } from './doctor.types'
import { IProcedure, IProcedureForPatient } from './procedure.type'

export interface IPatientProcedure {
	id?: string
	procedureName?: string
	procedureDescription?: string
	averageRating?: number
	doctor: string
	patient: string
}

export interface IPatientProcedureResponse {
	patientProcedures: IPatientProcedure[]
	message: string
}

export interface ITimes {
	id: string
	procedureTime: string
}

export interface IPatientProcedureTimes {
	data: ITimes[]
}

export interface IPatientProcedurePickResponse {
	id: string
	patientId: string
}

export interface ProcedureReport {
	report: {
		report: string
	}
}

export interface ProcedureForPatient {
	doctor: IDoctorDetails
	procedure: IProcedureForPatient
	procedureDate: string
	updateDate: string
	appointmentTime: string
	report: ProcedureReport
	rating: number
}
