'use client'

import React, { useState } from 'react'
import { Auth } from './Auth'
import Register from './Register'

const UniForm = () => {
	const [isRegister, setIsRegister] = useState(true)

	const handleRegisterSuccess = () => {
		setIsRegister(false);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<div>
				{isRegister ? <Register onRegisterSuccess={handleRegisterSuccess}/> : <Auth />}
			</div>
            <div className='mt-2'>
				<a
					className='cursor-pointer text-blue-500'
					onClick={() => {
						setIsRegister(!isRegister)
					}}
				>
					{isRegister ? 'Увійти' : 'Ще не зареєстровані? Зареєструватися'}
				</a>
			</div>
			
		</div>
	)
}

export default UniForm


