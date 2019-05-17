/**
 * Execute function after delay
 */
export default (function(): (callback: () => void, ms?: number) => void {
  let timer: NodeJS.Timeout;
  return (callback, ms = 0): void => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
