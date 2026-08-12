<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft, ChevronRight, Search, User, Bell } from 'lucide-vue-next';
import BaseButton from '@/components/ui/BaseButton.vue';

const searchQuery = ref('');
</script>

<template>
  <header class="h-16 bg-[#121212]/90 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
    <!-- Left: Navigation Chevrons & Search -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Go back"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button
          type="button"
          class="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Go forward"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>

      <!-- Search Bar -->
      <div class="relative w-64 md:w-80">
        <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="What do you want to play?"
          class="w-full h-9 pl-9 pr-4 bg-[#242424] text-white text-sm rounded-full placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-white transition-all"
        />
      </div>
    </div>

    <!-- Right: Quick Actions & Profile -->
    <div class="flex items-center space-x-4">
      <BaseButton variant="secondary" size="sm" class="hidden sm:inline-flex">
        Explore Premium
      </BaseButton>
      
      <button
        type="button"
        class="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors"
        aria-label="Notifications"
      >
        <Bell class="w-4 h-4" />
      </button>

      <button
        type="button"
        class="w-8 h-8 rounded-full bg-[#282828] p-0.5 hover:scale-105 transition-transform"
        aria-label="User profile"
      >
        <div class="w-full h-full rounded-full bg-[#535353] flex items-center justify-center text-white">
          <User class="w-4 h-4" />
        </div>
      </button>
    </div>
  </header>
</template>