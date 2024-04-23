import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	data: IUser
}

class UserService {
	private GET_URL = '/auth/get_my_account'
	private UPDATE_URL = '/auth/update_my_account'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.GET_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.UPDATE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
