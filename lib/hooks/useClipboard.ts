import { toast } from "react-toastify";

interface useClipboardOptions {
  onSuccess: () => void;
}
export const useClipboard = () => {
  return {
    copy: (text: string, options?: useClipboardOptions) =>
      navigator.clipboard.writeText(text).then(options?.onSuccess),
  };
};
