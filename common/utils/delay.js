/**
 * Execute function after delay
 */
export default (function() {
  let timer = 0;
  return function(callback, ms = 0) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
