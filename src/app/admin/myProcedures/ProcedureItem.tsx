import { patientProcedureService } from '@/services/patientProcedure.service'
import { useMutation } from '@tanstack/react-query'
import { Button, Card, Rate } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { toast } from 'sonner'

export interface ProcedureItemProps {
	id: string
	doctor: {
		specialty: string
		qualification: string
		account: {
			email: string
			firstName: string
			lastName: string
		}
	}
	procedure: {
		id: string
		procedureName: string
		procedureDescription: string
	}
	procedureDate: string
	appointmentTime: string
	report: {
		report: string
	}
	rating: number
	onCancel?: (procedureId: string) => void
	showCancelButton?: boolean
	isRatingDisabled?: boolean
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
	id,
	doctor,
	procedure,
	procedureDate,
	appointmentTime,
	report,
	rating,
	onCancel,
	showCancelButton = false,
	isRatingDisabled = true
}) => {
	const now = dayjs()
	const procedureDateTime = dayjs(`${procedureDate}T${appointmentTime}`)
	const isPast = procedureDateTime.isBefore(now.subtract(1, 'hour'))
	const isCurrent =
		procedureDateTime.isBefore(now) &&
		procedureDateTime.add(1, 'hour').isAfter(now)
	const isFuture = procedureDateTime.isAfter(now)

	let cardClass = 'shadow-lg p-2 m-4 rounded-lg border'
	if (isPast) {
		cardClass += ' border-gray-200 bg-gray-100'
	} else if (isCurrent) {
		cardClass += ' border-green-400 bg-green-100'
	} else if (isFuture) {
		cardClass += ' border-blue-400 bg-blue-100'
	}

	const { mutate: rateProcedure } = useMutation({
		mutationFn: (newRating: number) => patientProcedureService.rateProcedure(id, newRating),
		onSuccess: () => {
		  toast.success('Рейтинг успішно оновлено!');
		},
		onError: (error: any) => {
		  toast.error(`Не вдалося оновити рейтинг: ${error.message}`);
		},
	  });
	
	  const handleRatingChange = (newRating: number) => {
		rateProcedure(newRating);
	  };

	const handleCancel = () => {
		if (onCancel) {
			onCancel(id)
		}
	}

	return (
		<div className='flex justify-center my-4'>
			<div
				className={cardClass}
				style={{ maxWidth: 400 }}
			>
				<Card
					title={
						<span className='text-xl font-semibold'>
							{procedure.procedureName}
						</span>
					}
					bordered={false}
				>
					<p className='text-black mb-2'>
						<span className='font-bold'>Дата:</span> {procedureDate}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Час:</span> {appointmentTime}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Звіт:</span> {report.report}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Лікар:</span> {doctor.account.firstName}{' '}
						{doctor.account.lastName}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Пошта лікаря:</span>{' '}
						{doctor.account.email}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Спеціальність:</span> {doctor.specialty}
					</p>
					<p className='text-black mb-2'>
						<span className='font-bold'>Кваліфікація:</span>{' '}
						{doctor.qualification}
					</p>
					<div className='text-black mb-2'>
						<span className='font-bold'>Ваша оцінка:</span>
					</div>
					<div className='text-black mb-2'>
						<Rate
							disabled={isRatingDisabled}
							defaultValue={rating}
							onChange={handleRatingChange}
						/>
					</div>
					{showCancelButton && (
						<Button
							type='primary'
							danger
							onClick={handleCancel}
						>
							Скасувати запис
						</Button>
					)}
				</Card>
			</div>
		</div>
	)
}

export default ProcedureItem
