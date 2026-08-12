<script setup lang="ts">
import TrackInfo from '@/components/player/TrackInfo.vue';
import AudioControls from '@/components/player/AudioControls.vue';
import ProgressBar from '@/components/player/ProgressBar.vue';
import VolumeControl from '@/components/player/VolumeControl.vue';
</script>

<template>
  <footer class="h-24 bg-black border-t border-[#282828] px-4 flex items-center justify-between select-none z-30">
    <!-- Left: Track Details -->
    <TrackInfo />

    <!-- Center: Playback Controls & Timeline -->
    <div class="flex flex-col items-center justify-center space-y-2 w-2/4">
      <AudioControls />
      <ProgressBar />
    </div>

    <!-- Right: Volume & Auxiliary -->
    <VolumeControl />
  </footer>
</template>