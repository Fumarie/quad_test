import { RefObject, useEffect } from "react"

const ESCAPE_KEY = 27

const useOutsideClickOrEsc = (ref: RefObject<any>, callback: any) => {
	const handleClick = (e: any) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback()
		}
	}

	const handleKeyDown = (event: any) => {
		switch (event.keyCode) {
			case ESCAPE_KEY:
				callback()
				break
			default:
				break
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClick)
		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.removeEventListener("click", handleClick)
			document.removeEventListener("keydown", handleKeyDown)
		}
	})
}

export default useOutsideClickOrEsc
