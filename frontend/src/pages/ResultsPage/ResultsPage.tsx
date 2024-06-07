import React from "react"
import classes from "./ResultsPage.module.scss"
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../core/store/useRootStore.ts";
import {useAutoRun} from "../../hooks/useAutoRun.ts";
import {flowResult} from "mobx";

interface ResultsPageProps {}

const ResultsPage: React.FC<ResultsPageProps> = observer(({}) => {

    const {userStore, testStore} = useRootStore()

    useAutoRun(() => {
        flowResult(testStore.getTestsList())
    }, [])

    return (
        <div className={classes.wrap}>
            <h2>Пройденные тесты для пользователя { userStore.currentUser?.name }</h2>
            <div>
                <table className="table table-striped">
                    <tr><th>Дата/время</th><th>А</th><th>B</th><th>C</th>
                        <th>X1</th><th>X2</th><th>X1_</th><th>X2_</th><th>Результат</th>
                    </tr>
                    {[...testStore.testsList].reverse().map(test => <tr>
                        <td>{new Date(test.dt_stamp).getDate()}.{new Date(test.dt_stamp).getMonth()}.{new Date(test.dt_stamp).getFullYear()} / {new Date(test.dt_stamp).getHours()}:{new Date(test.dt_stamp).getMinutes()}</td>
                        <td>{test.a}</td>
                        <td>{test.b}</td>
                        <td>{test.c}</td>
                        <td>{test.X1}</td>
                        <td>{test.X2}</td>
                        <td>{test.X1r}</td>
                        <td>{test.X2r}</td>
                        <td>{test.res === "true" ? "верно" : "неверно"}</td>
                    </tr>)}
                </table>
            </div>
        </div>
    )
})


export default ResultsPage
