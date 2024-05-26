import { Button, DatePicker, Modal } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

import Loader from '@/components/Loader'

import { usePatientProcedureToday } from '@/hooks/usePatientProcedureToday'

import TimeReceptionList from './TimeReceptionList'

interface TimeReceptionModalProps {
	id: string
}

const TimeReceptionModal = ({ id }: TimeReceptionModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null)
	const { data } = usePatientProcedureToday(id, selectedDate, isModalOpen)

	const sortedTimes =
		data?.data
			?.map((item: any) => ({
				id: item.id,
				appointmentDate: item.appointmentDate,
				appointmentTime: item.appointmentTime
			}))
			.sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime)) ?? []

	const handleOpenModal = () => {
		if (selectedDate) {
			setIsModalOpen(true)
		} else {
			alert('Будь ласка, виберіть дату для запису.')
		}
	}

	const handleCloseModal = () => setIsModalOpen(false)

	const handleDateChange = (date: moment.Moment | null) => {
		setSelectedDate(date)
	}

	return (
		<div>
			<DatePicker
				onChange={handleDateChange}
				disabledDate={current =>
					current &&
					(current < moment().startOf('day') ||
						current > moment().add(3, 'days').endOf('day'))
				}
			/>
			<Button
				className='ml-4'
				type='primary'
				onClick={handleOpenModal}
				disabled={!selectedDate}
			>
				Записатись
			</Button>
			<Modal
				title='Запис'
				open={isModalOpen}
				onCancel={handleCloseModal}
				footer={null}
			>
				{data ? (
					<TimeReceptionList
						times={sortedTimes}
						procedureId={id}
					/>
				) : (
					<Loader />
				)}
			</Modal>
		</div>
	)
}

export default TimeReceptionModal
