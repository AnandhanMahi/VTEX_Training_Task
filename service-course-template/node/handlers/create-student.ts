import { json } from 'co-body'

export async function createStudent(ctx: Context, next: () => Promise<any>) {
    try {
        const body = await json(ctx.req)
        const { clients: { student } } = ctx
        const resp = await student.createStudentData(body)
        if (resp.data) {
            console.log("Saved!")
        }
        ctx.body = resp.data
        ctx.status = 200
        return next()
    } catch (e) {
        const err: any = e
        const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
        ctx.status = err?.response?.status || 400
        ctx.body = message
        return next()
    }
}