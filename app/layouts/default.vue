<template>
  <div class="min-h-screen flex flex-col bg-porcelain">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <InquiryDrawer />
  </div>
</template>
