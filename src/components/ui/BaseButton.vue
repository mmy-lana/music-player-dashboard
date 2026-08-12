<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonVariant, ButtonSize } from '@/types';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  active: false,
  ariaLabel: undefined,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-[#1ed760] text-black font-bold hover:bg-[#1fdf64] hover:scale-105 active:scale-100 shadow-md';
    case 'secondary':
      return 'bg-white text-black font-bold hover:bg-neutral-200 hover:scale-105 active:scale-100';
    case 'ghost':
      return 'bg-transparent text-[#b3b3b3] hover:text-white hover:scale-105 active:scale-100';
    case 'outline':
      return 'bg-transparent border border-[#727272] text-white font-bold hover:border-white hover:scale-105 active:scale-100';
    case 'icon':
      return `bg-transparent text-[#b3b3b3] hover:text-white p-2 rounded-full transition-colors ${
        props.active ? 'text-[#1ed760] hover:text-[#1fdf64]' : ''
      }`;
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  if (props.variant === 'icon') {
    switch (props.size) {
      case 'sm': return 'w-8 h-8 text-sm';
      case 'lg': return 'w-12 h-12 text-xl';
      case 'md':
      default: return 'w-10 h-10 text-base';
    }
  }

  switch (props.size) {
    case 'sm':
      return 'px-4 py-1.5 text-xs rounded-full';
    case 'lg':
      return 'px-8 py-3.5 text-base rounded-full';
    case 'md':
    default:
      return 'px-6 py-2.5 text-sm rounded-full';
  }
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :type="type"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white select-none',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
      variantClasses,
      sizeClasses,
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>