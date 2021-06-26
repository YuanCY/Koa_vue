<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script>
import { Editor } from '@bytemd/vue'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.min.css'
const plugins = [
  gfm()
  // Add more plugins here
]

export default {
  components: { Editor },
  data() {
    return { value: '', plugins }
  },
  methods: {
    handleChange(v) {
      this.value = v
    }
  }
}
</script>
