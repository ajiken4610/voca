const confirmMessage = ref("");
const confirmTitle = ref("");
const isConfirmShowing = ref(false);
const confirmResult = ref<null | boolean>(null);
export const useIsConfirmShowing = () => isConfirmShowing;
export const useConfirmMessage = () => confirmMessage;
export const useConfirmTitle = () => confirmTitle;
export const useConfirmResult = () => confirmResult;
export default (message: string, title?: string) => {
  return new Promise((resolve) => {
    confirmMessage.value = message;
    confirmTitle.value = title || "";
    isConfirmShowing.value = true;
    const describe = watch(confirmResult, () => {
      describe();
      resolve(confirmResult.value);
    });
  });
};
