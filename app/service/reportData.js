'use strict'

const Service = require("egg").Service
class reportDataService extends Service {
    async addData(params, targetTable) {
        try {
            const { app } = this;
            const res = await app.mysql.insert(targetTable, params);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delData(uuid, targetTable) {
        try {
            const { app } = this
            let params = {
                is_delete: 1
            }
            let options = {
                where: {
                    uuid
                }
            }
            const res = await app.mysql.update(targetTable, params, options)
            // const res = await app.mysql.
            return res
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateData(params, targetTable) {
        try {
            const { app } = this;
            let options = {
                where: {
                    uuid: params.uuid
                }
            }
            const res = await app.mysql.update(targetTable, params, options);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getData(targetTable) {
        try {
            const { app } = this;
            let options = {
                where: {
                    is_delete: 0
                }
            }
            const res = await app.mysql.select(targetTable, options)
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // async findData(params, targetTable) {
    //     try {
    //         const { app } = this;
    //         let options = {
    //             where: {
    //                 uuid: params.uuid
    //             }
    //         }
    //         const res = await app.mysql.select(targetTable, options)
    //         return res;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
}
module.exports = reportDataService;