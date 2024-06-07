import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore.ts"
import {AxiosResponse} from "axios";
import {toFlowGeneratorFunction} from "../../helpers/flow.ts";
import {axiosInstance} from "../axiosInstance.ts";
import {SolveResult, Test, TestResult} from "../models/Test.ts";
import {TestDto} from "../dto/TestDto.ts";
import {SolveDto} from "../dto/SolveDto.ts";

export class TestStore {

    rootStore: RootStore

    test: Test | null = null
    getNewTestLoading: boolean = false
    getNewtestError: string = ""

    testsList: Test[] = []
    testsListLoading: boolean = false
    testsListError: string = ""

    testResult: TestResult | null = null
    testResultLoading: boolean = false
    testResultError: string = ""

    solveResult: SolveResult | null = null
    solveLoading = false
    solveError: string = ""

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore

        makeAutoObservable(this, {})
    }

    *getTestsList() {
        try {
            this.testsListLoading = true
            const task = (): Promise<AxiosResponse> =>
                axiosInstance.get("/solver/test/list/")
            const response = yield* toFlowGeneratorFunction(task)()

            this.testsList = response.data
        } catch (e: any) {
            console.log(e)
            if(typeof e?.response?.data?.details === "string") {
                this.testsListError = e.response.data.details
            } else {
                this.testsListError = e.message
            }
        }  finally {
            this.testsListLoading = false
        }
    }

    *getNewTest() {
        try {
            this.getNewTestLoading = true
            this.test = null
            this.testResult = null

            const task = (): Promise<AxiosResponse<Test>> =>
                axiosInstance.get("/solver/test/")
            const response = yield* toFlowGeneratorFunction(task)()

            this.test = response.data
        } catch (e: any) {
            console.log(e)
            if(typeof e?.response?.data?.details === "string") {
                this.getNewtestError = e.response.data.details
            } else {
                this.getNewtestError = e.message
            }
        } finally {
            this.getNewTestLoading = false
        }
    }

    *submitTest(data: TestDto) {
        try {
            this.testResultLoading = true
            this.testResult = null
            this.testResultError = ""
            const task = (): Promise<AxiosResponse<{result: TestResult}>> =>
                axiosInstance.post("/solver/test/solve/", data)
            const response = yield* toFlowGeneratorFunction(task)()

            this.testResult = response.data.result
        } catch (e: any) {
            console.log(e)
            if(typeof e?.response?.data?.details === "string") {
                this.testResultError = e.response.data.details
            } else {
                this.testResultError = e.message
            }
        } finally {
            this.testResultLoading = false
        }
    }

    *solveTask(data: SolveDto) {
        try {
            this.solveLoading = true
            this.solveResult = null
            this.solveError = ""
            const task = (): Promise<AxiosResponse<SolveResult>> =>
                axiosInstance.get("/solver/solve/", {
                    params: data
                })
            const response = yield* toFlowGeneratorFunction(task)()

            this.solveResult = response.data
        } catch (e: any) {
            if(typeof e?.response?.data?.details === "string") {
                console.log("type string")
                this.solveError = e.response.data.details

                console.log("this.solveError", this.solveError)
            } else {
                this.solveError = e.message
            }

        } finally {
            this.solveLoading = false
        }
    }
}