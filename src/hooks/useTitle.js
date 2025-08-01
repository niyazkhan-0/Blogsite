import { useEffect } from "react"

export const useTitle = (path) => {

    useEffect(() => {
        document.title = `${path} - BlogSite`
    }, [path])
    return null
}
