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

export function Auth() {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(data),
		onSuccess() {
			toast.success('Успішна автентифікація!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		
			<Form
				className='w-full max-w-sm min-w-80'
				onFinish={handleSubmit(onSubmit)}
				name='normal_login'
			>
				<Heading
					level={2}
					title={'Увійти'}
				/>
				<Form.Item
					label='Нікнейм'
					validateStatus={errors.username ? 'error' : ''}
					help={errors.username && errors.username.message}
				>
					<Controller
						rules={{
							required: 'Будь-ласка введіть ваш нікнейм',
							minLength: {
								value: 4,
								message: 'Нікнейм має містити щонайменше 4 символи'
							}
						}}
						control={control}
						name='username'
						render={({ field }) => (
							<Input
								{...field}
								placeholder='Введіть ваш нікнейм'
								prefix={<UserOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label='Пароль'
					rules={[
						{ required: true, message: 'Будь-ласка введіть ваш пароль' },
						{ min: 6, message: 'Пароль повинен містити принаймні 6 символів' }
					]}
					validateStatus={errors.password ? 'error' : ''}
					help={errors.password && errors.password.message}
				>
					<Controller
						rules={{
							required: 'Будь-ласка введіть ваш пароль',
							minLength: {
								value: 6,
								message: 'Пароль повинен містити принаймні 6 символів'
							}
						}}
						control={control}
						name='password'
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='Введіть ваш пароль'
								prefix={<LockOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='w-full py-2 px-4 rounded'
					>
						{'Увійти'}
					</Button>{' '}
				</Form.Item>
			</Form>
		
	)
}
