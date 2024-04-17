export interface IAuthForm {
	username: string
	password: string
}

export interface IUser {
	id: string
	username: string
	name?: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
