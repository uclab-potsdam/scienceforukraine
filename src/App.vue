<template>
  <div class="nav-bar">
    <a href="https://scienceforukraine.eu" class="title"><h1 :class="{expanded}">#ScienceForUkraine</h1><h1 :class="{expanded}">#SFU</h1></a>
    <div>
      <template v-if="!expanded">
        <router-link to="/transfers">Student Transfers</router-link>
        <router-link to="/positions">Research Positions</router-link>
      </template>
      <span class="menu-button" :class="{expanded}" @click="expanded = !expanded">
        <span class="burger-icon"/>
      </span>
    </div>
    <nav class="nav-menu" v-if="expanded">
      <div class="nav-group">find</div>
      <router-link @click="expanded = false" to="/transfers">Student Transfers</router-link>
      <router-link @click="expanded = false" to="/positions">Research Positions</router-link>

      <div class="nav-group">submit</div>
      <a @click="expanded = false" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSc6_EeBITgJoTjGTso4DbECDZ1EmB3uvEIZ7jUQF72ZpfizhA/viewform">New Student Transfer ↗</a>
      <a @click="expanded = false" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScQXe6F4znGjz512zhWZZOdOhf3i_uNv_X7OkLh5VnrzZDEZQ/viewform">New Research Position ↗</a>
      <a @click="expanded = false" target="_blank" href="mailto:data@scienceforukraine.eu">Request Deletion or Modification ↗</a>

      <div class="nav-group">about</div>
      <router-link @click="expanded = false" to="/help">Science for Ukraine</router-link>
      <router-link @click="expanded = false" to="/help">How You Can Help</router-link>
      <router-link @click="expanded = false" to="/team">Team & Contact</router-link>
      <router-link @click="expanded = false" to="/help">Our Partners</router-link>
      <router-link @click="expanded = false" to="/help">Press</router-link>
      <router-link @click="expanded = false" to="/help">Funding programmes and further support</router-link>
    </nav>
  </div>
  <router-view :key="$route.name"/>
</template>
<script>
export default {
  data () {
    return {
      expanded: false
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/style/base";
</style>

<style scoped lang="scss">
@import "sass-burger/burger";
@import "@/assets/style/mixins";
.nav-bar {
  // border-bottom: 1px solid var(--accent-2);
  // border-right: 1px solid var(--accent-2);
  width: 100vw;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  background: var(--background);
  margin-bottom: var(--spacing-l);
  border-bottom: var(--spacing-s) solid var(--accent-1);
  // gap: var(--spacing-l);
  // padding: 0 var(--spacing);
  @include wide {
    padding: 0 var(--spacing);
  }
  > div {
    display: flex;
    align-self: flex-end;
  }
  a, .menu-button {
    display: flex;

    height: 50px;
    justify-content: center;
    align-items: center;

    padding: calc(var(--spacing) + var(--spacing-s) + var(--spacing-xs)) var(--spacing) calc(var(--spacing) + var(--spacing-s) - var(--spacing-xs));
    color: var(--accent-1);

    background: var(--background);

    &.router-link-active {
      // text-decoration: underline;
      background: var(--pale-gray);
    }

    &:hover {
      background: var(--light-gray);
    }

    &.title {
      // justify-self: flex-start;
      // align-self: flex-start;
      padding: calc(var(--spacing) + var(--spacing-s) + var(--spacing-xs)) var(--spacing) calc(var(--spacing) + var(--spacing-s) - var(--spacing-xs));
      @include wide {
        padding: calc(var(--spacing) + var(--spacing-s) + var(--spacing-xs)) var(--spacing-l) calc(var(--spacing) + var(--spacing-s) - var(--spacing-xs));
      }
      // padding: calc(var(--spacing) + var(--spacing-s) + var(--spacing-xs)) var(--spacing-l) calc(var(--spacing) + var(--spacing-s) - var(--spacing-xs));
      background: var(--accent-2);
      color: var(--accent-1);

      h1 {
        &:first-child {
          display: none;
          @include medium {
            display: block;
          }
        }
        &:last-child {
          display: block;
          @include medium {
            display: none;
          }
        }
        &.expanded {
          &:last-child {
            display: none !important;
          }
          &:first-child {
            display: block;
          }
        }
      }
    }
  }

  .menu-button {
    display: flex;
    // background: var(--accent-2);
    padding: calc(var(--spacing) + var(--spacing-s) + var(--spacing-xs)) calc(var(--spacing) + var(--spacing-s)) calc(var(--spacing) + var(--spacing-s) - var(--spacing-xs));

    .burger-icon {
      @include burger(25px, 2px, 6px, var(--accent-1));
    }

    &.expanded {
      .burger-icon {
        @include burger-to-cross;
      }
    }
  }

  .nav-bar-item {
    display: none;
    @include wide {
      display: flex;
    }
  }

  .nav-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    padding-top: var(--spacing);
    overflow: auto;
    width: 100%;
    height: calc(100vh - 50px - var(--spacing-s));
    top: calc(50px + var(--spacing-s));
    left: 0;
    border-bottom: var(--spacing-s) solid var(--accent-1);
    background: var(--background);

    .nav-group {
      text-align: center;
      background: var(--background);
      text-transform: uppercase;
      font-size: var(--font-size-s);
      padding: var(--spacing) 0 var(--spacing-s) 0;
      color: var(--light-text);
      // color: var(--accent-1);
      // width: 100%
    }

    a {
      // align-items: flex-start;
      // justify-content: flex-start;
      &.router-link-active {
        // text-decoration: underline;
        background: var(--background);
         &:hover {
          background: var(--light-gray);
        }
      }
    }
  }
}
</style>
