import React from "react"
import classes from "./MainLayout.module.scss"
import { useRootStore } from "../../core/store/useRootStore.ts"
import { useAutoRun } from "../../hooks/useAutoRun.ts"
import { flowResult } from "mobx"
import { observer } from "mobx-react-lite"
import { Outlet } from "react-router-dom"

interface MainLayoutProps {
}

const MainLayout: React.FC<MainLayoutProps> = observer(({}) => {
	const { userStore, authStore } = useRootStore()

	useAutoRun(() => {
		if (authStore.accessToken) {
			flowResult(userStore.getMe())
		}
	}, [authStore.accessToken])

	return (
		<div className={classes.wrap}>
			<div className={classes.playerId}>{userStore.currentUser ? `id: #${userStore.currentUser.id}` : <></>}</div>
			<Outlet />
		</div>
	)
})


export default MainLayout
