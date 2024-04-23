'use client'

import { LogoutOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<Button
			type='primary'
			danger
			onClick={() => mutate()}
			style={{ marginLeft: 30, marginBottom: 3, marginTop: 20 }}
		>
			<LogoutOutlined />
			Вийти
		</Button>
	)
}
