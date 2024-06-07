import React from "react"
import classes from "./MainLayout.module.scss"
import { useRootStore } from "../../core/store/useRootStore.ts"
import { useAutoRun } from "../../hooks/useAutoRun.ts"
import { flowResult } from "mobx"
import { observer } from "mobx-react-lite"
import {Link, Outlet} from "react-router-dom"

interface MainLayoutProps {
}

const MainLayout: React.FC<MainLayoutProps> = observer(({}) => {
	const { userStore, authStore } = useRootStore()

	useAutoRun(() => {
		if (authStore.accessToken) {
			flowResult(userStore.getMe())
		}
	}, [authStore.accessToken])

	const onLogout = () => {
		userStore.logout()
	}

	return (
		<div className={classes.wrap}>
			<div style={{display: "flex", justifyContent: "space-between"}}>
				<div>
					<Link to={"/"}>Решить уравнение</Link>
					&nbsp;
					<Link to={"/test"}>Пройти тест</Link>
					&nbsp;
					{authStore.accessToken && <Link to={"/test-list"}>Результаты</Link>}
				</div>
				<div>
					{!authStore.accessToken ? <Link to={"/login"}>Войти</Link> : <></>}
					<div className={classes.playerId}>{userStore.currentUser ? `Пользователь: ${userStore.currentUser.name}` : <></>}</div>
					{authStore.accessToken ? <button onClick={onLogout}>Выйти</button> : <></>}
				</div>
			</div>
				<Outlet />
		</div>
	)
})


export default MainLayout
