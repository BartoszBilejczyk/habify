<template>
  <div class="swipe-button">
    <div class="container bg-primary-300" :class="unlocked && 'container-unlocked'" ref="container">
      <div class="slider bg-primary-800" ref="slider" @touchstart="startDrag">
        <span class="slider-text"></span>
        <span class="slider-arrow"></span>
        <span v-if="!unlocked" class="slider-circle bg-primary"></span>
      </div>
      <div class="text font-bold font-xl" :class="unlocked ? 'text-high text-white' : 'text-primary'">
        {{ unlocked ? 'DONE' : 'SLIDE TO START' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const unlocked = ref(false);
  const slider = ref(null);
  const container = ref(null);
  const containerWidth = ref(0);
  const unmounted = ref(false);
  const sliderLeft = ref(0);
  const isDragging = ref(false);
  const startX = ref(0);
  const isTouchDevice = ref(false);

  onMounted(() => {
    isTouchDevice.value = 'ontouchstart' in document.documentElement;
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
    // @ts-ignore
    containerWidth.value = container.value?.clientWidth - 70;
  });

  const onDrag = (e: any) => {
    if (unmounted.value || unlocked.value) return;
    if (isDragging.value) {
      console.log(e.touches[0]);
      console.log(e.touches[0].clientX);
      console.log(startX.value);
      console.log(containerWidth.value);
      sliderLeft.value = Math.min(Math.max(0, e.touches[0].clientX - startX.value), containerWidth.value);
      updateSliderStyle();
    }
  };

  const updateSliderStyle = () => {
    if (unmounted.value || unlocked.value) return;
    console.log(slider.value);
    // @ts-ignore
    console.log(slider.value.style);
    // @ts-ignore
    slider.value.style.left = sliderLeft.value + 70 + 'px';
    // @ts-ignore
    slider.value.style.width = sliderLeft.value + 70 + 'px';
    // @ts-ignore
    slider.value.style.marginLeft = -1 * (sliderLeft.value + 70) + 'px';
    // @ts-ignore
    console.log('slider.value.style.left', slider.value.style.left);
  };

  const stopDrag = () => {
    if (unmounted.value || unlocked.value) return;
    if (isDragging.value) {
      isDragging.value = false;
      if (sliderLeft.value > containerWidth.value * 0.9) {
        sliderLeft.value = containerWidth.value;
        onSuccess();
      } else {
        sliderLeft.value = 0;
        onFailure();
      }
      updateSliderStyle();
    }
  };

  const startDrag = (e: any) => {
    if (unmounted.value || unlocked.value) return;
    isDragging.value = true;
    startX.value = e.touches[0].clientX;
  };

  const onSuccess = () => {
    console.log(onSuccess);
    // @ts-ignore
    container.value.style.width = container.value.clientWidth + 'px';
    // @ts-ignore
    slider.value.style.left = 0;
    // @ts-ignore
    slider.value.style.width = container.value.clientWidth / 2 + 'px';
    // @ts-ignore
    slider.value.style.marginLeft = (-1 * container.value.clientWidth) / 2 + 'px';
    unlocked.value = true;
  };

  const onFailure = () => {
    console.log(onFailure);
  };

  const reset = () => {
    if (unmounted.value) return;
    unlocked.value = false;
    sliderLeft.value = 0;
    updateSliderStyle();
  };

  onUnmounted(() => {
    unmounted.value = true;
  });
</script>

<style scoped>
  .swipe-button {
    float: left;
    width: 100%;
    height: 50px;
    position: relative;
    border-radius: 25px;
  }
  .swipe-button,
  .swipe-button * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
  }
  .container {
    float: left;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    position: relative;
    /* box-shadow: inset 1px 1px 4px rgba(0,0,0,0.1); */
    overflow: hidden;
  }
  .container-unlocked {
    width: 50% !important;
    margin-left: 25%;
    transition: 0.5s;
    cursor: default;
  }
  .container-unlocked .slider {
    left: 100% !important;
    cursor: default;
    pointer-events: none;
  }
  .container-unlocked .slider-arrow {
    transition: 0.5s;
    margin-right: -60px;
  }
  .container-unlocked .slider-circle {
    transition: 0.5s;
    margin-right: -60px;
  }
  .slider {
    float: left;
    width: 60px;
    position: absolute;
    height: 50px;
    top: 0;
    left: 70px;
    margin-left: -60px;
    border-radius: 25px;
    z-index: 100;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    /*transition: 0.5s ease;*/
  }
  .slider-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 50px;
    text-align: center;
  }
  .slider-arrow {
    float: left;
    position: absolute;
    transform: rotate(45deg);
    border: 2px solid #fff;
    height: 12px;
    width: 12px;
    top: 50%;
    right: 30px;
    margin-top: -7px;
    border-left-color: transparent;
    border-bottom-color: transparent;
    transform-origin: center;
    z-index: 10;
  }
  .slider-circle {
    position: absolute;
    right: 0;
    top: 0;
    height: 50px;
    width: 70px;
    border-radius: 25px;
  }
  .text {
    float: left;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .text-high {
    z-index: 500;
  }
</style>
