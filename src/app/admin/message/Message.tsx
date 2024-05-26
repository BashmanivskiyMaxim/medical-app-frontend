'use client'

import { DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, List, Typography } from 'antd'
import { format } from 'date-fns'
import React from 'react'
import { toast } from 'sonner'

import Loader from '@/components/Loader'

import { useMessages } from '@/hooks/useMessages'

import { messageService } from '@/services/message.service'

const { Text } = Typography

interface renderProps {
	item: any
	handleDelete: (id: string) => void
}

const renderItem = ({ item, handleDelete }: renderProps) => (
	<List.Item>
		<List.Item.Meta
			title={`Від: ${item.role}`}
			description={
				<>
					<Text strong>Повідомлення: </Text>
					{item.messageContent}
					<br />
					<Text strong>Дата: </Text>
					{format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss')}
				</>
			}
		/>
		<Button
			onClick={() => item.id && handleDelete(item.id)}
			type='primary'
			danger
			icon={<DeleteOutlined />}
		/>
	</List.Item>
)

const Message = () => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['message'],
		mutationFn: (data: string) => messageService.deleteMessageForReceiver(data),
		onSuccess() {
			toast.success('Повідомлення видалено!')
			queryClient.invalidateQueries({ queryKey: ['messages'] })
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const { data, isLoading } = useMessages()

	if (isLoading) {
		return <Loader />
	}

	const handleDelete = (id: string) => {
		if (id) {
			mutate(id)
		}
	}

	if (!data?.data || !Array.isArray(data?.data)) {
		return <p>Повідомлення відсутні</p>
	}

	return (
		<List
			locale={{ emptyText: 'Нових повідомлень не виявлено' }}
			itemLayout='horizontal'
			dataSource={data?.data}
			renderItem={item => renderItem({ item, handleDelete })}
		/>
	)
}

export default Message
