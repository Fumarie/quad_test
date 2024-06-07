// Create Axios instance
import axios from "axios"
import { autorun } from "mobx"
import { rootStore } from "./store/RootStore.ts"

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

autorun(() => {
	// axios.defaults.headers.common["Authorization"] = rootStore.authStore.accessToken
	// 	? `Bearer ${rootStore.authStore.accessToken}`
	// 	: null

	axiosInstance.interceptors.request.use(function(config) {
		// const token = store.getState().auth.token
		const token = rootStore.authStore.accessToken

		if (config.headers) {
			config.headers.Authorization = token ? `Bearer ${token}` : ""
		}

		return config
	})
})