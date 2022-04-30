<template>
  <div class="navigation" ref="menu">
    <div class="bar max-width">
      <div class="max-width-inner">
        <router-link to="/"><img src="@/assets/img/logo.svg" alt="Science For Ukraine"/></router-link>
        <span class="menu-button" @click="toggleMenu">
          <span class="burger-icon" :class="{ open }"/>
        </span>
      </div>
    </div>
    <div class="menu max-width" v-if="open">
      <nav class="max-width-inner">
        <span class="label">Listings</span>
        <div class="items">
          <router-link @click="toggleMenu" :to="{ name:'transfers' }">Student Transfers</router-link>
          <router-link @click="toggleMenu" :to="{ name:'positions' }">Research Positions</router-link>
        </div>
      </nav>
      <nav class="max-width-inner">
        <span class="label">Submit Listing</span>
        <div class="items">
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSc6_EeBITgJoTjGTso4DbECDZ1EmB3uvEIZ7jUQF72ZpfizhA/viewform">Add Student Transfer</a>
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScQXe6F4znGjz512zhWZZOdOhf3i_uNv_X7OkLh5VnrzZDEZQ/viewform">Add Research Position</a>
          <a target="_blank" href="mailto:data@scienceforukraine.eu">Request Changes</a>
        </div>
      </nav>
      <nav class="max-width-inner">
        <span class="label">More Information</span>
        <div class="items">
          <router-link @click="toggleMenu" to="/help">Funding Programmes<br>& Further Support</router-link>
          <router-link @click="toggleMenu" to="/help">How You Can Help</router-link>
          <router-link @click="toggleMenu" to="/help">Our Partners</router-link>
          <router-link @click="toggleMenu" to="/team">Team & Contact</router-link>
          <router-link @click="toggleMenu" to="/help">Press</router-link>
          <router-link @click="toggleMenu" to="/help">About</router-link>
          <a target="_blank" href="https://calendar.google.com/calendar/embed?src=info%40scienceforukraine.eu&ctz=Europe%2FWarsaw">Calendar</a>
        </div>
      </nav>
      <nav class="max-width-inner">
        <span class="label">Follow Us</span>
        <div class="items">
          <a target="_blank" href="https://twitter.com/Sci_for_Ukraine">Twitter</a>
          <a target="_blank" href="https://www.instagram.com/scienceforukraine/">Instagram</a>
          <a target="_blank" href="https://www.linkedin.com/company/scienceforukraine/">LinkedIn</a>
          <a target="_blank" href="https://www.facebook.com/ScienceForUkraine">Facebook</a>
          <a target="_blank" href="https://t.me/ScienceForUkraine">Telegram</a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
export default {
  name: 'TheNavigation',
  data () {
    return {
      open: false
    }
  },
  beforeUnmount () {
    clearAllBodyScrollLocks()
  },
  methods: {
    toggleMenu () {
      this.open = !this.open
      if (this.open) {
        disableBodyScroll(this.$refs.menu)
      } else {
        enableBodyScroll(this.$refs.menu)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "sass-burger/burger";
@import "@/assets/style/mixins";

.navigation {
  position: sticky;
  top: 0;
  z-index: 100;;
  .bar {
    background: var(--accent-1);
    border-bottom: var(--spacing) solid var(--accent-2);

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    img {
      display: block;
      margin: 0 var(--spacing);
    }

    .menu-button {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding:  0 var(--spacing);
      .burger-icon {
        transform: translateY(5px);
        @include burger(20px, 2px, 2.5px, var(--accent-2));

        &.open {
          @include burger-to-cross;
        }
      }
    }
  }

  .menu {
    height: calc(100% - 50px);
    width: 100%;
    position: fixed;
    top: 50px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-l);
    padding: var(--spacing-l) var(--spacing);
    overflow: auto;

    nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--spacing);

      .label {
        color: var(--light-text);
        text-transform: uppercase;
        font-size: var(--font-size-s);
      }

      .items {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing);
        justify-content: center;
        width: 100%;

        > * {
          display: flex;
          width: 100%;
          max-width: 320px;
          height: 50px;
          justify-content: center;
          align-items: center;
          // background: var(--pale-gray);
          border: 1px solid var(--accent-1);
          transition: border-width var(--transition);
          text-align: center;

          &:hover {
            border-width: var(--spacing-s);
          }

          &.router-link-active {
            background: var(--accent-1);
            color: var(--background);
          }

          &[target="_blank"] {
            &::after {
              content: "↗";
              transform: translate(1px, 2.5px);
            }
          }
        }
      }
    }
  }
}
</style>
