import { MealResource } from './'

export default {
  getGameByPage: params =>
    MealResource.get('/V4/tjkd.app.package.list', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  getMealList: params =>
    MealResource.get('/V4/tjkd.app.package.list', {
      params
    }),
  getAllMealList: () => MealResource.get('/V4/tjkd.app.package.list.all'),
  saveRule: params =>
    MealResource.post('/V4/tjkd.app.forward.rule.save', {
      ...params
    }),
  deleteRule: params =>
    MealResource.delete('/V4/tjkd.app.forward.rule.del', {
      data: {
        ...params
      }
    }),
  getRuleInfo: params =>
    MealResource.get('/V4/tjkd.app.forward.rule.info', {
      params
    }),
  getRuleList: params =>
    MealResource.get('/V4/tjkd.app.forward.rule.list', {
      params
    }),
  addNewRuleFunBatch: params =>
    MealResource.post('V4/tjkd.app.forward.rule.batch.add', {
      ...params
    }),
  editRuleFunBatch: params =>
    MealResource.post('V4/tjkd.app.forward.rule.batch.info', {
      ...params
    }),
  saveEditRuleBatch: params =>
    MealResource.post('V4/tjkd.app.forward.rule.batch.save', {
      ...params
    }),
  changeCdnSwitch: params =>
    MealResource.post('V4/tjkd.app.forward.rule.change.use.cdn', {
      ...params
    })
}
