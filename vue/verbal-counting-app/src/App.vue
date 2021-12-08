<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/game">Game</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  max-width: 750px;
  margin: auto;
}
</style>
