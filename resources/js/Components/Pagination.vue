<template>
    <div class="mt-4 flex gap-2">
      <button
        v-for="link in links"
        :key="link.label"
        v-html="link.label"
        :disabled="!link.url"
        @click="$emit('paginate', link)"
        class="px-3 py-1 border rounded"
        :class="{
          'bg-blue-500 text-white': link.active,
          'text-gray-500': !link.url
        }"
      />
    </div>
  </template>
  
<script setup>
    defineProps({
        links: Array,
    })
    defineEmits(['paginate'])
</script>
  