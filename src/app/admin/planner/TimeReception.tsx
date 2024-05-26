'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, TimePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { patientProcedureService } from '@/services/patientProcedure.service'

interface TimeReceptionProps {
	date: string
	id: string
	active: boolean
	procedureId: string
	appointmentDate: string
}

const TimeReception = ({
	date,
	id,
	active,
	procedureId,
	appointmentDate
}: TimeReceptionProps) => {
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const currentTime = moment()
	const buttonTime = moment(`${appointmentDate} ${date}`, 'YYYY-MM-DD HH:mm')
	const isTimePassed = currentTime.isAfter(buttonTime.add(30, 'minutes'))
	const { mutate } = useMutation({
		mutationKey: ['pickPatientProcedureTime'],
		mutationFn: (id: string) =>
			patientProcedureService.pickPatientProcedureTime(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['patientProceduresToday', { id: procedureId }]
			})
			toast.success('Ви успішно записались на процедуру!')
		},
		onError(error) {
			toast.error(
				error.message ||
					'Не вдалося записатись на процедуру. Спробуйте пізніше.'
			)
		}
	})

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		mutate(id)
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<Button
				onClick={handleButtonClick}
				disabled={active || isTimePassed}
				style={isTimePassed ? { color: 'gray' } : {}}
			>
				{date}
			</Button>
			<Modal
				title='Попередження'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText='Скасувати'
				okText='Записатись'
			>
				<p>
					Якщо ви записані на процедуру на інший час в цей день, попередній ваш
					запис відміниться. Ви впевнені, що хочете продовжити?
				</p>
			</Modal>
		</>
	)
}

export default TimeReception
