import React, {forwardRef, useRef, useImperativeHandle, useEffect, useState, Fragment} from 'react';
import Dialog from './../Dialog';
import MenuTiled from './../MenuTiled';

const DropdownDialog = forwardRef(({
  top,
  show,
  onClickMask,
  dialogProps = {},

  list,
  selected,
  onChange,
  menutiledProps = {}
}, ref) => {
  return (
    <Dialog
      maskAttribute={{onClick: onClickMask, style: {top: top + 'px'}}}
      animation="slideDown"
      style={{width: '100%'}}
      show={show}
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
