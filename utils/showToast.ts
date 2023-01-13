const toastMessage = ref("");
const isToastShowing = ref(false);
export const useIsToastShowing = () => isToastShowing;
export const useToastMessage = () => toastMessage;
export default async (message: string) => {
  toastMessage.value = message;
  isToastShowing.value = false;
  await nextTick();
  isToastShowing.value = true;
};
