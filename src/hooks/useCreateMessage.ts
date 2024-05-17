import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IMessageSend } from '@/types/message.types'

import { messageService } from '@/services/message.service'

export function useCreateMessage() {
	const queryClient = useQueryClient()
	const { mutate: createMessage } = useMutation({
		mutationKey: ['create message'],
		mutationFn: (data: IMessageSend) => messageService.sendMessage(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['message']
			})
		}
	})

	return { createMessage }
}
