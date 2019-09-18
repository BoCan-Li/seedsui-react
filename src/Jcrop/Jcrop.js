import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from 'jcrop';
import 'jcrop/dist/jcrop.css'; // Jcrop

export default class Jcrop extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    src: PropTypes.string,
    rect: PropTypes.array, // [10,10,100,100]
    scale: PropTypes.array, // [.7,.5]
    options: PropTypes.object,
    onChange: PropTypes.func
  }
  static defaultProps = {
    scale: [.7,.5],
    options: {
      multi: false
    }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.update();
  }
  formatPos = (argPos) => {
    var pos = argPos;
    for (let n in argPos) {
      if (n === 'h') pos['height'] = argPos[n];
      else if (n === 'w') pos['width'] = argPos[n];
    }
    return pos;
  }
  update = () => {
    if (!this.props.src) return;
    const {rect, scale} = this.props;
    Instance.load(this.$el).then(img => {
      var jcp = Instance.attach(img, this.props.options);
      var frame = null;
      let pos = {};
      // 按尺寸创建
      if (rect) {
        pos = {
          x: rect[0],
          y: rect[1],
          w: rect[2],
          h: rect[3]
        }
        frame = Instance.Rect.create(pos.x, pos.y, pos.w, pos.h);
        jcp.newWidget(frame);
      // 按比例创建
      } else {
        frame = Instance.Rect.sizeOf(jcp.el);
        pos = frame.scale(...scale).center(frame.w,frame.h);
        jcp.newWidget(pos);
      }
      if (this.props.onChange) this.props.onChange({pos: this.formatPos(pos), src: this.props.src});
      jcp.listen('crop.change', (widget, e) => {
        pos = this.formatPos(widget.pos);
        if (this.props.onChange) this.props.onChange({pos, src: this.props.src});
      });
    }).catch((err) => {
      console.error(err);
    });
  }
  render() {
    const {rect, scale, options, onChange, src, style, className, ...others} = this.props;
    return (
      <img alt="" ref={(el) => {this.$el = el;}} className={className} style={Object.assign({maxWidth: '100%'}, style)} src={src} {...others}/>
    );
  }
}
