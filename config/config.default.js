/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688628411739_1470';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      // socketPath: '/var/lib/mysql/mysql.sock',
      database: 'test'

    }
  }
  config.security = {
    csrf: {
      enable: false
    }
  }
  // config.cluster = {
  //   listen: {
  //     port: 8080
  //   }
  // }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
