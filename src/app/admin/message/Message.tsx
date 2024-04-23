'use client'

import { List, Typography } from 'antd'
import { format } from 'date-fns'
import React from 'react'

import Loader from '@/components/Loader'

import { useMessages } from '@/hooks/useMessages'

const { Text } = Typography

const Message = () => {
	const { data, isLoading } = useMessages()

	if (isLoading) {
		return <Loader />
	}

	if (!data?.data || !Array.isArray(data?.data)) {
		return <div>No data available</div>
	}

	return (
		<List
			itemLayout='horizontal'
			dataSource={data?.data}
			renderItem={item => (
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
				</List.Item>
			)}
		/>
	)
}

export default Message
