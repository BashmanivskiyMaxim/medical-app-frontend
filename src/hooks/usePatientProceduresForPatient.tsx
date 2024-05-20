import { useQuery } from '@tanstack/react-query'

import { patientProcedureService } from '@/services/patientProcedure.service'
import { ProcedureForPatient } from '@/types/patientProcedure.types'

export function usePatientProceduresForPatient() {
	const { data, isLoading, isSuccess } = useQuery<ProcedureForPatient[]>({
		queryKey: ['patientProcedures'],
		queryFn: () => patientProcedureService.getPatientProceduresByPatientId()
	})

	return { data, isLoading, isSuccess }
}
