'use client'

import { Button, Modal } from 'antd'
import React, { useState } from 'react'

import AddMessageForm from './AddMessage'

const FormMessage = () => {
	const [modalVisible, setModalVisible] = useState(false)

	const handleOpenModal = () => {
		setModalVisible(true)
	}

	const handleCloseModal = () => {
		setModalVisible(false)
	}

	return (
		<>
			<Button
				className='mt-4'
				type='primary'
				onClick={handleOpenModal}
			>
				Написати нове повідомлення
			</Button>
			<Modal
				title='Нове повідомлення'
				open={modalVisible}
				onCancel={handleCloseModal}
				footer={null}
			>
				<AddMessageForm onClose={handleCloseModal} />{' '}
			</Modal>
		</>
	)
}

export default FormMessage
