<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["success", "failed"]);
const leftP = ref("0");
const blockState = ref(0);
const startP = ref(undefined);
const sliderContainer = ref(undefined);

const onMouseDown = (e) => {
  if (blockState.value !== 2) {
    leftP.value = "0";
    blockState.value = 1;
    startP.value = {
      clientX: e.clientX,
    };
  }
};

const onMouseMove = (e) => {
  if (blockState.value === 1) {
    let width = e.clientX - startP.value.clientX;
    if (width + 40 > 260) {
      leftP.value = 260 - 40 + "px";
      blockState.value = 2;
      emit("success");
    } else {
      leftP.value = width + "px";
    }
  }
};

const onMouseUp = (e) => {
  if (blockState.value !== 2) {
    leftP.value = "0";
    blockState.value = 0;
    emit("failed");
  }
};

const onMouseLeave = (e) => {
  if (blockState.value !== 2) {
    leftP.value = "0";
    blockState.value = 0;
    emit("failed");
  }
};
</script>

<template>
  <div
      ref="sliderContainer"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      class="slider-verify-container"
      @mouseleave="onMouseLeave">
    <span v-if="blockState === 0" style="margin-left: 20px">请按住滑块，拖动到最右边</span>
    <div
        @mousedown="onMouseDown"
        :style="{ left: leftP }"
        class="slider-verify-block"
    />
    <div :style="{ width: leftP }" class="slider-verify-complete">
      <span v-if="blockState === 2">验证成功!</span>
    </div>
  </div>

</template>

<style scoped lang="scss">
.slider-verify-container {
  width: 260px;
  height: 40px;
  background-color: #A8ABB2;
  position: relative;
  border: solid 1px #A8ABB2;
  text-align: center;
  color: #fff;
  line-height: 40px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
.slider-verify-complete {
  width: 0;
  height: 40px;
  position: absolute;
  background-color: #409EFF;
  left: 0;
  top: 0;
}
.slider-verify-block {
  width: 40px;
  height: 40px;
  background-image: url("@/assets/arror.png");
  background-color: white;
  position: absolute;
  left: 0;
  top: -1px;
  border: solid 1px #409EFF;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}

</style>