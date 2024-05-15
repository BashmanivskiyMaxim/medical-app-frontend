import { Metadata } from 'next'
import { useState } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import UniForm from './UniForm'

export const metadata: Metadata = {
	title: 'Authenticate',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <UniForm />
}
