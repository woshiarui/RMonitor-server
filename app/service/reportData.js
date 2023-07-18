'use strict'

const Service = require("egg").Service
class reportDataService extends Service {
    async addData(params) {
        try {
            const { app } = this;
            console.log(params);
            console.log(params.breadcrumb);
            const breadcrumb_p = params.breadcrumb
            const report_p = {
                device_browserVersion: params.deviceInfo.browserVersion,
                device_browser: params.deviceInfo.browser,
                device_osVersion: params.deviceInfo.osVersion,
                device_os: params.deviceInfo.os,
                device_ua: params.deviceInfo.ua,
                device_device: params.deviceInfo.device,
                device_device_type: params.deviceInfo.device_type,
                ...params
            }
            delete report_p.breadcrumb
            delete report_p.deviceInfo
            // console.log(breadcrumb_p);
            const res1 = await app.mysql.insert('report_data', report_p);
            let res2
            for (const data of breadcrumb_p) {
                if (res1) {
                    data.eventId = res1.insertId
                }
                res2 = await app.mysql.insert('breadcrumbs_data', data);
            }
            return res1 && res2
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async delData(id) {
        try {
            const { app } = this
            console.log(id);
            const res1 = await app.mysql.delete('breadcrumbs_data', { eventId: id.id })
            console.log(res1);
            const res2 = await app.mysql.delete('report_data', id)
            return res1 && res2
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateData(params) {
        try {
            const { app } = this;
            const breadcrumb_p = params.breadcrumb
            const report_p = {
                ...params,
                device_browserVersion: params.deviceInfo.browserVersion,
                device_browser: params.deviceInfo.browser,
                device_osVersion: params.deviceInfo.osVersion,
                device_os: params.deviceInfo.os,
                device_ua: params.deviceInfo.ua,
                device_device: params.deviceInfo.device,
                device_device_type: params.deviceInfo.device_type
            }
            delete report_p.breadcrumb
            delete report_p.deviceInfo
            console.log(11);
            console.log(report_p);
            console.log(breadcrumb_p);
            const res1 = await app.mysql.update('report_data', report_p);
            let res2 = {}
            for (let i in breadcrumb_p) {
                console.log(breadcrumb_p[i]);
                res2 = await app.mysql.update('breadcrumbs_data', breadcrumb_p[i]);
                console.log(res2);
            }
            console.log(res1);
            return res1 && res2;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getData() {
        try {
            const { app } = this;
            const res = await app.mysql.select('report_data');
            console.log(res);
            for (let i in res) {
                let device = {
                    browserVersion: res[i].device_browserVersion,
                    browser: res[i].device_browser,
                    osVersion: res[i].device_osVersion,
                    os: res[i].device_os,
                    ua: res[i].device_ua,
                    device: res[i].device_device,
                    device_type: res[i].device_device_type
                }
                res[i].deviceInfo = device
                delete res[i].device_browserVersion
                delete res[i].device_browser
                delete res[i].device_osVersion
                delete res[i].device_os
                delete res[i].device_ua
                delete res[i].device_device
                delete res[i].device_device_type
                let res2 = await app.mysql.select('breadcrumbs_data', {
                    where: { eventId: res[i].id }
                })
                res[i].breadcrumb = res2
            }

            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = reportDataService;