<template>
    <input
        :model-value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="border px-2 py-1 rounded"
        placeholder="Search..."
    />
</template>
  
<script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>
  