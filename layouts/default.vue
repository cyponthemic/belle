<template>
  <div class="container mx-auto h-100 w-100">
    <nuxt-link to="/">
      <h3 class="logotype text-center text-white absolute">Isabella <br> Wood</h3>
    </nuxt-link>

    <Nuxt class="body"/>

    <div class="footer text-center text-white absolute inset-x-0">
      <ul>
        <li>About</li>
        <li>
          <nuxt-link to="/work">
            Work
          </nuxt-link>
          </li>
        <li>Test</li>
      </ul>
    </div>
  </div>
</template>

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
    font-size: 18px;
    text-transform: uppercase;
    bottom: 20px;
  }
</style>
