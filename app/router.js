'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.post('/addData', controller.dataManage.addData)
  // router.delete('/delData', controller.dataManage.delData)
  // router.put('/updateData', controller.dataManage.updateData)
  // router.get('/getData', controller.dataManage.getData)
  //数据上报
  router.post('/addData', controller.reportDataController.addData)
  //删除数据
  router.put('/delData/:target', controller.reportDataController.delData)
  //数据查询
  router.get('/getData/:target', controller.reportDataController.getData)
};
