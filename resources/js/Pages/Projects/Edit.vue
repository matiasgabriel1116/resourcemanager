<script setup>
import { useForm } from '@inertiajs/vue3'
import { defineProps } from 'vue'

const props = defineProps({
  project: Object,
})

const form = useForm({
  name: props.project.name,
})

function submit() {
  form.put(`/projects/${props.project.id}`, {
    onSuccess: () => form.reset(),
  })
}
</script>

<template>
  <Head title="Edit Project" />

  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Edit Project</h1>

    <form @submit.prevent="submit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">
          {{ form.errors.name }}
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          :disabled="form.processing"
        >
          Update
        </button>
        <Link href="/projects" class="text-gray-600 hover:underline">Cancel</Link>
      </div>
    </form>
  </div>
</template>

