<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore';
import { usePlaylistStore } from '@/stores/playlistStore';
import { Heart } from 'lucide-vue-next';

const audioStore = useAudioStore();
const playlistStore = usePlaylistStore();
</script>

<template>
  <div class="flex items-center space-x-4 min-w-[180px] w-1/4">
    <template v-if="audioStore.currentTrack">
      <img
        :src="audioStore.currentTrack.coverUrl"
        :alt="audioStore.currentTrack.title"
        class="w-14 h-14 rounded object-cover shadow-md flex-shrink-0"
      />
      <div class="flex flex-col justify-center overflow-hidden">
        <span class="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
          {{ audioStore.currentTrack.title }}
        </span>
        <span class="text-[#b3b3b3] text-xs truncate hover:underline cursor-pointer">
          {{ audioStore.currentTrack.artist }}
        </span>
      </div>
      <button
        type="button"
        class="text-[#b3b3b3] hover:text-white transition-colors p-1 rounded-full focus:outline-none"
        :aria-label="audioStore.currentTrack.isLiked ? 'Unlike' : 'Like'"
        @click="playlistStore.toggleLikeTrack(audioStore.currentTrack.id)"
      >
        <Heart
          class="w-5 h-5 transition-transform active:scale-125"
          :class="audioStore.currentTrack.isLiked ? 'fill-[#1ed760] text-[#1ed760]' : ''"
        />
      </button>
    </template>
    <template v-else>
      <div class="w-14 h-14 bg-[#282828] rounded animate-pulse" />
      <div class="flex flex-col space-y-2">
        <div class="w-24 h-3 bg-[#282828] rounded animate-pulse" />
        <div class="w-16 h-2.5 bg-[#282828] rounded animate-pulse" />
      </div>
    </template>
  </div>
</template>