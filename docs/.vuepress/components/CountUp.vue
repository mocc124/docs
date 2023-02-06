<template>
  <div class="container">
    <ClientOnly>
      <slot name="before"></slot>
      <span ref="countUp" class="tag"></span>
    </ClientOnly>
    <hr>
  </div>
</template>

<script>
export default {
  name: "CountUP",
  data(){
    return {
      counter:null
    }
  },
  methods:{
    init() {
      import('countup.js').then(module => {
        this.counter = new module.CountUp(this.$refs.countUp, 0, {
          startVal:this.$props.startVal,
        })
        if (!this.counter.error) {
          setTimeout(()=>{
            this.counter.start();
          },this.$props.delay)
        } else {
          console.error(this.counter.error);
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy() {
    this.counter.reset();
    this.counter = null;
  },
  props:{
    startVal:{
      type: Number,
      default() {
        return 2000
      }
    },
    delay: {
      type:Number,
      default() {
        return 1
      }
    }
  }
}
</script>

<style scoped>

</style>