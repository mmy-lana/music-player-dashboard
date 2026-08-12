<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore';
import BaseSlider from '@/components/ui/BaseSlider.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Volume2, Volume1, VolumeX } from 'lucide-vue-next';

const audioStore = useAudioStore();

function handleVolumeChange(val: number) {
  audioStore.setVolume(val);
}
</script>

<template>
  <div class="flex items-center justify-end space-x-2 min-w-[140px] w-1/4">
    <BaseButton
      variant="icon"
      size="sm"
      aria-label="Mute/Unmute"
      @click="audioStore.toggleMute"
    >
      <VolumeX v-if="audioStore.isMuted || audioStore.volume === 0" class="w-5 h-5 text-[#b3b3b3]" />
      <Volume1 v-else-if="audioStore.volume < 50" class="w-5 h-5 text-[#b3b3b3]" />
      <Volume2 v-else class="w-5 h-5 text-[#b3b3b3]" />
    </BaseButton>

    <div class="w-24">
      <BaseSlider
        :model-value="audioStore.isMuted ? 0 : audioStore.volume"
        :min="0"
        :max="100"
        :step="1"
        @update:model-value="handleVolumeChange"
      />
    </div>
  </div>
</template>