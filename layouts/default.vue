<template>
  <div class="w-100 mx-auto">
    <span class="text-white text-black"></span>
    <nuxt-link to="/">
      <h3
        :class="backgroundContrast"
        class="logotype text-center text-mono absolute"
      >
        Isabella <br> Wood</h3>
    </nuxt-link>

    <Nuxt class="body" :class="backgroundContrast" />

    <div
      :class="backgroundContrast"
      class="footer py-4 text-center text-mono fixed inset-x-0"
    >
      <ul>
        <li>
          <nuxt-link to="/work">
            Work
          </nuxt-link>
        </li>
      </ul>
    </div>
    <style>
      :root {
        --background: {{ background }};
      }
    </style>
  </div>
</template>
<script>
  export default {
    computed: {
      background() {
        return this.$store.state.colors.background;
      },
      backgroundContrast() {
        return this.$store.getters['colors/backgroundContrast'];
      }
    },
  }
</script>
<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: #2E495E;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .logotype {
    font-size: 18px;
    text-transform: uppercase;
    z-index: 100;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
  }

  .footer {
    background-color: var(--background);
    font-size: 18px;
    bottom: 0;
    text-transform: uppercase;
  }
</style>
