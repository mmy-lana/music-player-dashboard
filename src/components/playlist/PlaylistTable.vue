<script setup lang="ts">
import { usePlaylistStore } from '@/stores/playlistStore';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import TrackRow from './TrackRow.vue';
import { Clock } from 'lucide-vue-next';

const playlistStore = usePlaylistStore();
const { playTrack } = useAudioPlayer();
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr class="text-xs uppercase text-[#b3b3b3] border-b border-[#ffffff1a]">
          <th class="pb-3 px-4 font-normal w-12 text-center">#</th>
          <th class="pb-3 px-4 font-normal">Title</th>
          <th class="pb-3 px-4 font-normal hidden md:table-cell">Album</th>
          <th class="pb-3 px-4 font-normal hidden lg:table-cell">Date Added</th>
          <th class="pb-3 px-4 font-normal text-right">
            <Clock class="w-4 h-4 inline-block" />
          </th>
        </tr>
      </thead>
      <tbody class="before:block before:h-2">
        <TrackRow
          v-for="(track, index) in playlistStore.tracks"
          :key="track.id"
          :track="track"
          :index="index"
          @play="playTrack"
        />
      </tbody>
    </table>
  </div>
</template>