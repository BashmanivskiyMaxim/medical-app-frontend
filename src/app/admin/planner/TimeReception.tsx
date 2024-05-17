'use client'

import { useMutation } from '@tanstack/react-query'
import { Button, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'

import { patientProcedureService } from '@/services/patientProcedure.service'
import { toast } from 'sonner'

interface TimeReceptionProps {
	date: string
	id: string
	active: boolean
}

const TimeReception = ({ date, id, active }: TimeReceptionProps) => {
	const currentTime = moment()
	const buttonTime = moment(date, 'HH:mm')
	const isTimePassed = currentTime.isBefore(buttonTime.add(30, 'minutes'))
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (id: string) =>
			patientProcedureService.pickPatientProcedureTime(id),
		onSuccess() {
			toast.success('Ви успішно записались на процедуру!')
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	return (
		<>
			<Button
				onClick={() => mutate(id)}
				disabled={active || isTimePassed}
				style={isTimePassed ? { color: 'gray' } : {}}
			>
				{date}
			</Button>
		</>
	)
}

export default TimeReception
