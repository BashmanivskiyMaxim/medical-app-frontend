import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ProcedureList from './ProcedureList'
import ClockItem from './ClockItem'
import dynamic from 'next/dynamic';


export const metadata: Metadata = {
	title: 'Planner',
	...NO_INDEX_PAGE
}

export default function PlannerPage() {
	const ClockItem = dynamic(() => import('./ClockItem'), { ssr: false });

	return (
		<>
			<ClockItem />
			<ProcedureList />
		</>
	)
}
