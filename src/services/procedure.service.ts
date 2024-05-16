import { IProcedure } from '@/types/procedure.type'

import { axiosWithAuth } from '@/api/interceptors'

interface IProcedureResponse {
	data: IProcedure[]
}

class ProcedureService {
	private ROOT_URL = '/procedure/'

	async getProcedures() {
		const response = await axiosWithAuth.get<IProcedureResponse>(
			`${this.ROOT_URL}get`
		)
		return response.data
	}

    async getTodayProcedureById(id: string) {
        const response = await axiosWithAuth.get<IProcedureResponse>(
            `${this.ROOT_URL}getTodayProcedureById/${id}`
        )
        return response.data
    }

	async addProcedure(procedure: IProcedure) {
		await axiosWithAuth.post(`${this.ROOT_URL}add`, procedure)
	}

	async updateProcedure(procedure: IProcedure) {
		await axiosWithAuth.patch(`${this.ROOT_URL}update`, procedure)
	}

	async deleteProcedure(id: string) {
		await axiosWithAuth.delete(`${this.ROOT_URL}delete/${id}`)
	}

	async rateProcedure(id: string, rating: number) {
		await axiosWithAuth.patch(`${this.ROOT_URL}rate/${id}`, { rating })
	}
}

export const procedureService = new ProcedureService()
