// create the hook
import { useContext } from "react"
import { StoreContext } from "./RootStoreProvider"

export const useRootStore = () => {
	const context = useContext(StoreContext)
	if (context === undefined) {
		throw new Error("useRootStore must be used within RootStoreProvider")
	}

	return context
}
