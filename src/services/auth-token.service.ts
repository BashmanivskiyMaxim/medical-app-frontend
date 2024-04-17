import Cookies from 'js-cookie'

export enum EnumTokens {
	'AUTHENTICATION' = 'Authentication',
	'REFRESH' = 'Refresh'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.AUTHENTICATION)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.AUTHENTICATION, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.AUTHENTICATION)
}
