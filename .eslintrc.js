module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi':[0,'always'],//分号
    // 'indent':0
    "space-before-blocks": [1, "always"], //代码块前的空格
    "space-before-function-paren": [0, "always"],//函数定义时，function关键字后面的小括号前是否需要加空格
    "quotes": [0, "never"],
    "comma-dangle": [0, "never"],//最后一个逗号控制,
    "no-undef": 0,
    "no-constant-condition": 0,
    "no-trailing-spaces":0,
    "no-multiple-empty-lines":0,  
    "padded-blocks":0,
    "indent":0,
    "no-multi-spaces":0,
    "no-unused-vars":0,
    "semi-spacing":0,
    "spaced-comment":0,
    "space-in-parens":0,
    "comma-spacing":0,
    "key-spacing":0,
    "space-before-blocks":0,
    "no-dupe-keys":0,
    "space-infix-ops":0,
    
    
    
    

   
    

    
    
   
    
    
   
   
  }
}
