<script setup>
import { onMounted } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'
import { useProjects } from '@/composables/useProjects'
import SearchInput from '@/Components/SearchInput.vue'
import Pagination from '@/Components/Pagination.vue'
const { projects, meta, isLoading, filters, fetchProjects } = useProjects()
const form = useForm({})

// On mount
onMounted(() => {
  fetchProjects()
})

// Delete project
function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    form.delete(`/projects/${id}`, {
      onSuccess: () => fetchProjects(true),
    })
  }
}

// Handle pagination
function goToPage(link) {
  if (link.url) fetchProjects(link.url)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Projects</h1>

    <SearchInput v-model="filters.search" class="mb-4" />

    <Link
      href="/projects/create"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
    >
      Add Project
    </Link>

    <div v-if="isLoading">Loading...</div>

    <ul v-else class="space-y-2">
      <li
        v-for="project in projects"
        :key="project.id"
        class="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow"
      >
        <span>{{ project.name }}</span>
        <div class="space-x-2">
          <Link :href="`/projects/${project.id}/edit`" class="text-blue-600 hover:underline">Edit</Link>
          <button @click="deleteProject(project.id)" class="text-red-600 hover:underline">Delete</button>
        </div>
      </li>
    </ul>

    <Pagination :links="meta.links" @paginate="goToPage" />
  </div>
</template>
