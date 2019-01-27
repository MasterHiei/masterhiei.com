<template>
  <div>
    <no-ssr>
      {{ articles }}
      {{ count }}
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
  },
}
</script>
