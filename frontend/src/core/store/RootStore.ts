import { AuthStore } from "./AuthStore.ts"
import { UserStore } from "./UserStore.ts"
import {TestStore} from "./TestStore.ts";

export class RootStore {
	// socketStore: SocketStore

	authStore: AuthStore
	userStore: UserStore
	testStore: TestStore

	constructor() {
		// this.socketStore = new SocketStore(this)

		this.authStore = new AuthStore(this)
		this.userStore = new UserStore(this)
		this.testStore = new TestStore(this)

	}
}

export const rootStore = new RootStore()