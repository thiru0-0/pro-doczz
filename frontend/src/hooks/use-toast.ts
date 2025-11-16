export function useToast() {
  return {
    toast: ({ title, description }: { title?: string; description?: string }) => {
      // Minimal: console log. Real app should show a UI toast.
      console.log('Toast:', title, description);
    }
  };
}
