const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  user_id: (state) => state.user.user_id,
  account_console: (state) => state.user.account_console,
  avatar: (state) => state.user.avatar,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  errorLogs: (state) => state.errorLog.logs,
  //
  domain_suffix: (state) => state.settings.domain_suffix,
  tenant_prefix_url: (state) => state.settings.tenant_prefix_url,
  default_host: (state) => state.settings.default_host,
  expireUrl: (state) => state.settings.expireUrl, //"https://account.axisnow.xyz/user/sign-in",
  signOutUrl: (state) => state.settings.signOutUrl,
};
export default getters;
