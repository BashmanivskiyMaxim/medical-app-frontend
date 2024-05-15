'use client'

import { Breadcrumb, Layout, Menu, theme } from 'antd'
import React, { PropsWithChildren } from 'react'

import Sidebar from './sidebar/Sidebar'

const { Header, Content, Footer, Sider } = Layout

const DashboardLayout = ({ children }: PropsWithChildren<unknown>) => {
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken()
	return (
		<Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
			<Sidebar />
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<h2></h2>
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG
						}}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Procedure Planner ©{new Date().getFullYear()} Створено Максим Башманівський
				</Footer>
			</Layout>
		</Layout>
	)
}

export default DashboardLayout
