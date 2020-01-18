import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, InputDate, ConfigProvider} from '../../src';

const zh = {
  'cancel': '取消',
  'ok': '确定',
  'finish': '完成',
  'submit': '提交',
  'uploaded_completed': '上传完成',
  'cannot_preview': '无法预览',
  'invalid_image_src': '图片地址无效',
  'hint_image_failed_to_load': '图片加载失败',
  'hint_choose_image_failed': '选择图片失败, 请稍后再试',
  'hint_upload_image_must_dir': '没有上传目录',
  'hint_upload_image_must_localIds': '没有上传图片地址',
  'hint_upload_image_must_tenantId': '没有上传企业id',
  'hint_preview_image_must_urls': '没有预览图片地址',
  'hint_video_record_version': '视频录制功能需要升级至6.2.2及以上的客户端',
  'hint_video_record_failed': '录制失败',
  'hint_video_upload_version': '视频上传功能需要升级至6.2.2及以上的客户端',
  'hint_video_upload_failed': '上传失败',
  'hint_video_info_version': '视频功能需要升级至6.2.2及以上的客户端',
  'hint_video_info_failed': '未查到此视频信息',
  'hint_get_customer_area_more_version': '此功能需要升级至6.2.2及以上的客户端',
  'hint_open_native_page_must_ios_url': '此功能需要升级至6.2.2及以上的客户端',
  'hint_open_native_page_must_android_url': '此功能需要升级至6.2.2及以上的客户端',
  'hint_only_wqapp': '此功能仅可在外勤客户端中使用',
  'hint_only_app': '此功能仅可在APP中使用',
  'hint_only_app_and_wx': '此功能仅可在微信或APP中使用',
  'hint_only_mobile': '此功能仅可在手机中使用',
  'hint_scan_failed': '扫码失败',
  'hint_try_again_later': '请稍后重试',
  'hint_max_upload': '最多只能传',
  'photos': '张照片',
  'hint_cannot_be_less_than': '不能小于',
  'hint_cannot_be_greater_than': '不能大于',
  'hint_must_number': '必须要输入数字哦',
  'hint_invalid_date': '无效的日期格式',
  'star': '颗星',
  'loading': '正在加载...',
  'hint_hideloading_after_showloading': 'showLoading后才能hideLoading',
  'hint_address_failed': '获取地址失败, 请稍后重试',
  'hint_location_failed': '定位失败, 请检查定位权限是否开启',
  'hint_location_map_failed': '定位失败, 请检查定位权限是否开启',
  'hint_weather_failed': '获取天气失败, 请稍后重试',
  'confirm_quit_page': '您确定要离开此页面吗?',
  'unit_year': '年', // 未使用,YYYY年
  'unit_month': '月', // 未使用,MM月
  'unit_date': '日', // 未使用,DD日
  'unit_hour': '时', // 未使用,hh时
  'unit_minute': '分', // 未使用,mm分
  'unit_second': '秒', // 未使用,ss秒
  'unit_week': '周', // 未使用,WW周
  'unit_weeks_before': 'the', // 未使用,第EE周
  'unit_weeks_after': 'weeks', // 未使用,第EE周
  'unit_season': '季', // 未使用,Q
  'the': '第',
  'th_image_failed_to_upload': '张图片上传失败',
  're_photo_upload': '请重新拍照上传',
  'copied_to_the_clipboard': '复制到剪贴板成功',
  'unable_to_access_clipboard': '当前设备不允许访问剪贴板',
  'refreshing': '正在刷新...', // 英文仍然翻译成loading...
  'no_more_data': '没有更多数据了',
  'refreshing_failed': '加载失败, 请稍后再试', // 英文翻译成loading failed
  'release': '释放立即刷新',
  'pull_down': '下拉可以刷新',
  'say_something': '说点什么吧...',
  'location': '定位中...',
  'low': '弱',
  'medium': '中',
  'strong': '强',
  'hint_pass_in_parameters': '请传入参数',
  'hint_pass_in_correct_parameters': '请传入正确的参数',
  'wrong_parameter': '参数不正确',
  'method': '方法',
  'or': '或者',
  'menu': '菜单',
  'hint_for_example_address': '例如“江苏省南京市建邺区”',
  'no_data': '暂无数据'
};


const en = {
  'cancel': 'Cancel',
  'ok': 'Ok',
  'finish': 'Finish',
  'submit': 'Submit',
  'uploaded_completed': 'Uploaded Completed',
  'cannot_preview': 'Cannot Preview',
  'invalid_image_src': 'Invalid Image Src',
  'hint_image_failed_to_load': '图片加载失败',
  'hint_choose_image_failed': '选择图片失败, 请稍后再试',
  'hint_upload_image_must_dir': '没有上传目录',
  'hint_upload_image_must_localIds': '没有上传图片地址',
  'hint_upload_image_must_tenantId': '没有上传企业id',
  'hint_preview_image_must_urls': '没有预览图片地址',
  'hint_video_record_version': '视频录制功能需要升级至6.2.2及以上的客户端',
  'hint_video_record_failed': '录制失败',
  'hint_video_upload_version': '视频上传功能需要升级至6.2.2及以上的客户端',
  'hint_video_upload_failed': '上传失败',
  'hint_video_info_version': '视频功能需要升级至6.2.2及以上的客户端',
  'hint_video_info_failed': '未查到此视频信息',
  'hint_get_customer_area_more_version': '此功能需要升级至6.2.2及以上的客户端',
  'hint_open_native_page_must_ios_url': '此功能需要升级至6.2.2及以上的客户端',
  'hint_open_native_page_must_android_url': '此功能需要升级至6.2.2及以上的客户端',
  'hint_only_wqapp': '此功能仅可在外勤客户端中使用',
  'hint_only_app': '此功能仅可在APP中使用',
  'hint_only_app_and_wx': '此功能仅可在微信或APP中使用',
  'hint_only_mobile': '此功能仅可在手机中使用',
  'hint_scan_failed': '扫码失败',
  'hint_try_again_later': '请稍后重试',
  'hint_max_upload': '最多只能传',
  'photos': '张照片',
  'hint_cannot_be_less_than': '不能小于',
  'hint_cannot_be_greater_than': '不能大于',
  'hint_must_number': '必须要输入数字哦',
  'hint_invalid_date': '无效的日期格式',
  'star': '颗星',
  'loading': '正在加载...',
  'hint_hideloading_after_showloading': 'showLoading后才能hideLoading',
  'hint_address_failed': '获取地址失败, 请稍后重试',
  'hint_location_failed': '定位失败, 请检查定位权限是否开启',
  'hint_location_map_failed': '定位失败, 请检查定位权限是否开启',
  'hint_weather_failed': '获取天气失败, 请稍后重试',
  'confirm_quit_page': '您确定要离开此页面吗?',
  'unit_year': 'Y', // 未使用,YYYY年
  'unit_month': 'MM', // 未使用,MM月
  'unit_date': 'DD', // 未使用,DD日
  'unit_hour': 'hh', // 未使用,hh时
  'unit_minute': 'mm', // 未使用,mm分
  'unit_second': 'ss', // 未使用,ss秒
  'unit_week': 'WW', // 未使用,WW周
  'unit_weeks_before': 'the', // 未使用,第EE周
  'unit_weeks_after': 'weeks', // 未使用,第EE周
  'unit_season': '季', // 未使用,Q
  'the': '第',
  'th_image_failed_to_upload': '张图片上传失败',
  're_photo_upload': '请重新拍照上传',
  'copied_to_the_clipboard': '复制到剪贴板成功',
  'unable_to_access_clipboard': '当前设备不允许访问剪贴板',
  'refreshing': '正在刷新...', // 英文仍然翻译成loading...
  'no_more_data': '没有更多数据了',
  'refreshing_failed': '加载失败, 请稍后再试', // 英文翻译成loading failed
  'release': '释放立即刷新',
  'pull_down': '下拉可以刷新',
  'say_something': '说点什么吧...',
  'location': '定位中...',
  'low': '弱',
  'medium': '中',
  'strong': '强',
  'hint_pass_in_parameters': '请传入参数',
  'hint_pass_in_correct_parameters': '请传入正确的参数',
  'wrong_parameter': '参数不正确',
  'method': '方法',
  'or': '或者',
  'menu': '菜单',
  'hint_for_example_address': '例如“江苏省南京市建邺区”',
  'no_data': '暂无数据'
};

class Demo extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   show: false,
    //   locale: zh
    // }
    this.state = {
      theme: 'zh_CN'
    }
  }
  componentDidMount () {
  }
  useZh = () => {
    this.setState({
      theme: 'zh_CN'
    });
  }
  useEn = () => {
    this.setState({
      theme: 'en_US'
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <ConfigProvider portal={document.getElementById('demo')} localeLanguage={this.state.theme}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <input type="button" value="英文" onClick={this.useEn}/>
        <input type="button" value="中文" onClick={this.useZh}/>
        <div style={{margin: 20}}>
      </div>
        <InputDate type="datetime"/>
      </Container>
      </ConfigProvider>
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
