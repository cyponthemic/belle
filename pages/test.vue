<template>
  <div class="flex justify-center">
    <div class="w-1/4">
      <List></List>
    </div>
    <div class="mx-32 w-1/4">
      <List source="comments"></List>
    </div>
  </div>
</template>

<script>
  import List from "@/components/test/List";

  export default {
    layout: 'test',
    components: {List}
  }
</script>
