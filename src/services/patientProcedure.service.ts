import { axiosWithAuth } from "@/api/interceptors"
import { IPatientProcedurePickResponse, IPatientProcedureTimes } from "@/types/patientProcedure.types"



class PatientProcedureService {
    private ROOT_URL = '/patientProcedure/'

    async getTodayPatientProceduresById(id: string) {
        const response = await axiosWithAuth.get<IPatientProcedureTimes>(
            `${this.ROOT_URL}todayProcedures/${id}`
        )
        return response.data
    }

    async pickPatientProcedureTime(id: string) {
        const response = await axiosWithAuth.patch<IPatientProcedurePickResponse>(
            `${this.ROOT_URL}pickByPatient/${id}`
        )
        return response.data
    
    }
}

export const patientProcedureService = new PatientProcedureService()
