import { Button, Form, Input } from 'antd'
import React from 'react'

import { IMessageSend } from '@/types/message.types'

import { useCreateMessage } from '@/hooks/useCreateMessage'
import { toast } from 'sonner'

const AddMessageForm = ({ onClose }: any) => {
	const [form] = Form.useForm()
	const { createMessage } = useCreateMessage()

	const onFinish = async (message: IMessageSend) => {
		try {
			createMessage(message)
			form.resetFields()
			toast.success('Повідомлення успішно надіслано!')
			onClose()
		} catch (error) {
			console.error('Помилка при надсиланні повідомлення:', error)
		}
	}

	return (
		<Form
			form={form}
			onFinish={onFinish}
		>
			<Form.Item
				name='receiverEmail'
				label='Електронна адреса отримувача'
				rules={[
					{
						type: 'email',
						message: 'Будь ласка, введіть дійсну електронну адресу!'
					},
					{
						required: true,
						message: 'Будь ласка, введіть електронну адресу отримувача!'
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='messageContent'
				label='Вміст повідомлення'
				rules={[
					{ required: true, message: 'Будь ласка, введіть вміст повідомлення!' }
				]}
			>
				<Input.TextArea />
			</Form.Item>
			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
				>
					Надіслати
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddMessageForm
