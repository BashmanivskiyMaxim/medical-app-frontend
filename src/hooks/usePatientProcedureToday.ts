import { patientProcedureService } from "@/services/patientProcedure.service";
import { useQuery } from "@tanstack/react-query"

export function usePatientProcedureToday(id: string, enabled: boolean) {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['patientProceduresToday', { id }],
        queryFn: () => patientProcedureService.getTodayPatientProceduresById(id),
        enabled,
    });

    return { data, isLoading, isSuccess };
}
