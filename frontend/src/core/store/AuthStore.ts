import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore.ts"
import {AuthDto} from "../dto/AuthDto.ts";
import {AxiosResponse} from "axios";
import {User} from "../models/User.ts";
import {toFlowGeneratorFunction} from "../../helpers/flow.ts";
import {axiosInstance} from "../axiosInstance.ts";

interface AuthResponse {
	user: User,
	tokens: {
		accessToken: string,
		refreshToken: string
	}
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

	*register(registerData: AuthDto) {
		try {
			const register = (): Promise<AxiosResponse<AuthResponse>> =>
				axiosInstance.post("/auth/register", registerData)
			const response = yield* toFlowGeneratorFunction(register)()

			this.accessToken = response.data.tokens.accessToken
			this.rootStore.userStore.currentUser = response.data.user
		} catch (e) {
			console.log(e)
		}
	}

	*login(loginData: AuthDto) {
		try {
			const register = (): Promise<AxiosResponse<AuthResponse>> =>
				axiosInstance.post("/auth/login", loginData)
			const response = yield* toFlowGeneratorFunction(register)()

			this.accessToken = response.data.tokens.accessToken
			this.rootStore.userStore.currentUser = response.data.user

		} catch (e) {
			console.log(e)
		}
	}
}