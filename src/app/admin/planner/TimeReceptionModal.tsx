'use client'

import { Button, Modal } from 'antd'
import React, { useState } from 'react'

import TimeReceptionList from './TimeReceptionList'

const TimeReceptionModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	return (
		<div>
			<Button
				type='primary'
				onClick={showModal}
			>
				Записатись
			</Button>
			<Modal
				title='Запис'
				open={isModalOpen}
				onCancel={handleCancel}
                footer={null}
			>
				<TimeReceptionList
					times={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']}
				/>
			</Modal>
		</div>
	)
}

export default TimeReceptionModal
