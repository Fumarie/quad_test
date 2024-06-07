import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore.ts"
import {LoginDto, RegisterDto} from "../dto/AuthDto.ts";
import {AxiosResponse} from "axios";
import {User} from "../models/User.ts";
import {toFlowGeneratorFunction} from "../../helpers/flow.ts";
import {axiosInstance} from "../axiosInstance.ts";

interface AuthResponse {
	user: User,
	access: string,
}

export class AuthStore {

	rootStore: RootStore
	accessToken: string | null = null

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore

		makeAutoObservable(this, {})
	}

	setAccessToken(token: string | null) {
		this.accessToken = token
	}

	*register(registerData: RegisterDto) {
		try {
			const register = (): Promise<AxiosResponse<AuthResponse>> =>
				axiosInstance.post("/solver/register/", registerData)
			const response = yield* toFlowGeneratorFunction(register)()

			this.accessToken = response.data.access
			this.rootStore.userStore.currentUser = response.data.user
		} catch (e) {
			console.log(e)
		}
	}

	*login(loginData: LoginDto) {
		try {
			const register = (): Promise<AxiosResponse<AuthResponse>> =>
				axiosInstance.post("/solver/login/", loginData)
			const response = yield* toFlowGeneratorFunction(register)()

			this.accessToken = response.data.access
			this.rootStore.userStore.currentUser = response.data.user

		} catch (e) {
			console.log(e)
		}
	}
}