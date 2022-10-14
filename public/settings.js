function title() {
  let title = "";
  // if(localStorage.getItem('userinfo') && localStorage.getItem('tanant_id')) {
  //   const user_info = JSON.parse(localStorage.getItem('userinfo'))
  //   const tanant = user_info.tanant_list.find(i => Number(i.tanant_id )=== Number(localStorage.getItem('tanant_id')))
  //   if( tanant) {
  //     title = tanant.tanant_name + ''
  //   }
  // }

  return title;
}

module.exports = {
  title: title(),
  logo: "",

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  logo: "https://auth.axisnow.xyz/img/logo/logo-02.png",
  tenant_prefix_url: ".axisnow.xyz",
  domain_suffix: "axisnow.xyz",
  default_host: "console.axisnow.xyz",
  errorLog: "production",
  expireUrl: "https://account.axisnow.xyz/user/sign-in",
  signOutUrl: "https://account.axisnow.xyz/user/sign-out",
};
