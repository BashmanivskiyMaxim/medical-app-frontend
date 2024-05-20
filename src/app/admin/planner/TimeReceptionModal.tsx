import { Button, Modal } from 'antd'
import React, { useState } from 'react'

import Loader from '@/components/Loader'

import { usePatientProcedureToday } from '@/hooks/usePatientProcedureToday'

import TimeReceptionList from './TimeReceptionList'

interface TimeReceptionModalProps {
	id: string
}

const TimeReceptionModal = ({ id }: TimeReceptionModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data } = usePatientProcedureToday(id, isModalOpen)

	const sortedTimes =
		data?.data
			?.map((item: any) => ({
				id: item.procedureTime.id,
				appointmentTime: item.procedureTime.appointmentTime
			}))
			.sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime)) ?? []	

	const handleOpenModal = () => setIsModalOpen(true)
	const handleCloseModal = () => setIsModalOpen(false)
	return (
		<div>
			<Button
				type='primary'
				onClick={handleOpenModal}
			>
				Записатись
			</Button>
			<Modal
				title='Запис'
				open={isModalOpen}
				onCancel={handleCloseModal}
				footer={null}
			>
				
				{data ? <TimeReceptionList times={sortedTimes} procedureId={id}/> : <Loader />}
			</Modal>
		</div>
	)
}

export default TimeReceptionModal
