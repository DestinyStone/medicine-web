<template>
  <div>
    <check-main v-show="current === map[0]" @next="handlerNext"/>
    <check-component :disease-options="diseaseOptions"
                     :medicine1-options="medicine1Options"
                     :medicine2-options="medicine2Options"
                     v-show="current === map[1]"
                     @next="handlerNext"
                     @back="handlerBack"/>
    <check-number v-show="current === map[2]"
                  :form="form"
                  :disease-options="diseaseOptions"
                  :component-form="componentForm"
                  @back="handlerBack"
                  @finish="handlerFinish"/>
  </div>
</template>

<script>
  import CheckMain from "./component/check-main";
  import CheckComponent from "./component/check-component";
  import CheckNumber from "./component/check-number";
  export default {
    name: "index",
    components: {CheckNumber, CheckComponent, CheckMain},
    data() {
      return {
        currentIndex: 0,
        current: "main",
        map: ["main", "component", "numbers"],
        form: {},
        diseaseOptions: [],
        medicine1Options: [],
        medicine2Options: [],
        componentForm: {},
      }
    },
    methods: {
      handlerBack() {
        this.current = this.map[--this.currentIndex];
      },
      handlerNext(data) {
        console.log(data);
        if (this.currentIndex === 0) {
          this.form = data.form;
          this.diseaseOptions = data.diseaseOptions;
          this.medicine1Options = data.medicine1Options;
          this.medicine2Options = data.medicine2Options;
        }
        if (this.currentIndex === 1) {
          this.componentForm = data.component;
        }
        this.current = this.map[++this.currentIndex];
      },
      handlerFinish() {
        this.$router.push({path: "/business/case"})
      }
    }
  }
</script>

<style scoped>

</style>
