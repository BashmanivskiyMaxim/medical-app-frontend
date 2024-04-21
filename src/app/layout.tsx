import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Metadata } from 'next'
import React from 'react'
import { Toaster } from 'sonner'

import '../styles/global.css'

import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		default: 'Medical Planner',
		template: '%s | Medical Planner'
	},
	description: 'Medical Planner'
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
	<html lang='en'>
		<body>
			<Providers>
				<AntdRegistry>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</AntdRegistry>
			</Providers>
		</body>
	</html>
)

export default RootLayout
