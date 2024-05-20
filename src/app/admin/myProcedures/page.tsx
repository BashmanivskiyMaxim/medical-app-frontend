import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ProcedureItem from './ProcedureItem'
import ProceduresList from './ProceduresList'

export const metadata: Metadata = {
	title: 'MyProcedures',
	...NO_INDEX_PAGE
}

export default function MyProceduresPage() {
	return (
		<>
			<ProceduresList />
		</>
	)
}
