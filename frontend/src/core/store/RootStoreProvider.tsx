// holds a reference to the store (singleton)
import { rootStore, RootStore } from "./RootStore.ts"
import { createContext, ReactNode } from "react"

// create the context
export const StoreContext = createContext<RootStore | undefined>(undefined)


// create the provider component
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
	//only create the store once ( store is a singleton)
	const root = rootStore

	return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}
