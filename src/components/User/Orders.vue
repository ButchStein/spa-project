<template>
  <v-container>
    <v-flex xs12 class="text-center pt-5" v-if="loading">
      <v-progress-circular
        :size="120"
        :width="4"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-flex>
    <v-row v-else-if="!loading && orders.length !== 0">
      <v-col>
        <h1 class="text--secondary mb-3">Orders</h1>
      </v-col>
    </v-row>
    <v-flex xs12 class="text-center" v-else>
      <h1 class="text--secondary">You have no orders!</h1>
    </v-flex>
    <v-list>
      <v-list-item
        v-for="order of orders"
        :key="order.id">
            <v-list-item-action>
              <v-checkbox
                  :input-value="order.done"
                  color="success"
                  @click="markDone(order)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-action>
                <v-btn
                class="primary"
                :to="'/ad/' + order.adId"
                >Open</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
