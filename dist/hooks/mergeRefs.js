function mergeRefs(...refs) {
  return (instance) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(instance);
      } else {
        ref.current = instance;
      }
    }
  };
}
export {
  mergeRefs
};
