export default {
  // 匹配数字
  // matchNumber: function (str) {
  //   return str.match(/[+-]?(0|([1-9][0-9]*))(\.[0-9]+)?/igm)
  // },
  // // 取出单位中的数字
  // getNumberByUnit: function (unit) {
  //   var match = this.matchNumber(unit)
  //   if (match && match[0]) return match[0]
  //   return 0
  // },
  // // 取出padding的宽高
  // elPaddingSize: function (el) {
  //   var style = window.getComputedStyle(el)
  //   // 转成四个值
  //   var padding = style.getPropertyValue('padding')
  //   var paddingLeft = style.getPropertyValue('padding-left') || 0
  //   var paddingRight = style.getPropertyValue('padding-right') || 0
  //   var paddingTop = style.getPropertyValue('padding-top') || 0
  //   var paddingBottom = style.getPropertyValue('padding-bottom') || 0
  //   if (paddingLeft || paddingRight) {
  //     padding = paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
  //   }
  //   padding = padding.split(' ')
  //   if (padding.length === 1) {
  //     padding = [padding[0], padding[0], padding[0], padding[0]]
  //   } else if (padding.length === 2) {
  //     padding = [padding[0], padding[1], padding[0], padding[1]]
  //   } else if (padding.length === 3) {
  //     padding = [padding[0], padding[1], padding[2], padding[1]]
  //   }
  //   console.log(padding)
  //   // 计算宽高
  //   var width = Number(this.getNumberByUnit(padding[1])) + Number(this.getNumberByUnit(padding[3]))
  //   var height = Number(this.getNumberByUnit(padding[0])) + Number(this.getNumberByUnit(padding[2]))
  //   return {
  //     width: width,
  //     height: height
  //   }
  // },
  sortFixedNums: function (fixedNums) {
    function sortNumber(a, b) {
      return a - b
    }
    return fixedNums.sort(sortNumber)
  },
  colsWidth: [],
  // 设置容器尺寸
  updateContainerSize: function (container, leftFixed, rightFixed) {
    var theadTable = container.querySelector('.fixtable-thead')
    var tbodyTable = container.querySelector('.fixtable-tbody')

    if (!theadTable || !tbodyTable) return
    // 容器总宽度
    var width = tbodyTable.clientWidth
    theadTable.style.width = width + 'px'
    tbodyTable.style.width = width + 'px'
    // 列宽度
    this.colsWidth = []
    var tr = tbodyTable.querySelector('tr')
    if (!tr) return
    ;[].slice.call(tr.children).forEach((td) => {
      this.colsWidth.push(td.clientWidth)
    })
    // 生成col的html代码
    var colHTML = ''
    for (let colWidth of this.colsWidth) {
      colHTML += `<col style="width: ${colWidth}px; min-width: ${colWidth}px;">`
    }
    // 设置colgroup
    ;[].slice.call(container.querySelectorAll('colgroup')).forEach((colgroup) => {
      colgroup.innerHTML = colHTML
    })
    // 左右固定
    var thead = theadTable.querySelector('thead')
    var tbody = tbodyTable.querySelector('tbody')
    if (Array.isArray(leftFixed) && leftFixed.length) {
      this.fixed('left', thead, tbody, leftFixed)
    }
    if (Array.isArray(rightFixed) && rightFixed.length) {
      this.fixed('right', thead, tbody, rightFixed)
    }
  },
  fixed: function (position, thead, tbody, fixedNums) {
    // 为指定列加上粘性定位
    var theadTrs = thead.querySelectorAll('tr')
    var tbodyTrs = tbody.querySelectorAll('tr')
    ;[].slice.call(theadTrs).forEach((tr) => {
      this.fixedTd(position, tr, fixedNums)
    })
    ;[].slice.call(tbodyTrs).forEach((tr) => {
      this.fixedTd(position, tr, fixedNums)
    })
  },
  // 固定td, position: 'left || right'
  fixedTd: function (position, tr, fixedNums) {
    fixedNums = this.sortFixedNums(fixedNums)
    if (!tr) return
    let colsWidth = this.colsWidth
    var tds = tr.children
    if (!tds || !tds.length) return
    tds = [].slice.call(tds)
    // 如果是右侧固定, 则需要反转遍历对象
    if (position === 'right') {
      colsWidth = this.colsWidth.reverse()
      tds = tds.reverse()
    }
    tds.forEach((td, colNum) => {
      if (fixedNums.indexOf(colNum) !== -1) {
        td.classList.add('sticky')
        if (colNum === fixedNums[fixedNums.length - 1]) {
          if (position === 'left') {
            td.classList.add(`left-last`)
          } else if (position === 'right') {
            td.classList.add(`right-first`)
          }
        }
        // 计算位置, 遍历位置数*宽度
        let beforeWidth = 0
        if (colNum > 0) {
          for (let i = 0; i < colNum; i++) {
            beforeWidth += colsWidth[i]
          }
        }
        td.style[position] = beforeWidth + 'px'
      }
    })
    // 如果是右侧固定, 完成后需要反转回来
    if (position === 'right') {
      this.colsWidth.reverse()
    }
  },
  // 滚动修改左右滚动样式, 和底部加载
  onScroll: function (container, onBottomRefresh) {
    // 左右滚动样式, 为了显隐投影
    var scrollLeft =
      container === document.body ? document.documentElement.scrollLeft : container.scrollLeft
    var clientWidth = container.clientWidth
    var scrollWidth = container.scrollWidth
    if (clientWidth !== scrollWidth) {
      // 有滚动条的情况
      if (scrollLeft + clientWidth >= scrollWidth) {
        // 最右边
        container.classList.remove('fixtable-ping-right')
        container.classList.add('fixtable-ping-left')
      } else if (scrollLeft === 0) {
        // 最左边
        container.classList.remove('fixtable-ping-left')
        container.classList.add('fixtable-ping-right')
      } else {
        container.classList.add('fixtable-ping-left')
        container.classList.add('fixtable-ping-right')
      }
    }
    // 滚动到底部事件
    if (!onBottomRefresh) return
    var clientHeight = container.clientHeight
    var scrollHeight = container.scrollHeight
    var scrollTop =
      container === document.body ? document.documentElement.scrollTop : container.scrollTop
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      onBottomRefresh()
    }
  }
}
