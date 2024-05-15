import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import FormMessage from './FormMessage'
import Message from './Message'

export const metadata: Metadata = {
	title: 'Message',
	...NO_INDEX_PAGE
}

export default function MessagePage() {
	return (
		<>
			<Message />
			<FormMessage />
		</>
	)
}
