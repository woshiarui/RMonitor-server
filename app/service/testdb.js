'use strict'

const Service = require("egg").Service
class testdbService extends Service {
    async addData(params) {
        try {
            const { app } = this;
            const res = await app.mysql.insert('monitor_data', params);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delData(id) {
        try {
            const { app } = this
            console.log(id);
            const res = await app.mysql.delete('monitor_data', id)
            return res
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateData(params) {
        try {
            const { app } = this;
            console.log(params);
            const res = await app.mysql.update('monitor_data', params);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getData() {
        try {
            const { app } = this;
            const res = await app.mysql.select('monitor_data');
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = testdbService;