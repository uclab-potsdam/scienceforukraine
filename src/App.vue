<template>
  <nav>
    <a href="https://scienceforukraine.eu" class="title"><h1>#ScienceForUkraine</h1></a>
    <router-link to="/transfers">Student Transfers</router-link>
    <router-link to="/positions">Research Positions</router-link>
  </nav>
  <router-view :key="$route.name"/>
</template>

<style lang="scss">
@import "@/assets/style/base";
</style>

<style scoped lang="scss">
nav {
  // border-bottom: 1px solid var(--accent-2);
  // border-right: 1px solid var(--accent-2);
  display: flex;
  margin-bottom: var(--spacing-l);
  // gap: var(--spacing-l);
  // padding: 0 var(--spacing);
  a {
    padding: var(--spacing) var(--spacing);
    display: block;
    color: var(--text);

    &.router-link-active {
      color: var(--accent-1)
    }

    &.title {
      background: var(--accent-2);
      color: var(--accent-1)
    }
  }
}
</style>
