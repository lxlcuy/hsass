import { getToken, setToken, removeToken } from '../../utils/auth'
import { login } from '../../api/user'
// 状态
// const state = {}
const state = {
  token: getToken() // 上来直接调用和获取token 实现数据持久化
}
// 修改状态
// const mutations = {}
const mutations = {
  setToken(state, token) {
    // 同步缓存数据
    state.token = token
    setToken()
  },
  removeToken(state) {
    state.token = null // 将vuex数据清空
    removeToken() // 同步到数据
  }
}
// const actions = {}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 获取token

    context.commit('setToken', result) // 同步token
  }
}
export default {
  namespaced: true, // 相当于设置权限，不能随便使用
  state,
  mutations,
  actions
}
