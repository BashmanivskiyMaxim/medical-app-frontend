import { Card, Rate } from 'antd'
import React from 'react'

import TimeReceptionModal from './TimeReceptionModal'

export interface ProcedureItemProps {
	id: string
	procName: string
	procDesc: string
	averageRating: number
	specialty: string
	qualification: string
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
	id,
	procName,
	procDesc,
	averageRating,
	specialty,
	qualification
}: ProcedureItemProps) => {
	return (
		<div className='flex justify-center my-4'>
			<Card
				title={<span className='text-xl font-semibold'>{procName}</span>}
				style={{ maxWidth: 400 }}
				className='shadow-lg p-6 m-4 rounded-lg border border-gray-200'
			>
				<p className='text-black mb-4'>{procDesc}</p>
				<div className='text-black mb-4'>
					<span className='font-bold'>Вподобання:</span>
					<div className='mt-2'>
						<Rate
							disabled
							defaultValue={averageRating}
						/>
					</div>
				</div>
				<p className='text-black mb-4'>
					<span className='font-bold'>Лікар:</span> {specialty}
				</p>
				<p className='text-black mb-4'>
					<span className='font-bold'>Кваліфікація:</span> {qualification}
				</p>
				<div className='mt-4'>
					<TimeReceptionModal id={id} />
				</div>
			</Card>
		</div>
	)
}

export default ProcedureItem
