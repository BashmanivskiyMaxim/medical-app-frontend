

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