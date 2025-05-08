import { defineStore } from 'pinia'
import { router } from '@inertiajs/vue3'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
    isLoading: false,
    meta: {},
    links: {},
    filters: {
      search: '',
    },
  }),

  actions: {
    async fetchProjects(pageUrl = '/projects') {
      this.isLoading = true

      try {
        const response = await axios.get(pageUrl, {
          params: this.filters,
        })

        this.projects = response.data.data
        this.meta = response.data.meta
        this.links = response.data.links
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
  },
})
