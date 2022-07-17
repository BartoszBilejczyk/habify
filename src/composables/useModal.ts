import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { ref } from 'vue';

export const useModal = createGlobalState(() => {
  const modalComponent = ref<any>(false);

  const setModalComponent = (value: any) => {
    modalComponent.value = value;
  };

  return {
    modalComponent,
    setModalComponent,
  };
});
