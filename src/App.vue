<template>
    <v-app>
      <v-navigation-drawer
        app
        temporary
        v-model="drawer"
      >
        <v-list>
          <v-list-item
            v-for="lin of links"
            :key="lin.title"
            :to="lin.url"
          >
            <v-list-item-icon>
              <v-icon>{{lin.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="lin.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
          v-if="isUserLoggedIn"
          @click="onLogout"
          >
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app dark color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" class="pointer">Первый SPA</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text
            v-for="lin of links"
            :key="lin.title"
            :to="lin.url"
            class="hidden-sm-and-down"
          >
            <v-icon left>{{lin.icon}}</v-icon>{{lin.title}}</v-btn>
          <v-btn text
                 v-if="isUserLoggedIn"
                 @click="onLogout"
          >
            <v-icon left>mdi-exit-to-app</v-icon>Logout</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-content>
          <router-view></router-view>
      </v-content>
      <template v-if="error">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          color="error"
          @input="closeError"
          :value="true"
        >
          {{ error }}
          <v-btn
            dark
            text
            @click.native="closeError"
          >
            Close
          </v-btn>
        </v-snackbar>
      </template>
    </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
          { title: 'New ad', icon: 'mdi-file-plus', url: '/new' },
          { title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list' }
        ]
      } else {
        return [
          { title: 'Login', icon: 'mdi-lock', url: '/login' },
          { title: 'Registration', icon: 'mdi-face', url: '/registration' }
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>
