import React from "react"
import classes from "./LoginPage.module.scss"
import {observer} from "mobx-react-lite";
import LoginForm from "../../components/LoginForm/LoginForm.tsx";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = observer(({}) => {
    return (
        <div className={classes.wrap}>
            <LoginForm />
        </div>
    )
})

export default LoginPage
