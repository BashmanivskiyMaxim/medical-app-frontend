'use client'

import { Card, Col, Row, Typography } from 'antd'
import { format } from 'date-fns'
import React from 'react'

import Loader from '@/components/Loader'

import { useProfile } from '@/hooks/useProfile'

const { Title, Text } = Typography

const Profile = () => {
	const { data, isLoading } = useProfile()

	if (isLoading) {
		return <Loader />
	}
	const formattedCreateDate = data?.data.createDate
		? format(new Date(data?.data.createDate), 'yyyy-MM-dd HH:mm:ss')
		: 'No date'
	const formattedLastLogin = data?.data.lastLogin
		? format(new Date(data?.data.lastLogin), 'yyyy-MM-dd HH:mm:ss')
		: 'No date'

	return (
		<Card title='Ваш профіль'>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Username:</Title>
						</Col>
						<Col span={18}>
							<Text>{data?.data.username}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Email:</Title>
						</Col>
						<Col span={18}>
							<Text>{data?.data.email}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Імя:</Title>
						</Col>
						<Col span={18}>
							<Text>{data?.data.firstName}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Прізвище:</Title>
						</Col>
						<Col span={18}>
							<Text>{data?.data.lastName}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Тип акаунту:</Title>
						</Col>
						<Col span={18}>
							<Text>{data?.data.accountType}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Дата реєстрації:</Title>
						</Col>
						<Col span={18}>
							<Text>{formattedCreateDate}</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={4}>Дата останнього входу:</Title>
						</Col>
						<Col span={18}>
							<Text>{formattedLastLogin}</Text>
						</Col>
					</Row>
				</Col>
			</Row>
		</Card>
	)
}

export default Profile
