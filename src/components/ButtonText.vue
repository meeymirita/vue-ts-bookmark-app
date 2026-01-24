<script setup lang="ts"></script>

<template>
  <button class="button"><slot /></button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fg);
  cursor: pointer;
  height: 50px;
  padding: 15px 24px;
  border-radius: 50px;
  font-size: 18px;
  color: white;
  border: none;
}
.button:hover {
  background: var(--color-fg-hover);
}
</style>
