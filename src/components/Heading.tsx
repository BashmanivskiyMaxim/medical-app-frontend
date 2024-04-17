import { Typography } from 'antd'

import './Heading.css'

const { Title } = Typography

interface IHeading {
	title: string
	level?: 1 | 2 | 3 | 4 | 5 | undefined
}

export function Heading({ title, level }: IHeading) {
	return (
		<div className='heading-container'>
			<Title level={level}>{title}</Title>
			<div className='heading-divider'></div>
		</div>
	)
}
