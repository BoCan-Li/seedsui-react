import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from './../List/List.jsx';
import Icon from './../Icon/Icon.jsx';
export default class ListOptions extends Component {
  static propTypes = {
    style: PropTypes.object,
    list: PropTypes.array, // [{img: '', caption: 'xx', active: true}]
    onClick: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      iconCheckedSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAZlBMVEUAAADtRUnsRkrsRUntREfrRUr0PkfsRkrsR0vsREnwRErsRUnsRUjrRknrREnrR0vrRUruREjsRknrRUnsSE3wREbrRUnrSk7rREnxPkPvNzrzMDLsUVTuOz73V1jrRkrpTFDoRkvYiFQfAAAAH3RSTlMAeex+F+IFwa4qDdEh98ugmYRqRTsS2LiPXbJNycBT1BeKNgAAARRJREFUWMPt1MlywyAQRVGM0WjNgy3ZSRr+/yeTSlJ5MilbNCy0sO6WPizoKsTe3rZlbdONAf5AX8khzBOVKswTHQM9pYGemkBPQ6CfAn2zsa839ulrex3qr9ZZ3/Wr/kjoIu4qKiKqMm8/yp+vJXP1iXXWGvpOFk7e2F4k9FuknrwffPzwAjrlq57gcWz+Tt9id4/iE/b7vuIr+EVjhImU4ZGSmKmf7A9vZFdITE0Mj7IScy3Do0Fj8sDw6La4oWN49GGwzfmfP49itdlg/mZ7JRzqAPRwt/9Isf8c2TA8aoFYHk2eHtXaz6OrtnwhmF2A8c+xSpY+E/ziys+j/Azvl4rg/VK1LMu0EP7F/dznYm/PvU8HN1S4n4liVwAAAABJRU5ErkJggg=='
    };
  }

  render() {
    const {style, list, onClick} = this.props;
    return (
      <div>
        {list.map((item, index) => {
          return item.active ?
          <List className="box-middle border-b" style={style} args={[item, index]} key={index} licon={item.img && <Icon src={item.img}/>} ricon={<Icon className="size16" src={this.state.iconCheckedSrc}/>} caption={item.caption} onClick={onClick}/> :
          <List className="box-middle border-b" style={style} args={[item, index]} key={index} licon={item.img && <Icon src={item.img}/>} caption={item.caption} onClick={onClick}/>;
        })}
      </div>
    );
  }
}
