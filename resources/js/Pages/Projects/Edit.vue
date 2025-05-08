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
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Project</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label for="name" class="block">Project Name</label>
        <input v-model="form.name" id="name" type="text" class="border p-2 rounded w-full" />
        <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">
          {{ form.errors.name }}
        </div>
      </div>

      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  </div>
</template>
