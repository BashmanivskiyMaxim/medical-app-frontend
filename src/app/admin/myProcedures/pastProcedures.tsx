import React from 'react'

import { ProcedureForPatient } from '@/types/patientProcedure.types'

import ProcedureItem from './ProcedureItem'

interface PastProceduresProps {
	procedures: ProcedureForPatient[]
}

const PastProcedures: React.FC<PastProceduresProps> = ({ procedures }) => {
	return (
		<div className='my-6'>
			<h2 className='text-2xl font-bold mb-4'>Минулі процедури</h2>
			{procedures.length === 0 ? (
				<p>Немає минулих процедур</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{procedures.map(procedure => (
						<ProcedureItem
							id={procedure.id}
							key={`${procedure.id}`}
							doctor={procedure.doctor}
							procedure={procedure.procedure}
							procedureDate={procedure.procedureDate}
							appointmentTime={procedure.appointmentTime}
							report={procedure.report.report}
							rating={procedure.rating}
							showCancelButton={false}
							isRatingDisabled={false}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default PastProcedures
