export const reactRules = {
  'react/jsx-no-leaked-render': [
    'error',
    {
      validStrategies: ['ternary'],
    },
  ],
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': [
    'error',
    {
      additionalHooks:
        '(useMatchMediaEffect|useDebouncedCallback|useThrottleCallback|useIntersectionObserverEffect|useResizeObserverEffect|useScreenOrientationEffect|useMutationObserverEffect|useBroadcastReceiverEffect|useSetTimeoutCallback)',
    },
  ],
  'class-methods-use-this': [
    'error',
    {
      exceptMethods: [
        'render',
        'getInitialState',
        'getDefaultProps',
        'getChildContext',
        'componentWillMount',
        'UNSAFE_componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'UNSAFE_componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'UNSAFE_componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
        'componentDidCatch',
        'getSnapshotBeforeUpdate',
      ],
    },
  ],
  'react/forbid-prop-types': [
    'error',
    {
      forbid: ['any', 'array', 'object'],
      checkContextTypes: true,
      checkChildContextTypes: true,
    },
  ],
  'react/jsx-boolean-value': [
    'error',
    'never',
    {
      always: [],
    },
  ],
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  'react/jsx-closing-tag-location': 'error',
  'react/jsx-curly-spacing': [
    'error',
    'never',
    {
      allowMultiline: true,
    },
  ],
  'react/jsx-no-bind': [
    'error',
    {
      ignoreRefs: true,
      allowArrowFunctions: true,
      allowFunctions: false,
      allowBind: false,
      ignoreDOMComponents: true,
    },
  ],
  'react/jsx-no-duplicate-props': [
    'error',
    {
      ignoreCase: true,
    },
  ],
  'react/jsx-pascal-case': [
    'error',
    {
      allowAllCaps: true,
      allowNamespace: true,
      ignore: [],
    },
  ],
  'react/jsx-uses-react': ['error'],
  'react/jsx-uses-vars': 'error',
  'react/no-deprecated': ['error'],
  'react/no-did-mount-set-state': 'off',
  'react/no-did-update-set-state': 'error',
  'react/no-will-update-set-state': 'error',
  'react/no-direct-mutation-state': 'off',
  'react/no-is-mounted': 'error',
  'react/no-multi-comp': 'off',
  'react/no-set-state': 'off',
  'react/no-string-refs': 'error',
  'react/no-unknown-property': [
    'error',
    {
      ignore: ['jsx', 'global'],
    },
  ],
  'react/prefer-es6-class': ['error', 'always'],
  'react/prefer-stateless-function': [
    'error',
    {
      ignorePureComponents: true,
    },
  ],
  'react/require-render-return': 'error',
  'react/self-closing-comp': 'error',
  'react/jsx-wrap-multilines': [
    'error',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    },
  ],
  'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
  'react/jsx-equals-spacing': ['error', 'never'],
  'react/jsx-indent': ['error', 2],
  'react/jsx-no-target-blank': [
    'error',
    {
      enforceDynamicLinks: 'always',
    },
  ],
  'react/jsx-no-comment-textnodes': 'error',
  'react/no-render-return-value': 'error',
  'react/no-find-dom-node': 'error',
  'react/forbid-component-props': [
    'off',
    {
      forbid: [],
    },
  ],
  'react/forbid-elements': [
    'off',
    {
      forbid: [],
    },
  ],
  'react/no-unused-prop-types': [
    'error',
    {
      customValidators: [],
      skipShapeProps: true,
    },
  ],
  'react/style-prop-object': 'error',
  'react/no-unescaped-entities': 'error',
  'react/no-children-prop': 'error',
  'react/jsx-tag-spacing': [
    'error',
    {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    },
  ],
  'react/jsx-space-before-closing': ['off', 'always'],
  'react/forbid-foreign-prop-types': [
    'warn',
    {
      allowInPropTypes: true,
    },
  ],
  'react/void-dom-elements-no-children': 'error',
  'react/default-props-match-prop-types': [
    'error',
    {
      allowRequiredDefaults: false,
    },
  ],
  'react/no-redundant-should-component-update': 'error',
  'react/no-unused-state': 'error',
  'react/boolean-prop-naming': [
    'off',
    {
      propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
      rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      message: '',
    },
  ],
  'react/no-typos': 'error',
  'react/jsx-curly-brace-presence': [
    'error',
    {
      props: 'never',
      children: 'never',
    },
  ],
  // 'react/jsx-one-expression-per-line': [
  //   'error',
  //   {
  //     allow: 'single-child',
  //   },
  // ],
  'react/jsx-one-expression-per-line': 'off',
  'react/destructuring-assignment': ['error', 'always'],
  'react/no-access-state-in-setstate': 'error',
  'react/jsx-child-element-spacing': 'off',
  'react/no-this-in-sfc': 'error',
  'react/jsx-max-depth': 'off',
  'react/jsx-props-no-multi-spaces': 'error',
  'react/no-unsafe': 'off',
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-curly-newline': [
    'error',
    {
      multiline: 'consistent',
      singleline: 'consistent',
    },
  ],
  'react/state-in-constructor': ['error', 'always'],
  'react/static-property-placement': ['error', 'property assignment'],
  'react/prefer-read-only-props': 'off',
  'react/jsx-no-script-url': [
    'error',
    [
      {
        name: 'Link',
        props: ['to'],
      },
    ],
  ],
  'react/jsx-no-useless-fragment': 'error',
  'react/no-adjacent-inline-elements': 'off',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: [
        'function-declaration',
        'function-expression',
        'arrow-function',
      ],
      unnamedComponents: 'function-expression',
    },
  ],
  'react/jsx-newline': 'off',
  'react/jsx-no-constructed-context-values': 'error',
  'react/no-unstable-nested-components': [
    'error',
    {
      allowAsProps: true,
    },
  ],
  'react/no-namespace': 'error',
  'react/prefer-exact-props': 'error',
  'react/no-arrow-function-lifecycle': 'error',
  'react/no-invalid-html-attribute': 'error',
  'react/no-unused-class-component-methods': 'error',
};
