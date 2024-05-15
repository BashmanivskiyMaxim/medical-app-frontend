import { Typography } from 'antd'

const { Title } = Typography

interface IHeading {
	title: string
	level?: 1 | 2 | 3 | 4 | 5 | undefined
}

export function Heading({ title, level }: IHeading) {
	return (
		<div className='heading-container mb-5'>
			<Title level={level} className='mb-3'>
				{title}
			</Title>
			<div className='heading-divider h-1 bg-gray-700 my-3'></div>
		</div>
	)
}
