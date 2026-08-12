<script setup lang="ts">
import { ref } from 'vue';
import type { Track } from '@/types';
import { useAudioStore } from '@/stores/audioStore';
import { usePlaylistStore } from '@/stores/playlistStore';
import { Play, Pause, Heart } from 'lucide-vue-next';

interface Props {
  track: Track;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'play', track: Track): void;
}>();

const isHovered = ref(false);
const audioStore = useAudioStore();
const playlistStore = usePlaylistStore();

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
</script>

<template>
  <tr
    class="group hover:bg-[#ffffff1a] transition-colors rounded-md text-sm text-[#b3b3b3] cursor-pointer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emit('play', track)"
  >
    <!-- Track Index / Play Icon -->
    <td class="py-3 px-4 rounded-l-md w-12 text-center">
      <template v-if="audioStore.currentTrack?.id === track.id && audioStore.isPlaying">
        <button type="button" class="text-[#1ed760] focus:outline-none" aria-label="Pause">
          <Pause class="w-4 h-4 fill-current" />
        </button>
      </template>
      <template v-else-if="isHovered">
        <button type="button" class="text-white hover:scale-110 transition-transform focus:outline-none" aria-label="Play">
          <Play class="w-4 h-4 fill-current ml-0.5" />
        </button>
      </template>
      <template v-else>
        <span
          :class="audioStore.currentTrack?.id === track.id ? 'text-[#1ed760] font-bold' : ''"
        >
          {{ index + 1 }}
        </span>
      </template>
    </td>

    <!-- Title & Artist -->
    <td class="py-3 px-4">
      <div class="flex items-center space-x-3">
        <img :src="track.coverUrl" :alt="track.title" class="w-10 h-10 rounded object-cover flex-shrink-0" />
        <div class="flex flex-col overflow-hidden">
          <span
            class="font-medium truncate"
            :class="audioStore.currentTrack?.id === track.id ? 'text-[#1ed760]' : 'text-white'"
          >
            {{ track.title }}
          </span>
          <span class="text-xs truncate group-hover:text-white transition-colors">
            {{ track.artist }}
          </span>
        </div>
      </div>
    </td>

    <!-- Album -->
    <td class="py-3 px-4 hidden md:table-cell truncate group-hover:text-white transition-colors">
      {{ track.album }}
    </td>

    <!-- Date Added -->
    <td class="py-3 px-4 hidden lg:table-cell text-xs truncate">
      {{ track.addedAt || 'Recently' }}
    </td>

    <!-- Like & Duration -->
    <td class="py-3 px-4 rounded-r-md text-right">
      <div class="flex items-center justify-end space-x-4">
        <button
          type="button"
          class="transition-opacity p-1 focus:outline-none"
          :class="track.isLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
          @click.stop="playlistStore.toggleLikeTrack(track.id)"
        >
          <Heart
            class="w-4 h-4"
            :class="track.isLiked ? 'fill-[#1ed760] text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'"
          />
        </button>
        <span class="text-xs">{{ formatDuration(track.duration) }}</span>
      </div>
    </td>
  </tr>
</template>