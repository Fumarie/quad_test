import React, {ChangeEvent, useState} from "react"
import {useAutoRun} from "../../hooks/useAutoRun.ts";
import {flowResult} from "mobx";
import {useRootStore} from "../../core/store/useRootStore.ts";
import {observer} from "mobx-react-lite";

interface TestPageProps {
}

const TestPage: React.FC<TestPageProps> = observer(({}) => {

    const {testStore} = useRootStore()

    const [x1, setX1] = useState("")
    const [x2, setX2] = useState("")

    useAutoRun(() => {
        flowResult(testStore.getNewTest())
    }, []);

    const onSubmitTest = () => {
        if(!testStore.test || !x1 || !x2) return

        const x1Number = Number(x1)
        const x2Number = Number(x2)

        console.log({
            a: testStore.test.a,
            b: testStore.test.b,
            c: testStore.test.c,
            user_x1: x1Number,
            user_x2: x2Number
        })

        flowResult(testStore.submitTest({
            a: testStore.test.a,
            b: testStore.test.b,
            c: testStore.test.c,
            user_x1: x1Number,
            user_x2: x2Number
        }))
    }

    const onNumberInputChange = (event: ChangeEvent<HTMLInputElement>, type: "x1" | "x2") => {
        const value = event.target.value

        let valueToCheck = value

        if(value[0] === "-") {
            valueToCheck = value.slice(1)
        }

        const number = Number(valueToCheck)

        if(!isNaN(number)) {
            if (type === "x1") {
                setX1(value)
            } else {
                setX2(value)
            }
        }
    }

    const onNewTest = () => {
        setX1("")
        setX2("")
        flowResult(testStore.getNewTest())
    }

    return (
        <div className="text-left">
            <h2>Тест решения квадратного уравнения</h2>
            <div>
                {
                    testStore.getNewTestLoading ?
                        <div>Загрузка...</div>
                        :
                        testStore.test?.a ?
                            <div>
                                <h3>Коэффициенты</h3>
                                <p>A:<br/><input readOnly={true} value={testStore.test.a}/></p>
                                <p>B:<br/><input readOnly={true} value={testStore.test.b}/></p>
                                <p>C:<br/><input readOnly={true} value={testStore.test.c}/></p>
                                <h3>Корни(округлить до 2 знаков после запятой):</h3>
                                <table>
                                    {!testStore.testResult && <tr>
                                        <td><p>X1: <br/><input onChange={(event) => onNumberInputChange(event, "x1")}
                                                               value={x1}/></p></td>
                                        <td><p>X2: <br/><input onChange={(event) => onNumberInputChange(event, "x2")}
                                                               value={x2}/></p></td>
                                    </tr>}
                                    {
                                        testStore.testResult ? <>
                                            <tr>
                                                <td>Ваш ответ:</td>
                                            </tr>
                                            <tr>
                                                <td><p>X1: {testStore.testResult.X1r}</p></td>
                                                <td><p>X2: {testStore.testResult.X2r}</p></td>
                                            </tr>
                                            {
                                                testStore.testResult.res === "false" ? <>
                                                    <tr>
                                                        <td>Верный ответ:</td>
                                                    </tr>
                                                    <tr>
                                                        <td><p><label id="X1">X1 = {testStore.testResult.X1}</label></p></td>
                                                        <td><p><label id="X2">X2 = {testStore.testResult.X2}</label></p></td>
                                                    </tr>
                                                </>
                                                :
                                                <div>Решено верно</div>
                                            }
                                                <p><button onClick={onNewTest}>Новый тест</button></p>
                                        </>
                                            :
                                            <p><button onClick={onSubmitTest}>Проверить</button></p>
                                    }
                                </table>

                            </div>
                            : <div>{testStore.getNewtestError || "Ошибка, попробуйте позднее"}</div>
                }
            </div>
        </div>
    )
})


export default TestPage

//     <form action="test" method="get">
//         <p><input type="submit" value="Новый тест"></p>
//     </form>
//     <p>Результат: <label>{{message}}</label></p>
//     <p><a href="/tests">Список тестов</p>
// </div>
// </div>