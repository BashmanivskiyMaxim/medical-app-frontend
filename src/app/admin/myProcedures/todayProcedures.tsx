import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

import { ProcedureForPatient } from '@/types/patientProcedure.types'

import ProcedureItem from './ProcedureItem'
import { patientProcedureService } from '@/services/patientProcedure.service'

interface TodayProceduresProps {
	procedures: ProcedureForPatient[]
}

const TodayProcedures: React.FC<TodayProceduresProps> = ({ procedures }) => {
	const queryClient = useQueryClient()

	const { mutate: cancelProcedure } = useMutation({
		mutationFn: (procedureId: string) =>
			patientProcedureService.cancelPatientProcedure(procedureId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['patientProcedures'] })
			toast.success('Запис успішно скасовано!')
		},
		onError: error => {
			toast.error('Не вдалося скасувати запис. Спробуйте пізніше.')
		}
	})

	console.log(procedures)

	const handleCancel = (procedureId: string) => {
		cancelProcedure(procedureId)
	}

	return (
		<div className='my-6'>
			<h2 className='text-2xl font-bold mb-4'>Майбутні процедури</h2>
			{procedures.length === 0 ? (
				<p>Немає запланованих процедур</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{procedures.map(procedure => (
						<ProcedureItem
							id={procedure.id}
							key={`${procedure.id}`}
							doctor={procedure.doctor}
							procedure={procedure.procedure}
							procedureDate={procedure.procedureDate}
							appointmentTime={procedure.appointmentTime}
							report={procedure.report.report}
							rating={procedure.rating}
							onCancel={handleCancel}
							showCancelButton={true}
							isRatingDisabled={true}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default TodayProcedures
