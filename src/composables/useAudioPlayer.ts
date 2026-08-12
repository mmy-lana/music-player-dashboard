import { watch } from 'vue';
import { useAudioStore } from '@/stores/audioStore';
import { usePlaylistStore } from '@/stores/playlistStore';
import type { Track } from '@/types';

// Module-level singleton instance shared across all composable calls
let audioElement: HTMLAudioElement | null = null;

export function useAudioPlayer() {
  const audioStore = useAudioStore();
  const playlistStore = usePlaylistStore();

  function initAudio() {
    if (!audioElement) {
      audioElement = new Audio();
      
      audioElement.addEventListener('timeupdate', () => {
        if (audioElement) {
          audioStore.currentTime = audioElement.currentTime;
        }
      });

      audioElement.addEventListener('loadedmetadata', () => {
        if (audioElement) {
          audioStore.duration = audioElement.duration || audioStore.currentTrack?.duration || 0;
        }
      });

      audioElement.addEventListener('ended', handleTrackEnded);
    }
  }

  function playTrack(track: Track) {
    initAudio();
    if (audioStore.currentTrack?.id !== track.id) {
      audioStore.setTrack(track);
      if (audioElement) {
        audioElement.src = track.audioUrl;
        audioElement.load();
      }
    }
    
    if (audioElement) {
      audioElement.play().then(() => {
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

    if (!audioElement) initAudio();

    if (audioStore.isPlaying) {
      audioElement?.pause();
      audioStore.setPlaying(false);
    } else {
      audioElement?.play().then(() => {
        audioStore.setPlaying(true);
      }).catch(console.warn);
    }
  }

  function seek(timeInSeconds: number) {
    if (audioElement) {
      audioElement.currentTime = timeInSeconds;
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
    if (audioStore.repeatMode === 'one' && audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
    } else {
      playNext();
    }
  }

  watch(() => audioStore.volume, (newVol) => {
    if (audioElement) {
      audioElement.volume = audioStore.isMuted ? 0 : newVol / 100;
    }
  });

  watch(() => audioStore.isMuted, (muted) => {
    if (audioElement) {
      audioElement.volume = muted ? 0 : audioStore.volume / 100;
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