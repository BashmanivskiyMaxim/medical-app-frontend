'use client'

import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	SettingFilled,
	TeamOutlined,
	UserOutlined,
	CalendarOutlined,
} from '@ant-design/icons'
import { LogoutOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { authService } from '@/services/auth.service'
import { get } from 'http'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	href: string,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label: <Link href={href}>{label}</Link>
	} as MenuItem
}

const Sidebar = () => {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	const items: MenuItem[] = [
		getItem('Статистика', '1', '/', <PieChartOutlined />),
		getItem('Планування', '2', '/admin/planner', <DesktopOutlined />),
		getItem('Мої процедури', '/', '/admin/myProcedures', <CalendarOutlined />),
		getItem('Профіль', 'sub1', '/', <UserOutlined />, [
			getItem('Інформація', '3', '/admin/profile'),
			getItem('Healts API', '4', '/')
		]),
		getItem('Повідомлення', 'sub2', '/admin/message', <TeamOutlined />),
		getItem('Звіти', '9', '/', <FileOutlined />),
		getItem('Параметри', '10', '/', <SettingFilled />),
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Вийти',
			onClick: () => mutate()
		}
	]

	const [collapsed, setCollapsed] = useState(false)
	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<Menu
					theme='dark'
					defaultSelectedKeys={['3']}
					mode='inline'
					items={items}
				/>
			</Sider>
		</>
	)
}

export default Sidebar
