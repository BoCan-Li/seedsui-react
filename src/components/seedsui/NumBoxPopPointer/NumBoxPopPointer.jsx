import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumBox from './../NumBox/NumBox.jsx';
import NumBoxPop from './../NumBoxPop/NumBoxPop.jsx';

const UnitStyle = {
  fontSize: '13px',
  marginLeft: '12px'
};

export default class CountInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    count: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    unit: PropTypes.string
  };

  static defaultProps = {
    min: 1,
    max: 99999
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.count || props.min,
      active: props.count > props.min ? true : false || false,
      show: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({
        value: nextProps.count,
        active: nextProps.count > nextProps.min ? true : false,
      });
    }
  }
  onClickCancel = () => {
    this.setState({show: false});
  }
  onClickSubmit = (count) => {
    if (this.props.onChange) this.props.onChange(count);
    this.setState({
      value: count,
      show: false
    });
  }
  onChange = (value) => {
    this.setState({value: value});
  }
  onClickNumBox = () => {
    this.setState({
      show: true
    });
  }
  render() {
    const {min, max, unit} = this.props;
    const {value, show} = this.state;
    return (
      <div style={{position: 'relative'}}>
        <NumBox min={min} max={max} readOnly={true} value={value.toString()} onClick={this.onClickNumBox}/>
        <span style={UnitStyle}>{unit || ''}</span>
        <NumBoxPop show={show} value={value.toString()} min={min} max={max} onClickCancel={this.onClickCancel} onClickSubmit={this.onClickSubmit}/>
      </div>
    );
  }
}
