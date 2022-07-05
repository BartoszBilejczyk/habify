import { ref, reactive } from 'vue';

const stepOne = reactive({
  title: '',
  duration: '',
  betCategory: '',
  betDetails: '',
  type: '',
});

export default function useNewChallenge() {
  return { stepOne };
}
