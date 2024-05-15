'use client'

import { Card, Col, Row, Typography } from 'antd'
import { format } from 'date-fns'
import React from 'react'

import Loader from '@/components/Loader'

import { useProfile } from '@/hooks/useProfile'

const { Title } = Typography

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
		<Card title={<Title level={2}>Профіль</Title>}>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Унікальне ім'я:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{data?.data.username}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Email:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{data?.data.email}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Імя:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{data?.data.firstName}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Прізвище:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{data?.data.lastName}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Тип акаунту:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{data?.data.accountType}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Дата реєстрації:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{formattedCreateDate}</Title>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={6}>
							<Title level={3}>Дата останнього входу:</Title>
						</Col>
						<Col span={18}>
							<Title level={4}>{formattedLastLogin}</Title>
						</Col>
					</Row>
				</Col>
			</Row>
		</Card>
	)
}

export default Profile
