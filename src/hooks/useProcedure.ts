import { procedureService } from "@/services/procedure.service"
import { useQuery } from "@tanstack/react-query"

export function useProcedure() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['procedures'],
		queryFn: () => procedureService.getProcedures()
	})

	return { data, isLoading, isSuccess }
}
