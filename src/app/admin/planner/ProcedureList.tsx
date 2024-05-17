'use client'

import { Card, Col, Row } from 'antd'
import React from 'react'

import Loader from '@/components/Loader'

import { useProcedure } from '@/hooks/useProcedure'

import ProcedureItem from './ProcedureItem'

const ProcedureList: React.FC = () => {
	const { data, isLoading } = useProcedure()
	if (isLoading) {
		return <Loader />
	}
	return (
		<>
			<Row gutter={[16, 16]} className='mt-6'>
				{data?.data.map((procedure, index) => (
					<Col
						span={6}
						key={index}
					>
						<ProcedureItem
							id={procedure.id || '0'}
							procName={procedure.procedureName || "Процедура"}
							procDesc={procedure.procedureDescription || "Опис процедури"}
							averageRating={procedure.averageRating || 0}
							specialty={procedure.doctor.specialty || 'Лікар'}
                            qualification={procedure.doctor.qualification || 'Кваліфікація'}
						/>
					</Col>
				))}
			</Row>
		</>
	)
}

export default ProcedureList
