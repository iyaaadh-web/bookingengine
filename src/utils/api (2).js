const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const getStorageKey = (resource) => `fasmala_${resource}`

const api = {
    async get(resource) {
        try {
            const res = await fetch(`${API_BASE}/${resource}/`)
            if (res.ok) {
                const json = await res.json()
                const data = json.data || (Array.isArray(json) ? json : [])
                localStorage.setItem(getStorageKey(resource), JSON.stringify(data))
                return data
            }
        } catch (e) {
            console.warn(`API Get ${resource} failed, using local storage.`, e)
        }
        return JSON.parse(localStorage.getItem(getStorageKey(resource)) || '[]')
    },

    async post(resource, body) {
        try {
            const res = await fetch(`${API_BASE}/${resource}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (res.ok) {
                const data = await res.json()
                await this.sync(resource)
                return data
            }
        } catch (e) {
            console.warn(`API Post ${resource} failed, updating local storage only.`, e)
        }

        const localData = JSON.parse(localStorage.getItem(getStorageKey(resource)) || '[]')
        const newItem = { ...body, id: Date.now().toString(), created_at: new Date().toISOString() }
        localData.push(newItem)
        localStorage.setItem(getStorageKey(resource), JSON.stringify(localData))
        return { data: newItem }
    },

    async put(resource, id, body) {
        try {
            const res = await fetch(`${API_BASE}/${resource}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (res.ok) {
                await this.sync(resource)
                return await res.json()
            }
        } catch (e) {
            console.warn(`API Put ${resource} failed, updating local storage only.`, e)
        }

        let localData = JSON.parse(localStorage.getItem(getStorageKey(resource)) || '[]')
        localData = localData.map(item => item.id === id ? { ...item, ...body } : item)
        localStorage.setItem(getStorageKey(resource), JSON.stringify(localData))
        return { data: body }
    },

    async delete(resource, id) {
        try {
            const res = await fetch(`${API_BASE}/${resource}/${id}`, { method: 'DELETE' })
            if (res.ok) {
                await this.sync(resource)
                return true
            }
        } catch (e) {
            console.warn(`API Delete ${resource} failed, updating local storage only.`, e)
        }

        let localData = JSON.parse(localStorage.getItem(getStorageKey(resource)) || '[]')
        localData = localData.filter(item => item.id !== id)
        localStorage.setItem(getStorageKey(resource), JSON.stringify(localData))
        return true
    },

    async sync(resource) {
        try {
            const res = await fetch(`${API_BASE}/${resource}/`)
            if (res.ok) {
                const data = await res.json()
                localStorage.setItem(getStorageKey(resource), JSON.stringify(data.data || []))
            }
        } catch (e) { }
    }
}

export default api
