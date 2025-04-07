export const tsRules = {
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/typedef': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': [
    'error',
    {
      allowDefaultCaseForExhaustiveSwitch: true,
      considerDefaultExhaustiveForUnions: true,
      requireDefaultForNonUnion: true,
    },
  ],
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
    },
  ],
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/restrict-plus-operands': [
    'error',
    {
      skipCompoundAssignments: true,
      allowBoolean: false,
      allowNullish: false,
      allowNumberAndString: false,
      allowRegExp: false,
      allowAny: false,
    },
  ],
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: false,
    },
  ],
  'no-restricted-syntax': [
    'error',
    {
      selector: 'TSEnumDeclaration',
      message:
        'Use Object Literal instead. https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums#%E5%88%97%E6%8C%99%E5%9E%8B%E3%81%AE%E4%BB%A3%E6%9B%BF%E6%A1%882-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB',
    },
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'LabeledStatement',
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  // js
  'array-callback-return': [
    'error',
    {
      allowImplicit: true,
    },
  ],
  complexity: ['off', 20],
  'class-methods-use-this': [
    'error',
    {
      exceptMethods: [],
    },
  ],
  curly: ['error', 'multi-line'],
  // 'default-case': [
  //   'error',
  //   {
  //     commentPattern: '^no default$',
  //   },
  // ],
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': [
    'error',
    {
      allowKeywords: true,
    },
  ],
  eqeqeq: ['error', 'always'],
  'grouped-accessor-pairs': 'error',
  'max-classes-per-file': ['error', 1],
  'no-caller': 'error',
  'no-constructor-return': 'error',
  'no-div-regex': 'off',
  'no-else-return': [
    'error',
    {
      allowElseIf: false,
    },
  ],
  'no-empty-function': [
    'error',
    {
      allow: ['arrowFunctions', 'functions', 'methods'],
    },
  ],
  'no-empty-pattern': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-fallthrough': 'error',
  'no-floating-decimal': 'error',
  'no-global-assign': [
    'error',
    {
      exceptions: [],
    },
  ],
  'no-native-reassign': 'error',
  'no-implicit-coercion': 'error',
  'no-implicit-globals': 'off',
  'no-implied-eval': 'error',
  'no-invalid-this': 'off',
  'no-iterator': 'error',
  'no-labels': [
    'error',
    {
      allowLoop: false,
      allowSwitch: false,
    },
  ],
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-magic-numbers': [
    'off',
    {
      ignore: [],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false,
    },
  ],
  'no-multi-str': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-nonoctal-decimal-escape': 'error',
  'no-object-constructor': 'off',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': [
    'error',
    {
      props: true,
      ignorePropertyModificationsFor: [
        'acc',
        'accumulator',
        'e',
        'ctx',
        'context',
        'req',
        'request',
        'res',
        'response',
        '$scope',
        'staticContext',
      ],
    },
  ],
  'no-proto': 'error',
  'no-redeclare': 'error',
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-script-url': 'error',
  'no-self-assign': [
    'error',
    {
      props: true,
    },
  ],
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-throw-literal': 'error',
  'no-unmodified-loop-condition': 'off',
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
    },
  ],
  'no-unused-labels': 'error',
  'no-useless-call': 'off',
  'no-useless-catch': 'off',
  'no-useless-concat': 'error',
  'no-useless-escape': 'error',
  'no-useless-return': 'error',
  'no-void': 'off',
  'no-warning-comments': [
    'off',
    {
      terms: ['todo', 'fixme', 'xxx'],
      location: 'start',
    },
  ],
  'no-with': 'error',
  'prefer-promise-reject-errors': [
    'error',
    {
      allowEmptyReject: true,
    },
  ],
  'prefer-named-capture-group': 'off',
  'prefer-object-has-own': 'off',
  'prefer-regex-literals': [
    'error',
    {
      disallowRedundantWrapping: true,
    },
  ],
  radix: 'error',
  'require-unicode-regexp': 'off',
  'vars-on-top': 'error',
  'wrap-iife': [
    'error',
    'outside',
    {
      functionPrototypeMethods: false,
    },
  ],
  yoda: 'error',
  semi: 'error',
  'prefer-template': 'error',
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: true,
        object: true,
      },
    },
    {
      enforceForRenamedProperties: false,
    },
  ],
  quotes: ['error', 'single'],
  'prefer-arrow-callback': [
    'error',
    {
      allowUnboundThis: false,
    },
  ],
  'no-restricted-globals': [
    'error',
    'eval',
    'Boolean',
    'Function',
    'globalThis',
    {
      name: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      name: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      name: 'addEventListener',
      message:
        'Use window.addEventListener instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'blur',
      message:
        'Use window.blur instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'close',
      message:
        'Use window.close instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'closed',
      message:
        'Use window.closed instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'confirm',
      message:
        'Use window.confirm instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'defaultStatus',
      message:
        'Use window.defaultStatus instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'defaultstatus',
      message:
        'Use window.defaultstatus instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'event',
      message:
        'Use window.event instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'external',
      message:
        'Use window.external instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'find',
      message:
        'Use window.find instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'focus',
      message:
        'Use window.focus instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'frameElement',
      message:
        'Use window.frameElement instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'frames',
      message:
        'Use window.frames instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'history',
      message:
        'Use window.history instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'innerHeight',
      message:
        'Use window.innerHeight instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'innerWidth',
      message:
        'Use window.innerWidth instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'length',
      message:
        'Use window.length instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'location',
      message:
        'Use window.location instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'locationbar',
      message:
        'Use window.locationbar instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'menubar',
      message:
        'Use window.menubar instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'moveBy',
      message:
        'Use window.moveBy instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'moveTo',
      message:
        'Use window.moveTo instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'name',
      message:
        'Use window.name instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onblur',
      message:
        'Use window.onblur instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onerror',
      message:
        'Use window.onerror instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onfocus',
      message:
        'Use window.onfocus instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onload',
      message:
        'Use window.onload instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onresize',
      message:
        'Use window.onresize instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'onunload',
      message:
        'Use window.onunload instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'open',
      message:
        'Use window.open instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'opener',
      message:
        'Use window.opener instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'opera',
      message:
        'Use window.opera instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'outerHeight',
      message:
        'Use window.outerHeight instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'outerWidth',
      message:
        'Use window.outerWidth instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'pageXOffset',
      message:
        'Use window.pageXOffset instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'pageYOffset',
      message:
        'Use window.pageYOffset instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'parent',
      message:
        'Use window.parent instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'print',
      message:
        'Use window.print instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'removeEventListener',
      message:
        'Use window.removeEventListener instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'resizeBy',
      message:
        'Use window.resizeBy instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'resizeTo',
      message:
        'Use window.resizeTo instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'screen',
      message:
        'Use window.screen instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'screenLeft',
      message:
        'Use window.screenLeft instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'screenTop',
      message:
        'Use window.screenTop instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'screenX',
      message:
        'Use window.screenX instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'screenY',
      message:
        'Use window.screenY instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scroll',
      message:
        'Use window.scroll instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scrollbars',
      message:
        'Use window.scrollbars instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scrollBy',
      message:
        'Use window.scrollBy instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scrollTo',
      message:
        'Use window.scrollTo instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scrollX',
      message:
        'Use window.scrollX instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'scrollY',
      message:
        'Use window.scrollY instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'self',
      message:
        'Use window.self instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'status',
      message:
        'Use window.status instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'statusbar',
      message:
        'Use window.statusbar instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'stop',
      message:
        'Use window.stop instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'toolbar',
      message:
        'Use window.toolbar instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
    {
      name: 'top',
      message:
        'Use window.top instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md',
    },
  ],
  'no-restricted-properties': [
    'error',
    {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    },
    {
      object: 'global',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'self',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'window',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'global',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'self',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'window',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    },
  ],
};
