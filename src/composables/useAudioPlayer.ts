import { ref, watch, onUnmounted } from 'vue';
import { useAudioStore } from '@/stores/audioStore';
import { usePlaylistStore } from '@/stores/playlistStore';
import type { Track } from '@/types';

export function useAudioPlayer() {
  const audioStore = useAudioStore();
  const playlistStore = usePlaylistStore();
  const audioElement = ref<HTMLAudioElement | null>(null);

  function initAudio() {
    if (!audioElement.value) {
      audioElement.value = new Audio();
      
      audioElement.value.addEventListener('timeupdate', () => {
        if (audioElement.value) {
          audioStore.currentTime = audioElement.value.currentTime;
        }
      });

      audioElement.value.addEventListener('loadedmetadata', () => {
        if (audioElement.value) {
          audioStore.duration = audioElement.value.duration || audioStore.currentTrack?.duration || 0;
        }
      });

      audioElement.value.addEventListener('ended', handleTrackEnded);
    }
  }

  function playTrack(track: Track) {
    initAudio();
    if (audioStore.currentTrack?.id !== track.id) {
      audioStore.setTrack(track);
      if (audioElement.value) {
        audioElement.value.src = track.audioUrl;
        audioElement.value.load();
      }
    }
    
    if (audioElement.value) {
      audioElement.value.play().then(() => {
        audioStore.setPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback prevented:', err);
        audioStore.setPlaying(false);
      });
    }
  }

  function togglePlayPause() {
    if (!audioStore.currentTrack && playlistStore.tracks.length > 0) {
      playTrack(playlistStore.tracks[0]);
      return;
    }

    if (!audioElement.value) initAudio();

    if (audioStore.isPlaying) {
      audioElement.value?.pause();
      audioStore.setPlaying(false);
    } else {
      audioElement.value?.play().then(() => {
        audioStore.setPlaying(true);
      }).catch(console.warn);
    }
  }

  function seek(timeInSeconds: number) {
    if (audioElement.value) {
      audioElement.value.currentTime = timeInSeconds;
      audioStore.currentTime = timeInSeconds;
    }
  }

  function playNext() {
    const list = playlistStore.tracks;
    if (list.length === 0) return;

    if (audioStore.isShuffle) {
      const randomIndex = Math.floor(Math.random() * list.length);
      playTrack(list[randomIndex]);
      return;
    }

    const currentIndex = list.findIndex((t) => t.id === audioStore.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % list.length;
    playTrack(list[nextIndex]);
  }

  function playPrevious() {
    const list = playlistStore.tracks;
    if (list.length === 0) return;

    if (audioStore.currentTime > 3) {
      seek(0);
      return;
    }

    const currentIndex = list.findIndex((t) => t.id === audioStore.currentTrack?.id);
    const prevIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
    playTrack(list[prevIndex]);
  }

  function handleTrackEnded() {
    if (audioStore.repeatMode === 'one' && audioElement.value) {
      audioElement.value.currentTime = 0;
      audioElement.value.play();
    } else {
      playNext();
    }
  }

  watch(() => audioStore.volume, (newVol) => {
    if (audioElement.value) {
      audioElement.value.volume = audioStore.isMuted ? 0 : newVol / 100;
    }
  });

  watch(() => audioStore.isMuted, (muted) => {
    if (audioElement.value) {
      audioElement.value.volume = muted ? 0 : audioStore.volume / 100;
    }
  });

  onUnmounted(() => {
    if (audioElement.value) {
      audioElement.value.pause();
      audioElement.value.removeEventListener('ended', handleTrackEnded);
    }
  });

  return {
    playTrack,
    togglePlayPause,
    seek,
    playNext,
    playPrevious,
  };
}