import React from 'react';
import locale from './../locale';

const Context = React.createContext({
  locale: function (remark, key, variable) {
    return locale(remark, key, variable)
  },
  language: '',
  portal: null
})

export default Context