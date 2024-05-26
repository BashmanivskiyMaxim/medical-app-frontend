import {
	IPatientProcedurePickResponse,
	IPatientProcedureTimes,
	ProcedureForPatient
} from '@/types/patientProcedure.types'

import { axiosWithAuth } from '@/api/interceptors'

class PatientProcedureService {
	private ROOT_URL = '/patientProcedure/'

	async getPatientProceduresByDate(
		id: string,
		date: string | null
	): Promise<IPatientProcedureTimes> {
		try {
			const response = await axiosWithAuth.get<IPatientProcedureTimes>(
				`${this.ROOT_URL}todayProcedures/${id}`,
				{
					params: { date }
				}
			)
			return response.data
		} catch (error: any) {
			throw new Error(error.response.data.message)
		}
	}

	async getPatientProceduresByPatientId() {
		try {
			const response = await axiosWithAuth.get<{ data: ProcedureForPatient[] }>(
				`${this.ROOT_URL}getMyProcedures`
			)
			return response.data.data
		} catch (error: any) {
			throw new Error(error.response.data.message)
		}
	}

	async pickPatientProcedureTime(id: string) {
		try {
			const response = await axiosWithAuth.patch<IPatientProcedurePickResponse>(
				`${this.ROOT_URL}pickByPatient/${id}`
			)
			return response.data
		} catch (error: any) {
			if (error.response && error.response.status === 409) {
				throw new Error('Неможливо записатися на дві різні процедури одночасно')
			}
			throw error
		}
	}

	async rateProcedure(id: string, rating: number) {
		try {
			await axiosWithAuth.patch(`${this.ROOT_URL}rate/${id}`, {
				rating
			})
		} catch (error: any) {
			throw new Error(error.response.data.message)
		}
	}

	async scheduleMyDay() {
		try {
			await axiosWithAuth.patch(`${this.ROOT_URL}scheduleMyDay`)
		} catch (error: any) {
			throw new Error(error.response.data.message)
		}
	}

	async cancelPatientProcedure(id: string) {
		try {
			await axiosWithAuth.patch(`${this.ROOT_URL}cancel/${id}`)
		} catch (error: any) {
			throw new Error(error.response.data.message)
		}
	}
}

export const patientProcedureService = new PatientProcedureService()
