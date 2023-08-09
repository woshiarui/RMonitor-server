'use strict'
const { Controller } = require('egg')

class reportDataController extends Controller {
    async addData() {
        const { ctx } = this
        const type = ctx.request.body.type
        let res
        ctx.request.body.actionStore = JSON.stringify(ctx.request.body.actionStore)
        ctx.request.body.deviceInfo = JSON.stringify(ctx.request.body.deviceInfo)
        if (type == 'whitescreen') {//如果是白屏的数据
            if (ctx.request.body.status === 'error') {//如果是error，新增
                res = await ctx.service.reportData.addData(ctx.request.body, type)
            } else {//如果是ok，更新
                res = await ctx.service.reportData.updateData(ctx.request.body, type)
            }

        } else {
            console.log(ctx.request.body);
            res = await ctx.service.reportData.addData(ctx.request.body, type)

        }
        if (res) {
            ctx.body = {
                status: 200,
                msg: "上报成功"
            }
        } else {
            ctx.body = "add-fail"
        }
    }
    async delData() {
        const { ctx } = this
        const target = ctx.params.target
        const res = await ctx.service.reportData.delData(ctx.query.uuid, target)

        if (res) {
            ctx.body = {
                status: 200,
                msg: "删除成功"
            }
        } else {
            ctx.body = "del-fail"
        }
    }
    async updateData() {
        const { ctx } = this
        const res = await ctx.service.reportData.updateData(ctx.request.body)
        if (res) {
            ctx.body = {
                status: 200,
                msg: "修改成功"
            }
        } else {
            ctx.body = "update fail"
        }

    }
    async getData() {
        const { ctx } = this
        const res = await ctx.service.reportData.getData(ctx.params.target);
        // console.log(res[0].actionStore);
        res.forEach(item => {
            item.actionStore = JSON.parse(item.actionStore)
            item.deviceInfo = JSON.parse(item.deviceInfo)
        })

        ctx.body = {
            code: 200,
            msg: "操作成功",
            data: res
        }
    }
}
module.exports = reportDataController