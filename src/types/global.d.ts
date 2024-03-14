declare global {
  interface ImportMetaEnv {
    [key: string]: any;

    // 打包目录
    VITE_APP_BUILD_DIR: string;
    // token名称
    VITE_APP_TOKEN_NAME: string;
    // api地址
    VITE_APP_API_ROOT: string;
    // 是否开启mock
    VITE_APP_USE_MOCK: 0 | 1;
    // 登录地址
    VITE_APP_LOGIN_URL: string;
    // 登录回跳地址
    VITE_APP_LOGIN_RETURN_URL: string;
    // 用户中心地址
    VITE_APP_UCENTER_URL: string;
  }
}
