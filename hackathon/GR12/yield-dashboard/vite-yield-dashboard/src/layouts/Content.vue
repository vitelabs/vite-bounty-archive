<template>
  <v-app>
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
    <!-- Navigation Sidebar Menu
    <vertical-nav-menu :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu> -->

    <!-- Navigation Header -->
    <v-app-bar
      app
      flat
      absolute
      color="transparent"
    >
      <div class="w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <!--  <v-app-bar-nav-icon
            class="d-block d-lg-none me-2"
            @click="isDrawerOpen = !isDrawerOpen"
          ></v-app-bar-nav-icon> -->

          <v-spacer></v-spacer>

          <!-- Right Content -->
          <theme-switcher class="theme-switcher-btn"></theme-switcher>
          <v-menu
            bottom
            offset-y
            content-class="elevation-9"
            open-on-hover
            close-delay="500"
            :close-on-content-click="false"
            eager
            transition="slide-y-reverse-transition"
            left
            nudge-bottom="15"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="ms-3"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  {{ icons.mdiDotsHorizontal }}
                </v-icon>
              </v-btn>
            </template>
            <v-card
              class="elevation-0"
              width="300"
              max-width="300"
            >
              <v-list>
                <v-list-item
                  to="/"
                >
                  <v-list-item-icon>
                    <v-icon
                      class="mx-auto"
                    >
                      {{ icons.mdiHomeOutline }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Home
                  </v-list-item-title>
                </v-list-item>
                <!--<v-list-item
                  to="about"
                >
                  <v-list-item-icon>
                    <v-icon
                      class="mx-auto"
                    >
                      {{ icons.mdiHelpCircleOutline }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>
                    About
                  </v-list-item-title>
                </v-list-item>-->
                <v-list-item
                  href="https://github.com/zachdolph/vite-yield-dashboard"
                  target="_blank"
                  rel="nofollow"
                >
                  <v-list-item-icon>
                    <v-icon
                      class="mx-auto"
                    >
                      {{ icons.mdiGithub }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>
                    Github
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  href="https://github.com/zachdolph/vite-yield-dashboard/blob/main/LICENSE"
                  target="_blank"
                  rel="nofollow"
                >
                  <v-list-item-icon>
                    <v-icon
                      class="mx-auto"
                    >
                      {{ icons.mdiEyeOutline }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>
                    MIT License
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col
          cols="4"
        >
          <staking-vite-rewards></staking-vite-rewards>
        </v-col>
        <v-col
          cols="4"
        >
          <staking-vx-rewards></staking-vx-rewards>
        </v-col>
        <v-col
          cols="4"
        >
          <sbp-voting-rewards></sbp-voting-rewards>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  mdiMagnify,
  mdiDotsHorizontal,
  mdiGithub,
  mdiHelpCircleOutline,
  mdiEyeOutline,
  mdiHomeOutline,
  mdiBookOpenBlankVariant,
} from '@mdi/js'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import SbpVotingRewards from '@/components/rewards/cards/SbpVotingRewards.vue'
import StakingViteRewards from '@/components/rewards/cards/StakingViteRewards.vue'
import StakingVxRewards from '@/components/rewards/cards/StakingVxRewards.vue'
// import VerticalNavMenu from '@/components/menu/sidebar/VerticalNavMenu.vue'

export default {
  components: {
    ThemeSwitcher,
    SbpVotingRewards,
    StakingViteRewards,
    StakingVxRewards,
  },
  setup() {
    const isDrawerOpen = ref(null)

    return {
      isDrawerOpen,

      // Icons
      icons: {
        mdiMagnify,
        mdiDotsHorizontal,
        mdiGithub,
        mdiHelpCircleOutline,
        mdiEyeOutline,
        mdiHomeOutline,
        mdiBookOpenBlankVariant,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;
  }
}

.v-list-item .v-list-item__icon {
  margin: 8px 5px !important;
}

.theme-switcher-btn {
  margin-left: 20px;
}

.boxed-container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}
</style>
