import { AuthStore } from "./AuthStore.ts"
import { UserStore } from "./UserStore.ts"

export class RootStore {
	// socketStore: SocketStore

	authStore: AuthStore
	userStore: UserStore

	constructor() {
		// this.socketStore = new SocketStore(this)

		this.authStore = new AuthStore(this)
		this.userStore = new UserStore(this)

	}
}

export const rootStore = new RootStore()