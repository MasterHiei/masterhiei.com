import Vue from 'vue';
import hljs from 'highlight.js/lib/highlight';
import bash from 'highlight.js/lib/languages/bash';
import diff from 'highlight.js/lib/languages/diff';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import objectivec from 'highlight.js/lib/languages/objectivec';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/darcula.css';

// Register highlight languages
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('objectivec', objectivec);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('typescript', typescript);

// Inject hljs into Vue instance
Vue.prototype.$hljs = hljs;
