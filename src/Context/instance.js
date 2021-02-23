import React from 'react';
import getLocaleValue from './../locale'

const Context = React.createContext({
  locale: function (remark, key, variable) {
    return getLocaleValue(remark, key, variable)
  },
  language: '',
  portal: null
})

export default Context