<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md8 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            :rules="[v => !!v || 'Title is required']"
            v-model="title"
            required
          ></v-text-field>

          <v-textarea
            label="Description"
            name="description"
            type="text"
            :rules="[v => !!v || 'Description is required']"
            v-model="description"
            required
            aria-multiline="true"
          ></v-textarea>
        </v-form>
        <v-flex xs12>
          <v-row>
            <v-btn text class="warning mb-3"
            @click="uploadFile"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            >
          </v-row>
        </v-flex>
        <v-flex xs12>
          <v-row>
           <v-img :src="imageSrc" height="250" v-if="imageSrc"></v-img>
          </v-row>
        </v-flex>
        <v-flex xs12>
          <v-row>
            <v-switch
              color="primary"
              v-model="promo"
              label="Ad to promo?"
            ></v-switch>
          </v-row>
        </v-flex>
        <v-flex xs12>
          <v-row>
            <v-btn
              text
              class="success mb-3"
              @click="createAd"
              :loading="loading"
              :disabled="!valid || !image || loading"
            >Create ad
            </v-btn>
          </v-row>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    uploadFile () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = ev => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
