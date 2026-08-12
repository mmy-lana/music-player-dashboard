<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import BaseSlider from '@/components/ui/BaseSlider.vue';

const audioStore = useAudioStore();
const { seek } = useAudioPlayer();

function handleSeekChange(val: number) {
  seek(val);
}
</script>

<template>
  <div class="flex items-center space-x-2 w-full max-w-xl">
    <span class="text-xs text-[#b3b3b3] min-w-[35px] text-right">
      {{ audioStore.formattedCurrentTime }}
    </span>
    <BaseSlider
      :model-value="audioStore.currentTime"
      :min="0"
      :max="audioStore.duration || 100"
      :step="0.1"
      :show-tooltip="true"
      :format-tooltip="() => audioStore.formattedCurrentTime"
      @change="handleSeekChange"
    />
    <span class="text-xs text-[#b3b3b3] min-w-[35px]">
      {{ audioStore.formattedDuration }}
    </span>
  </div>
</template>