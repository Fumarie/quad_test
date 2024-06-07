import Cookies from "js-cookie"

export const setSessionCookie = (token: string) => {
	Cookies.set("sessionToken", token, {
		expires: 365,
	})
}

export const getSessionCookie = () => {
	return Cookies.get("sessionToken")
}

export const removeSessionCookie = () => {
	debugger
	Cookies.remove("sessionToken")
}
