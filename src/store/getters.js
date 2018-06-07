const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  businessRouters: state => state.permission.businessRouters,
  stadiumRouters: state => state.permission.stadiumRouters,
  addRouters: state => state.permission.addRouters
}
export default getters
