import { IAuthForm, IAuthResponse, IRegisterForm } from '@/types/auth.types'

import { axiosWithoutAuth } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(data: IAuthForm) {
		try {
			const response = await axiosWithoutAuth.post<IAuthResponse>(
				`/auth/login`,
				data
			);
			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken);
			}
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				throw new Error('Неправильний логін або пароль');
			}
			throw new Error('Помилка під час входу');
		}
	},
	async register(data: IRegisterForm) {
		try {
			const response = await axiosWithoutAuth.post<IAuthResponse>(
				`/auth/signup`,
				data
			);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				throw new Error('Помилка реєстрації: неправильні дані');
			}
			if (error.response && error.response.status === 409) {
				throw new Error('Помилка реєстрації: користувач з таким email вже існує');
			}
			throw new Error('Помилка реєстрації');
		}
	},
	async getNewTokens() {
		const response = await axiosWithoutAuth.get<IAuthResponse>('/auth/refresh')
		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}
		return response
	},
	async logout() {
		const response = await axiosWithoutAuth.post<boolean>('/auth/logout')
		if (response.data) removeFromStorage()
		return response
	}
}
