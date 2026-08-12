<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlistStore';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { useAudioStore } from '@/stores/audioStore';
import PlaylistTable from '@/components/playlist/PlaylistTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-vue-next';

const playlistStore = usePlaylistStore();
const audioStore = useAudioStore();
const { togglePlayPause, playTrack } = useAudioPlayer();

function handleHeaderPlay() {
  if (audioStore.currentTrack) {
    togglePlayPause();
  } else if (playlistStore.tracks.length > 0) {
    playTrack(playlistStore.tracks[0]);
  }
}
</script>

<template>
  <div class="flex-1 overflow-y-auto bg-gradient-to-b from-[#402060] via-[#121212] to-[#121212] text-white">
    <!-- Hero Banner -->
    <div class="p-8 flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-6 pt-12">
      <img
        :src="playlistStore.currentPlaylist.coverUrl"
        :alt="playlistStore.currentPlaylist.title"
        class="w-48 h-48 md:w-60 md:h-60 rounded shadow-2xl object-cover flex-shrink-0"
      />
      
      <div class="flex flex-col space-y-3">
        <span class="text-xs uppercase font-bold tracking-wider">Public Playlist</span>
        <h1 class="text-4xl md:text-7xl font-black tracking-tight">
          {{ playlistStore.currentPlaylist.title }}
        </h1>
        <p class="text-sm text-[#b3b3b3] max-w-2xl leading-relaxed">
          {{ playlistStore.currentPlaylist.description }}
        </p>
        
        <div class="flex items-center space-x-2 text-sm text-[#b3b3b3] pt-2">
          <span class="text-white font-semibold">{{ playlistStore.currentPlaylist.owner }}</span>
          <span>•</span>
          <span>{{ playlistStore.tracks.length }} songs</span>
        </div>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="px-8 py-6 flex items-center space-x-8">
      <BaseButton
        variant="primary"
        size="lg"
        class="!p-4 !w-14 !h-14 shadow-xl hover:scale-105"
        aria-label="Play playlist"
        @click="handleHeaderPlay"
      >
        <Pause v-if="audioStore.isPlaying" class="w-6 h-6 fill-current text-black" />
        <Play v-else class="w-6 h-6 fill-current text-black ml-1" />
      </BaseButton>

      <button
        type="button"
        class="text-[#b3b3b3] hover:text-white transition-colors focus:outline-none"
        aria-label="Like playlist"
      >
        <Heart class="w-8 h-8" />
      </button>

      <button
        type="button"
        class="text-[#b3b3b3] hover:text-white transition-colors focus:outline-none"
        aria-label="More options"
      >
        <MoreHorizontal class="w-8 h-8" />
      </button>
    </div>

    <!-- Track List -->
    <div class="px-8 pb-12">
      <PlaylistTable />
    </div>
  </div>
</template>