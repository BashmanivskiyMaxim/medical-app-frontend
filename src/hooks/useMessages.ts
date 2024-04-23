import { useQuery } from '@tanstack/react-query'
import { message } from 'antd'

import { messageService } from '@/services/message.service'

export function useMessages() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['messages'],
		queryFn: () => messageService.getMessages()
	})

	return { data, isLoading, isSuccess }
}
