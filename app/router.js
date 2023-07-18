'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/addData', controller.dataManage.addData)
  router.delete('/delData', controller.dataManage.delData)
  router.put('/updateData', controller.dataManage.updateData)
  router.get('/getData', controller.dataManage.getData)
  router.post('/addReportData', controller.reportDataController.addData)
  router.delete('/delReportData', controller.reportDataController.delData)
  router.put('/updateReportData', controller.reportDataController.updateData)
  router.get('/getReportData', controller.reportDataController.getData)
};
