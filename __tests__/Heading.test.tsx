import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Heading } from '@/components/Heading'

describe('Heading', () => {
	it('renders the title and level correctly', () => {
		render(
			<Heading
				title='Test Title'
				level={2}
			/>
		)

		const titleElement = screen.getByText('Test Title')
		expect(titleElement).toBeInTheDocument()
		expect(titleElement.tagName).toBe('H2')
	})

	it('renders with default level when level is not provided', () => {
		render(<Heading title='Test Title' />)

		const titleElement = screen.getByText('Test Title')
		expect(titleElement).toBeInTheDocument()
		// Check for the default level tag here. Assuming it's H1.
		expect(titleElement.tagName).toBe('H1')
	})
})
