import { makeAutoObservable } from "mobx"
import { User } from "../models/User.ts"
import { AxiosResponse } from "axios"
import { toFlowGeneratorFunction } from "../../helpers/flow"
import { RootStore } from "./RootStore.ts"
import { axiosInstance } from "../axiosInstance.ts"

export class UserStore {
	rootStore: RootStore
	currentUser: User | null = null
	currentUserLoading = false

	setCurrentUserLoading(flag: boolean) {
		this.currentUserLoading = flag
	}

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	* getMe() {
		try {
			this.setCurrentUserLoading(true)

			const fetchMe = (): Promise<AxiosResponse<User>> => axiosInstance.get<User>("/user/me")
			const response = yield* toFlowGeneratorFunction(fetchMe)()

			this.currentUser = response.data
			// return response.data
			console.log("Get me", this.currentUser)
			return response.data
		} catch (e) {
			console.log(e)
		} finally {
			this.setCurrentUserLoading(false)
		}
	}
}
