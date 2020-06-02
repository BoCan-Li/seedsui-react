import React, {forwardRef, useRef, useImperativeHandle, useEffect, useState, Fragment} from 'react';
import Dialog from './../Dialog';
import MenuTiled from './../MenuTiled';

const DropdownDialog = forwardRef(({
  show,
  dialogProps = {},

  list,
  selected,
  onChange,
  menutiledProps = {}
}, ref) => {
  return (
    <Dialog
      animation="slideDown"
      show={show}
      style={{
        width: '100%'
      }}
      {...dialogProps}
    >
      <MenuTiled
        list={list}
        selected={selected}
        onChange={onChange}
        {...menutiledProps}
      />
    </Dialog>
  )
})

export default DropdownDialog
