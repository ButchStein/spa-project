<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text--secondary mb-3">Orders</h1>
      </v-col>
    </v-row>
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
  data () {
    return {
      orders: [
        {
          id: 'sdcs',
          name: 'Vadim',
          phone: '8-910-556-95-85',
          adId: '100',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
