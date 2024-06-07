import { useEffect } from "react"
import { autorun } from "mobx"

export const useAutoRun = (callback: () => void, deps: unknown[]) => {
	useEffect(() => autorun(callback), deps)
}
