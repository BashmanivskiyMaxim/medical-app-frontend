'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Loader from '@/components/Loader'

import { ProcedureForPatient } from '@/types/patientProcedure.types'

import { usePatientProceduresForPatient } from '@/hooks/usePatientProceduresForPatient'

import PastProcedures from './pastProcedures'
import TodayProcedures from './todayProcedures'
import { patientProcedureService } from '@/services/patientProcedure.service'

const ProceduresList: React.FC = () => {
	const queryClient = useQueryClient()
	const { data, isLoading } = usePatientProceduresForPatient()
	const [todayProcedures, setTodayProcedures] = useState<ProcedureForPatient[]>(
		[]
	)
	const [pastProcedures, setPastProcedures] = useState<ProcedureForPatient[]>(
		[]
	)

	useEffect(() => {
		if (data && Array.isArray(data)) {
			const today = dayjs().format('YYYY-MM-DD')

			const todayOrFutureProcs = data.filter(
				(procedure: ProcedureForPatient) =>
					dayjs(procedure.procedureDate).format('YYYY-MM-DD') > today
			)
			const pastProcs = data.filter(
				(procedure: ProcedureForPatient) =>
					dayjs(procedure.procedureDate).format('YYYY-MM-DD') < today
			)

			setTodayProcedures(todayOrFutureProcs)
			setPastProcedures(pastProcs)
		}
	}, [data])

	const { mutate: scheduleDay } = useMutation({
		mutationKey: ['scheduleMyDay'],
		mutationFn: () => patientProcedureService.scheduleMyDay(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['patientProcedures']
			})
			toast.success('День успішно заплановано!')
		},
		onError: (error: any) => {
			toast.error(
				error.message || 'Не вдалося запланувати день. Спробуйте пізніше.'
			)
		}
	})

	const handleScheduleMyDay = () => {
		scheduleDay()
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className='container mx-auto'>
			<Button
				onClick={handleScheduleMyDay}
				className='btn btn-primary mb-4'
				//disabled={todayProcedures.length > 0}
			>
				Запланувати мій день
			</Button>
			<TodayProcedures procedures={todayProcedures} />
			<PastProcedures procedures={pastProcedures} />
		</div>
	)
}

export default ProceduresList
