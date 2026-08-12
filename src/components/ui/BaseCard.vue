<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  hoverable?: boolean;
  showPlayButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  imageUrl: '',
  hoverable: true,
  showPlayButton: true,
});

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'play'): void;
}>();

function handlePlayClick(e: MouseEvent) {
  e.stopPropagation();
  emit('play');
}
</script>

<template>
  <div
    :class="[
      'group relative p-4 rounded-md bg-[#181818] transition-all duration-300 ease-out select-none',
      hoverable ? 'hover:bg-[#282828] cursor-pointer' : ''
    ]"
    @click="emit('click')"
  >
    <!-- Card Cover Image Container -->
    <div class="relative w-full aspect-square mb-4 rounded-md overflow-hidden bg-[#282828] shadow-lg">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-[#727272]">
        <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>

      <!-- Quick Play Hover Overlay Button -->
      <button
        v-if="showPlayButton"
        type="button"
        aria-label="Play track"
        class="absolute right-2 bottom-2 w-12 h-12 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1fdf64] focus:opacity-100 focus:translate-y-0"
        @click="handlePlayClick"
      >
        <svg class="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>

    <!-- Title and Subtitle -->
    <div class="space-y-1">
      <h3 class="font-bold text-white text-base truncate" :title="title">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-sm text-[#b3b3b3] line-clamp-2 leading-relaxed">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>