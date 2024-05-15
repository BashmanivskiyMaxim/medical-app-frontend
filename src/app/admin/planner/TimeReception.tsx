'use client'

import { Button, TimePicker } from 'antd'
import React from 'react'

interface TimeReceptionProps {
	date: string
	active: boolean
}

const TimeReception = ({ date, active }: TimeReceptionProps) => {
	return (
		<>
			<Button disabled={active}>{date}</Button>
		</>
	)
}

export default TimeReception
