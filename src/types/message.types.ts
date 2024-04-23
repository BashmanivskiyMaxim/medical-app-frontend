export interface IMessage {
	id?: string
	role?: string
	messageContent?: string
	timestamp: string
}

export interface IMessageSend {
	receiverEmail: string
	messageContent: string
}
