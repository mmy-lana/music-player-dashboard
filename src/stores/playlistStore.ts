import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Playlist } from '@/types';

export const usePlaylistStore = defineStore('playlist', () => {
  const currentPlaylist = ref<Playlist>({
    id: 'pl-01',
    title: 'Midnight Synthwave Stream',
    description: 'A curated selection of chill retro-futuristic beats and synthwaves for deep coding sessions.',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    owner: 'Spotify Clone',
    tracks: [
      {
        id: 'track-1',
        title: 'Neon Horizon',
        artist: 'Cyber Pulse',
        album: 'Retro Future Vol. 1',
        duration: 372,
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        isLiked: true,
        addedAt: '2 days ago',
      },
      {
        id: 'track-2',
        title: 'Midnight Drive',
        artist: 'Aetheria',
        album: 'Night Call',
        duration: 423,
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        isLiked: false,
        addedAt: '5 days ago',
      },
      {
        id: 'track-3',
        title: 'Digital Echoes',
        artist: 'Data Drift',
        album: 'Silicon Dreams',
        duration: 344,
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        isLiked: true,
        addedAt: '1 week ago',
      },
      {
        id: 'track-4',
        title: 'Starlight Waves',
        artist: 'Cosmic Rays',
        album: 'Orbiting Earth',
        duration: 502,
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        isLiked: false,
        addedAt: '2 weeks ago',
      },
      {
        id: 'track-5',
        title: 'Glitch City',
        artist: 'Byte Frequency',
        album: 'Mainframe',
        duration: 388,
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        isLiked: false,
        addedAt: '3 weeks ago',
      },
    ],
  });

  const tracks = computed(() => currentPlaylist.value.tracks);

  function toggleLikeTrack(trackId: string) {
    const track = currentPlaylist.value.tracks.find((t) => t.id === trackId);
    if (track) {
      track.isLiked = !track.isLiked;
    }
  }

  return {
    currentPlaylist,
    tracks,
    toggleLikeTrack,
  };
});