import superagent from 'superagent'

const methods = ['get', 'post', 'put', 'patch', 'del']
const env = process.env.NODE_ENV

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (env === 'development') {
    // 如果需要做跨域处理,则加上/api:http://localhost:4444/api,使其被proxy代理过滤器匹配到/api,从而做代理跨域
    return 'http://localhost:4444' + adjustedPath
  }
  return adjustedPath;
}

export default class Api {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, head, form } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        // request.timeout(10000);
        if (form) {
          request.type('form');
        }

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (head) { // 设置头部
          Object.keys(head).map(key => {
            const value = head[key];
            request.set(key, value);
          });
        }

        if (form) {
          request.send(form);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res = {}) => {
          let { body } = res;
          try {
            body = JSON.parse(res.text);
          } catch (error) {
            console.log('解析老协议错误！');
          }
          // 如果code不等于1，则走reject
          /* let promise = resolve(body);
          if (body && body.code && body.code.toString() !== '1' && body.code.toString() !== '204000001') promise = reject(body || err);
          return err ? reject(body || err) : promise; */
          // 继续处理
          return err ? reject(body || err) : resolve(body);
        });
      }));
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
