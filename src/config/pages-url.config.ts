class DASHBOARD {
	private root = '/admin'
	HOME = this.root
}

class AUTH {
	private root = '/auth'
	LOGIN = this.root
}

export const AUTH_PAGES = new AUTH()
export const DASHBOARD_PAGES = new DASHBOARD()
