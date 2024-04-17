'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/Heading'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

type FieldType = {
	username?: string
	password?: string
}

export function Auth() {
	const { handleSubmit, reset, control } = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const [isLoginForm, setIsLoginForm] = useState(true)
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		console.log(process.env.BACKEND_API_URL)
		console.log(data)
		mutate(data)
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh'
			}}
		>
			<Form
				className='login-form'
				onFinish={handleSubmit(onSubmit)}
				style={{ maxWidth: 600 }}
				name='normal_login'
			>
				<Heading
					level={2}
					title={isLoginForm ? 'Register' : 'Login'}
				/>
				<Form.Item
					label='Username'
					rules={[{ required: true, message: 'Please enter your username' }]}
				>
					<Controller
						control={control}
						name='username'
						render={({ field }) => (
							<Input
								{...field}
								placeholder='Enter your username'
								prefix={<UserOutlined className='site-form-item-icon' />}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label='Password'
					rules={[
						{ required: true, message: 'Please enter your password' }
						//{ min: 6, message: 'Password must be at least 6 characters long' }
					]}
				>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='Enter your password'
								prefix={<LockOutlined className='site-form-item-icon' />}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
					>
						Submit
					</Button>{' '}
					Or <a href=''>register now!</a>
				</Form.Item>
			</Form>
		</div>
	)
}
