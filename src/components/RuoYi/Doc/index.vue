<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiDoc',
  data() {
    return {
      url: 'https://gitee.com/xiao-i-fei/project-management'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
