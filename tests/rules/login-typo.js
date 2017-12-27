/**
* @fileoverview xx
* @author login-typo
*/

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const sound = require('mac-sounds');
const NotificationCenter = require('node-notifier').NotificationCenter;

const notifier = new NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: void 0 // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});

module.exports = {
  meta: {
    docs: {
      description: '修改常见的中文错误',
      category: 'Typo',
      recommended: false,
    },
    fixable: 'code', // or 'code' or 'whitespace'
    schema: [
      // fill in your schema
    ],
  },

  create: (context) => {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Literal: (node) => {
        if (typeof node.value === 'string' && node.raw.indexOf('登陆') >= 0) {
          sound('ping');
          notifier.notify({
            'title': 'Eslint: login-typo',
            'message': context.getFilename().replace(process.cwd(), '') + ': 使用了『登陆』，请使用『登录』代替',
          });
          context.report({
            node,
            message: '使用了『登陆』，请使用『登录』代替',
            fix: fixer => {
              const start = node.raw.indexOf('登陆');
              return fixer.replaceTextRange([node.range[0] + start, node.range[0] + start + 2], '登录');
            }
          });
        }
      },
    };
  },
};
