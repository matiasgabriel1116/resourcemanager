<script setup>
import { ref } from 'vue';
import { useForm, Head, Link } from '@inertiajs/vue3';
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const form = useForm({
  name: '',
});

const rules = {
  name: { required },
}

const v$ = useVuelidate(rules, form)

const submit = () => {
  form.post('/projects', {
    onSuccess: () => {
      form.reset();
    },
    onBefore: () => v$.value.$validate()
  });
};
</script>

<template>
  <Head title="Create Project" />

  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Create New Project</h1>

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
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          :disabled="form.processing"
        >
          Create
        </button>
        <Link href="/projects" class="text-gray-600 hover:underline">Cancel</Link>
      </div>
    </form>
  </div>
</template>
