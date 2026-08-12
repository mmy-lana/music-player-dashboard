<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showTooltip?: boolean;
  formatTooltip?: (val: number) => string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: false,
  formatTooltip: (val: number) => `${val}`,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();

const isHovered = ref(false);
const isDragging = ref(false);

const percentage = computed(() => {
  if (props.max === props.min) return 0;
  const clamped = Math.min(Math.max(props.modelValue, props.min), props.max);
  return ((clamped - props.min) / (props.max - props.min)) * 100;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const val = parseFloat(target.value);
  emit('update:modelValue', val);
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const val = parseFloat(target.value);
  emit('change', val);
}
</script>

<template>
  <div
    class="relative group flex items-center w-full h-3 cursor-pointer touch-none select-none"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Tooltip -->
    <div
      v-if="showTooltip && (isHovered || isDragging)"
      class="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#282828] text-white text-[10px] px-2 py-0.5 rounded shadow-lg pointer-events-none"
      :style="{ left: `${percentage}%` }"
    >
      {{ formatTooltip(modelValue) }}
    </div>

    <!-- Track Background -->
    <div class="relative w-full h-1 group-hover:h-1.5 rounded-full bg-[#4d4d4d] transition-all duration-150 overflow-hidden">
      <!-- Active Filled Track -->
      <div
        class="h-full rounded-full transition-colors duration-150"
        :class="isHovered ? 'bg-[#1ed760]' : 'bg-white'"
        :style="{ width: `${percentage}%` }"
      />
    </div>

    <!-- Thumb Knob -->
    <div
      class="absolute w-3 h-3 bg-white rounded-full shadow-md transition-opacity duration-150 pointer-events-none -translate-x-1/2"
      :class="isHovered || isDragging ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
      :style="{ left: `${percentage}%` }"
    />

    <!-- Invisible Native Input Overlay for Accessibility and Smooth Dragging -->
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      @input="handleInput"
      @change="handleChange"
      @mousedown="isDragging = true"
      @mouseup="isDragging = false"
      @mouseleave="isDragging = false"
      aria-label="Seek/Volume Slider"
    />
  </div>
</template>