'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/Heading'

import { IAuthForm, IRegisterForm } from '@/types/auth.types'

import { AUTH_PAGES, DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

interface RegisterProps {
    onRegisterSuccess: () => void;
}

export function Register({ onRegisterSuccess }: RegisterProps) {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
		getValues
	} = useForm<IRegisterForm>({
		mode: 'onChange'
	})
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IRegisterForm) => authService.register(data),
		onSuccess() {
			toast.success('Успішна реєстрація!')
			reset()
			onRegisterSuccess();
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		mutate(data)
	}

	return (
		
			<Form
				className='w-full max-w-sm'
				onFinish={handleSubmit(onSubmit)}
				name='registration_form'
			>
				<Heading
					level={2}
					title={'Зареєструватися'}
				/>
				<Form.Item
					label='Нікнейм'
					validateStatus={errors.username ? 'error' : ''}
					help={errors.username && errors.username.message}
				>
					<Controller
						rules={{
							required: 'Введіть нікнейм',
							minLength: {
								value: 4,
								message: 'Мінімальна довжина нікнейму 4 символи'
							}
						}}
						control={control}
						name='username'
						render={({ field }) => (
							<Input
								{...field}
								placeholder='Введіть унікальне імя'
								prefix={<UserOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label='Пароль'
					name='password'
					validateStatus={errors.password ? 'error' : ''}
					help={errors.password && errors.password.message}
				>
					<Controller
						rules={{
							required: 'Введіть пароль',
							minLength: {
								value: 6,
								message: 'Мінімальна довжина паролю 6 символів'
							}
						}}
						control={control}
						name='password'
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='Введіть пароль'
								prefix={<LockOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label='Підтвердіть пароль'
					name='confirmPassword'
					validateStatus={errors.confirmPassword ? 'error' : ''}
					help={errors.confirmPassword && errors.confirmPassword.message}
				>
					<Controller
						control={control}
						rules={{
							required: 'Підтвердіть пароль',
							validate: value =>
								value === getValues().password || 'Паролі не співпадають'
						}}
						name='confirmPassword'
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='Підтвердіть пароль'
								prefix={<LockOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label='Імя'
					name='firstName'
					validateStatus={errors.firstName ? 'error' : ''}
					help={errors.firstName && errors.firstName.message}
				>
					<Controller
						control={control}
						rules={{
							required: "Введіть ваше ім'я"
						}}
						name='firstName'
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Введіть ваше ім'я"
								prefix={<UserOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label='Прізвище'
					name='lastName'
					validateStatus={errors.lastName ? 'error' : ''}
					help={errors.lastName && errors.lastName.message}
				>
					<Controller
						control={control}
						rules={{
							required: 'Введіть ваше прізвище'
						}}
						name='lastName'
						render={({ field }) => (
							<Input
								{...field}
								placeholder='Введіть ваше прізвище'
								prefix={<UserOutlined className='site-form-item-icon' />}
								className='w-full py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline'
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label='Email'
					name='email'
					validateStatus={errors.email ? 'error' : ''}
					help={errors.email && errors.email.message}
				>
					<Controller
						control={control}
						rules={{
							required: 'Введіть ваш email',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Невірний формат email'
							}
						}}
						name='email'
						render={({ field }) => (
							<Input
								{...field}
								placeholder='Введіть ваш email'
								prefix={<UserOutlined className='site-form-item-icon' />}
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
						{'Зареєструватися'}
					</Button>{' '}
				</Form.Item>
			</Form>
		
	)
}

export default Register
