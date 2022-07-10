import { reactive } from 'vue';
import { Challenge } from '../types';

const stepOne = reactive<Partial<Challenge>>({
  title: '',
  duration: '',
  betCategory: null,
  betDetails: '',
  type: null,
});

export default function useStore() {
  return { stepOne };
}
