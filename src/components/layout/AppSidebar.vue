<script setup lang="ts">
import { Home, Search, Library, Plus, Heart, Music2 } from 'lucide-vue-next';

const navItems = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Search', icon: Search, active: false },
  { label: 'Your Library', icon: Library, active: false },
];

const playlists = [
  'Chill Synthwave Hits',
  'Deep Focus Coding',
  'Lo-Fi Beats 2026',
  'Cyberpunk CyberSpace',
  'Ambient Chillout',
];
</script>

<template>
  <aside class="w-64 bg-black flex flex-col h-full p-2 space-y-2 select-none flex-shrink-0">
    <!-- Navigation Box -->
    <div class="bg-[#121212] rounded-lg p-4 space-y-4">
      <div class="flex items-center space-x-2 px-2 text-white font-bold text-lg mb-2">
        <Music2 class="w-7 h-7 text-[#1ed760]" />
        <span>Spotify Clone</span>
      </div>

      <nav class="space-y-3">
        <a
          v-for="item in navItems"
          :key="item.label"
          href="#"
          :class="[
            'flex items-center space-x-4 text-sm font-semibold transition-colors duration-200 px-2 py-1 rounded-md',
            item.active ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
          ]"
        >
          <component :is="item.icon" class="w-6 h-6" />
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </div>

    <!-- Library / Playlists Box -->
    <div class="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col min-h-0">
      <div class="flex items-center justify-between text-[#b3b3b3] px-2 mb-4">
        <div class="flex items-center space-x-2 hover:text-white cursor-pointer transition-colors">
          <Library class="w-6 h-6" />
          <span class="text-sm font-semibold">Playlists</span>
        </div>
        <button
          type="button"
          class="p-1 rounded-full hover:bg-[#282828] hover:text-white transition-colors"
          aria-label="Create Playlist"
        >
          <Plus class="w-5 h-5" />
        </button>
      </div>

      <!-- Quick Action Buttons -->
      <div class="space-y-2 mb-4">
        <button
          type="button"
          class="w-full flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-[#1a1a1a] text-[#b3b3b3] hover:text-white transition-colors group"
        >
          <div class="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-blue-300 flex items-center justify-center text-white">
            <Heart class="w-4 h-4 fill-current" />
          </div>
          <span class="text-sm font-medium">Liked Songs</span>
        </button>
      </div>

      <hr class="border-[#282828] mb-2" />

      <!-- Scrollable Playlist List -->
      <div class="flex-1 overflow-y-auto space-y-1 pr-1">
        <a
          v-for="playlist in playlists"
          :key="playlist"
          href="#"
          class="block px-2 py-2 text-sm text-[#b3b3b3] hover:text-white truncate rounded hover:bg-[#1a1a1a] transition-colors"
        >
          {{ playlist }}
        </a>
      </div>
    </div>
  </aside>
</template>