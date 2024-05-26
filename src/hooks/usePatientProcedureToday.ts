import { patientProcedureService } from "@/services/patientProcedure.service";
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';

export function usePatientProcedureToday(id: string, date: moment.Moment | null, enabled: boolean) {
  const formattedDate = date ? date.format('YYYY-MM-DD') : null;
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['patientProceduresToday', { id, date: formattedDate }],
    queryFn: () => patientProcedureService.getPatientProceduresByDate(id, formattedDate),
    enabled: enabled && !!date,
  });

  return { data, isLoading, isSuccess };
}
