<template>
  <div class="list p-5 rounded">
    I'm a {{ source }} list
    <ListItem
      :data="entity"
      :item-type="source"
      :key="entity.id"
      v-for="entity in entities"></ListItem>
  </div>
</template>
<script>
  import ListItem from "@/components/test/ListItem";

  export default {
    name: 'List',
    components: {ListItem},
    props: {
      source: {
        type: String,
        default: 'users'
      }
    },
    computed: {
      entities() {
        return this.$store.state.list[this.source]
      }
    },
    mounted() {
      switch (this.source) {
        default:
        case 'users':
          this.loadUsers()
          break
        case 'comments':
          this.loadComments()
          break
      }
    },
    methods: {
      loadUsers() {
        this.$store.dispatch('list/GET_USERS')
      },
      loadComments() {
        console.log(this.$store)
        this.$store.dispatch('list/GET_COMMENTS')
      },
    }
  }
</script>
