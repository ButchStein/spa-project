<template>
  <div>
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="ad in promoAds"
          :key="ad.id"
          :src="ad.imageSrc"
        >
          <div class="car-link">
            <v-btn class="error" :to="'/ad/' + ad.id">
              {{ ad.title }}
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col class="col-xs-12 col-sm-6 col-lg-4"
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-card
            class="mx-auto"
            max-width="600"

          >
            <v-img
              class="white--text"
              height="200px"
              :src="ad.imageSrc"
            >
            </v-img>
            <v-card-title class="align-end fill-height">{{ ad.title }}</v-card-title>
            <v-card-text>
              {{ ad.description }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                tile
                :to="'/ad/' + ad.id"
              >
                Open
              </v-btn>
              <v-btn
                raised
                color="primary"
              >
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    }
  }
}
</script>
<style scoped>
  .car-link{
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .2);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
</style>
