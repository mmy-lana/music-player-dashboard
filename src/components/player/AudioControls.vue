<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-vue-next';

const audioStore = useAudioStore();
const { togglePlayPause, playNext, playPrevious } = useAudioPlayer();
</script>

<template>
  <div class="flex items-center justify-center space-x-4">
    <!-- Shuffle Button -->
    <BaseButton
      variant="icon"
      size="sm"
      :active="audioStore.isShuffle"
      aria-label="Toggle shuffle"
      @click="audioStore.toggleShuffle"
    >
      <Shuffle class="w-4 h-4" />
    </BaseButton>

    <!-- Previous Track Button -->
    <BaseButton
      variant="icon"
      size="md"
      aria-label="Previous track"
      @click="playPrevious"
    >
      <SkipBack class="w-5 h-5 fill-current" />
    </BaseButton>

    <!-- Play/Pause Button -->
    <BaseButton
      variant="secondary"
      size="md"
      class="!p-3 !w-10 !h-10 rounded-full"
      aria-label="Play/Pause"
      @click="togglePlayPause"
    >
      <Pause v-if="audioStore.isPlaying" class="w-5 h-5 fill-current text-black" />
      <Play v-else class="w-5 h-5 fill-current text-black ml-0.5" />
    </BaseButton>

    <!-- Next Track Button -->
    <BaseButton
      variant="icon"
      size="md"
      aria-label="Next track"
      @click="playNext"
    >
      <SkipForward class="w-5 h-5 fill-current" />
    </BaseButton>

    <!-- Repeat Button -->
    <BaseButton
      variant="icon"
      size="sm"
      :active="audioStore.repeatMode !== 'off'"
      aria-label="Toggle repeat"
      @click="audioStore.toggleRepeat"
    >
      <Repeat class="w-4 h-4" />
    </BaseButton>
  </div>
</template>