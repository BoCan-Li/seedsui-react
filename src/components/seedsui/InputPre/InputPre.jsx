import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputPre extends Component {
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }
  static defaultProps = {
    value: ''
  }
  constructor(props) {
    super(props);
  }
  onInput = (e) => {
    var textarea = e.target;
    var pre = textarea.nextElementSibling;
    pre.children[0].innerText = textarea.value;
    textarea.style.height = pre.clientHeight + 'px';
    if (this.props.onChange) this.props.onChange(textarea.value);
  }
  render() {
    const { placeholder, style, value } = this.props;
    return (
      <div style={Object.assign({position: 'relative', backgroundColor: 'white', lineHeight: '0'}, style)}>
        <textarea className="input-pre" style={{width: '100%', margin: '8px 0'}} placeholder={placeholder} onChange={this.onInput} defaultValue={value}></textarea>
        <pre style={{width: '100%'}} ref="refPre"><span>{value}</span></pre>
      </div>
    );
  }
}
