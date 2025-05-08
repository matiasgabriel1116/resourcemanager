// composables/useProjects.js
import { ref, reactive, watch } from 'vue'
import debounce from 'lodash/debounce'
import axios from 'axios'

export function useProjects() {
  const projects = ref([])
  const meta = reactive({ links: [] })
  const isLoading = ref(false)
  const filters = reactive({ search: new URLSearchParams(window.location.search).get('search') || '' })
  const cache = new Map()

  const buildCacheKey = (url) => {
    const params = new URLSearchParams(filters).toString()
    return `${url}?${params}`
  }
  const fetchProjects = async (force = false, url = '/projects') => {
    const key = buildCacheKey(url)
    // Serve from cache
    if (cache.has(key) && force == false) {
      const cached = cache.get(key)
      projects.value = cached.projects
      Object.assign(meta, cached.meta)
      return
    }

    isLoading.value = true
    try {
      const response = await axios.get(url, { params: filters })
      projects.value = response.data.data
      Object.assign(meta, response.data.meta)

      // Cache result
      cache.set(key, {
        projects: [...response.data.data],
        meta: { ...response.data.meta },
      })

      // Sync URL
      const query = new URLSearchParams(filters).toString()
      window.history.replaceState({}, '', `/projects?${query}`)

    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const debouncedFetch = debounce(() => {
    meta.current_page = 1
    fetchProjects()
  }, 500)

  watch(() => filters.search, () => debouncedFetch())

  return {
    projects,
    meta,
    isLoading,
    filters,
    fetchProjects,
  }
}
