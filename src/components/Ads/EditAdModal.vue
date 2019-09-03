<template>
  <v-dialog width="500" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" v-on="on" v-if="isUser && isOwner">Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                label="Title"
                name="title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                label="Description"
                name="description"
                type="text"
                multi-line
                v-model="editedDescription"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">Cancel</v-btn>
              <v-btn class="success" text @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  computed: {
    isOwner () {
      return this.ad.owner === this.$store.getters.user.id
    },
    isUser () {
      return this.$store.getters.user !== null
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.ad.title
      this.editedDescription = this.ad.description
      this.modal = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updatedAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
      }
      this.modal = false
    }
  }
}
</script>
