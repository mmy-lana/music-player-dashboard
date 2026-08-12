import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Track } from '@/types';

export const useAudioStore = defineStore('audio', () => {
  const currentTrack = ref<Track | null>(null);
  const isPlaying = ref<boolean>(false);
  const currentTime = ref<number>(0);
  const duration = ref<number>(0);
  const volume = ref<number>(80);
  const isMuted = ref<boolean>(false);
  const isShuffle = ref<boolean>(false);
  const repeatMode = ref<'off' | 'all' | 'one'>('off');

  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(duration.value));

  function setTrack(track: Track) {
    currentTrack.value = track;
    currentTime.value = 0;
    duration.value = track.duration;
  }

  function setPlaying(state: boolean) {
    isPlaying.value = state;
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }

  function setVolume(val: number) {
    volume.value = Math.min(Math.max(val, 0), 100);
    if (volume.value > 0) isMuted.value = false;
  }

  function toggleMute() {
    isMuted.value = !isMuted.value;
  }

  function toggleShuffle() {
    isShuffle.value = !isShuffle.value;
  }

  function toggleRepeat() {
    if (repeatMode.value === 'off') repeatMode.value = 'all';
    else if (repeatMode.value === 'all') repeatMode.value = 'one';
    else repeatMode.value = 'off';
  }

  function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    formattedCurrentTime,
    formattedDuration,
    setTrack,
    setPlaying,
    togglePlay,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  };
});