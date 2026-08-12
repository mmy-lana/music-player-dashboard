<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import PlayerBar from '@/components/layout/PlayerBar.vue';
import DashboardView from '@/views/DashboardView.vue';
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-black overflow-hidden font-sans antialiased">
    <!-- Main Content Area -->
    <div class="flex-1 flex overflow-hidden p-2 gap-2">
      <!-- Sidebar -->
      <AppSidebar />

      <!-- View Wrapper -->
      <div class="flex-1 flex flex-col bg-[#121212] rounded-lg overflow-hidden relative">
        <AppNavbar />
        <DashboardView />
      </div>
    </div>

    <!-- Bottom Audio Control Bar -->
    <PlayerBar />
  </div>
</template>