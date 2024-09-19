export const fetchJson = async <Response>(url: string, init?: RequestInit) => {
    try {
        const response = await fetch(url, {
            ...init,
            headers: {
                ...init?.headers,
                'Accept': 'application/json'
            }
        })

        try {
            const data = await response.text()
            return JSON.parse(data) as Promise<Response>
        } catch (error) {
            return {} as Promise<Response>
        }
    } catch (error) {
        throw error
    }
}