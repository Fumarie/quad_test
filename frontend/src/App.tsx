import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import {useRootStore} from "./core/store/useRootStore.ts";
import {observer} from "mobx-react-lite";
import MainLayout from "./Layouts/MainLayout/MainLayout.tsx";
import {useRef, useState} from "react";
import {useAutoRun} from "./hooks/useAutoRun.ts";
import {getSessionCookie, removeSessionCookie, setSessionCookie} from "./core/utils/cookie.ts";

const App = observer(() => {
    const {authStore} = useRootStore()

    const token = authStore.accessToken

    const [startLoading, setStartLoading] = useState(true)

    useAutoRun(() => {
        const sessionCookie = getSessionCookie()
        if (sessionCookie) authStore.setAccessToken(sessionCookie)
        setStartLoading(false)
    }, [])

    const isFirstRun = useRef(true)
    useAutoRun(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }

        const authStatus = !!token

        if (authStatus) {
            setSessionCookie(token)
        } else {
            removeSessionCookie()
        }
    }, [token])

    if (startLoading) return <div>loading...</div>

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {authStore.accessToken ?
                        <>
                            <Route path={""} element={<MainLayout />}>
                                <Route index element={<MainPage/>} />
                            </Route>
                            <Route path={"*"} element={<Navigate to="" replace />} />
                        </>
                        :
                        <>
                            <Route path={"/login"} element={<MainLayout />}>
                                <Route index element={<LoginPage/>} />
                            </Route>
                            <Route path={"*"} element={<Navigate to="/login" replace />} />
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    )
})

export default App
