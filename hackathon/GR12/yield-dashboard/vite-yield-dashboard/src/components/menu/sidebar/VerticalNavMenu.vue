<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-2 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <!--<v-img
          :src="require('@/assets/img/logos/DylanTullbergLogo.png')"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>-->
        <v-slide-x-transition>
          <h2
            class="app-title text--primary"
          >
            VITE YIELD DASHBOARD
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-link
        title="Home"
        :to="{ name: 'home' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <!--<nav-menu-link
        title="About"
        :to="{ name: 'about' }"
        :icon="icons.mdiHelpCircleOutline"
      ></nav-menu-link>-->
      <nav-menu-group
        title="Test"
        :icon="icons.mdiAlert"
      >
        <nav-menu-link
          title="SBP Rewards"
          :to="{ name: 'sbp-rewards' }"
          :icon="icons.mdiEyeOutline"
        ></nav-menu-link>
        <nav-menu-link
          title="Staking Vite Rewards"
          :to="{ name: 'staking-vite-rewards' }"
          :icon="icons.mdiEyeOutline"
        ></nav-menu-link>
        <nav-menu-link
          title="Staking VX Rewards"
          :to="{ name: 'staking-vx-rewards' }"
          :icon="icons.mdiEyeOutline"
        ></nav-menu-link>
      </nav-menu-group>
      <!--
      <nav-menu-group
        title="Guilds"
        :icon="icons.mdiFileOutline"
      >
        <nav-menu-link
          title="Explore Guilds"
          :to="{ name: 'explore-guilds' }"
        ></nav-menu-link>
        <nav-menu-link
          title="Create Guild"
          :to="{ name: 'create-guild' }"
        ></nav-menu-link>
      </nav-menu-group>

      <nav-menu-group
        title="Proposals"
        :icon="icons.mdiFileOutline"
      >
        <nav-menu-link
          title="Create Proposal"
          :to="{ name: 'create-proposal' }"
          :icon="icons.mdiFileOutline"
        ></nav-menu-link>
        <nav-menu-link
          title="View Proposals"
          :to="{ name: 'view-proposals' }"
          :icon="icons.mdiEyeOutline"
        ></nav-menu-link>
      </nav-menu-group>-->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiHomeOutline,
  mdiAlert,
  mdiHelpCircleOutline,
  mdiEyeOutline,
} from '@mdi/js'
import NavMenuLink from './NavMenuLink.vue'
import NavMenuGroup from './NavMenuGroup.vue'

// import NavMenuSectionTitle from './NavMenuSectionTitle.vue'

export default {
  components: {
    NavMenuLink,
    NavMenuGroup,
  },

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },

  setup() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlert,
        mdiHelpCircleOutline,
        mdiEyeOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.15rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

</style>
