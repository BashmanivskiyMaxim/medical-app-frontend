import { IUser, TypeUserForm } from '@/types/auth.types'
import { IMessage, IMessageSend } from '@/types/message.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IMessageResponse {
	data: IMessage[]
}

class MessageService {
	private GET_URL = '/message/get'
	private SEND_URL = '/message/add'

	async getMessages() {
		const response = await axiosWithAuth.get<IMessageResponse>(this.GET_URL)
		return response.data
	}

	async sendMessage(message: IMessageSend) {
		await axiosWithAuth.post(this.SEND_URL, message)
	}

	async deleteMessage(id: string) {
		await axiosWithAuth.delete(`/message/delete/${id}`)
	}

	async deleteMessageForReceiver(id: string) {
		await axiosWithAuth.patch(`/message/deleteForReceiver/${id}`)
	
	}
}

export const messageService = new MessageService()
