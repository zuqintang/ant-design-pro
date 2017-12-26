/**
* @fileoverview xx
* @author login-typo
*/

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
