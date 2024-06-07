import React, {ChangeEvent, useState} from "react"
import classes from "./MainPage.module.scss"
import {observer} from "mobx-react-lite";
import {flowResult} from "mobx";
import {useRootStore} from "../../core/store/useRootStore.ts";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = observer(({}) => {
    const {testStore} = useRootStore()

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")

    const onNumberInputChange = (event: ChangeEvent<HTMLInputElement>, type: "a" | "b" | "c") => {
        const value = event.target.value

        let valueToCheck = value

        if(value[0] === "-") {
            valueToCheck = value.slice(1)
        }

        const number = Number(valueToCheck)

        if(!isNaN(number)) {
            if (type === "a") {
                setA(value)
            } else if(type === "b") {
                setB(value)
            } else if(type === "c") {
                setC(value)
            }
        }
    }

    const onSolve = () => {
        if(!a || !b || !c) return
        const data = {
            a: Number(a),
            b: Number(b),
            c: Number(c)
        }

        flowResult(testStore.solveTask(data))
    }

    console.log("testStore.solveError", testStore.solveError)

    return (
        <div className={classes.wrap}>
            <h2>Решение квадратного уравнения</h2>
            <div>
                <div>
                    <h3>Коэффициенты</h3>
                    <p>
                        A:<br />
                        <input onChange={(event) => onNumberInputChange(event, "a")} value={a}/>
                    </p>
                    <p>
                        B:<br />
                        <input onChange={(event) => onNumberInputChange(event, "b")} value={b}/>
                    </p>
                    <p>
                        C:<br />
                        <input onChange={(event) => onNumberInputChange(event, "c")} value={c}/>

                    </p>
                    <p>
                        <button onClick={onSolve}>Решить</button>
                    </p>
                    {
                        testStore.solveLoading ?
                            <div>Загрузка...</div>
                            :
                            testStore.solveResult ?
                                <div>
                                    <p> X1 = <label id="X1">{testStore.solveResult.roots[0]}</label></p>
                                    <p> X2 = <label id="X2">{testStore.solveResult.roots[1]}</label></p>
                                </div>
                                :
                                testStore.solveError &&
                                    <div>{testStore.solveError}</div>
                    }
                </div>
            </div>
        </div>
    )
})


export default MainPage
