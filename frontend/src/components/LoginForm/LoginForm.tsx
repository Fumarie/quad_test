import React, {ChangeEvent, useState} from "react"
import {useRootStore} from "../../core/store/useRootStore.ts";

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {

    const [isLogin, setIsLogin] = useState(true)

    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    const {authStore} = useRootStore()

    const onInputChange = (event: ChangeEvent<HTMLInputElement>, type: "password" | "name" | "surname" | "email") => {
        const value = event.target.value

        if (type === "password") {
            setPassword(value)
        } else if (type === "name") {
            setName(value)
        } else if (type === "surname") {
            setSurname(value)
        } else if (type === "email") {
            setEmail(value)
        }
    }

    const onRegister = () => {
        if (!name || !password || !surname || !email) return

        const data = {
            name,
            surname,
            email,
            username: email,
            password
        }

        console.log("register", data)

        authStore.register(data)
    }

    const onLogin = () => {

        const data = {
            email,
            password
        }

        authStore.login(data)
    }

    return (
        <div className="text-left">
            <h2>Вход/Регистрация</h2>
            {
                !isLogin ?
                    <div>
                        <p>Имя:<br /><input name="name" onChange={(event) => onInputChange(event, "name")} value={name}/></p>
                        <p>Фамилия:<br /><input name="lastname" onChange={(event) => onInputChange(event, "surname")} value={surname}/></p>
                        <p>E-mail:<br /><input name="email" onChange={(event) => onInputChange(event, "email")} value={email} /></p>
                        <p>Пароль:<br /><input type={"password"} name="password" onChange={(event) => onInputChange(event, "password")} value={password} /></p>
                        <p><button onClick={onRegister}>Регистрация</button></p>
                        <p>Уже есть аккаут? <button onClick={() => setIsLogin(true)}>Войти</button></p>
                    </div>
                    :
                    <div>
                        <p>E-mail:<br /><input name="email" onChange={(event) => onInputChange(event, "email")} value={email} /></p>
                        <p>Пароль:<br /><input type={"password"} name="password" onChange={(event) => onInputChange(event, "password")} value={password} /></p>
                        <p><button onClick={onLogin}>Войти</button></p>
                        <p>Нет аккаунта? <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button></p>
                    </div>
            }
        </div>
    )
}


export default LoginForm
