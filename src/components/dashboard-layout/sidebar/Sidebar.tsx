'use client'

import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	SettingFilled,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Link from 'next/link'
import React, { useState } from 'react'

import { LogoutButton } from './LogoutButton'

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

const items: MenuItem[] = [
	getItem('Статистика', '1', '/', <PieChartOutlined />),
	getItem('Моніторинг', '2', '/', <DesktopOutlined />),
	getItem('Профіль', 'sub1', '/', <UserOutlined />, [
		getItem('Інформація', '3', '/admin/profile'),
		getItem('Healts API', '4', '/')
	]),
	getItem('Повідомлення', 'sub2', '/admin/message', <TeamOutlined />),
	getItem('Звіти', '9', '/', <FileOutlined />),
	getItem('Параметри', '10', '/', <SettingFilled />)
]

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)
	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<LogoutButton />
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
