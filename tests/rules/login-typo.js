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
      description: 'xx',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or 'code' or 'whitespace'
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
        if (typeof node.value === 'string' && node.value === '登陆') {
          context.report({
            node,
            message: '使用了 {{ character }}，请使用『登录』代替',
            data: {
              character: node.raw,
            },
          });
        }
      },
    };
  },
};
