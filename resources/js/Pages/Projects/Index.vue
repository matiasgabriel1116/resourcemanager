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
  if (link.url) fetchProjects(false, link.url)
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Projects</h1>

    <div class="mb-4">
      <SearchInput v-model="filters.search" class="w-full" />
    </div>

    <Link
      href="/projects/create"
      class="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm transition duration-200 mb-6"
    >
      + Add Project
    </Link>

    <div v-if="isLoading" class="text-gray-500">Loading...</div>

    <ul v-else class="space-y-4">
      <li
        v-for="project in projects"
        :key="project.id"
        class="flex justify-between items-center bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
      >
        <span class="text-gray-800 font-medium">{{ project.name }}</span>
        <div class="space-x-2">
          <Link
            :href="`/projects/${project.id}/edit`"
            class="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Edit
          </Link>
          <button
            @click="deleteProject(project.id)"
            class="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <div class="mt-6">
      <Pagination :links="meta.links" @paginate="goToPage" />
    </div>
  </div>
</template>


