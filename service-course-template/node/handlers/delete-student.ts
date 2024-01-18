export async function deleteStudent(ctx: Context, next: () => Promise<any>) {
    console.log("yess")
    try {
        const { id } = ctx.vtex.route.params
        const { clients: { student } } = ctx
        console.log("yess1", id)

        const data = await student.deleteStudentData(id.toString())
        ctx.body = data
        return next()
    } catch (e) {
        console.log("yess2")

        const err: any = e
        const message = err?.response && err?.response.data && err?.response.data.Message ? err?.response.data.Message : undefined;
        ctx.status = err?.response?.status || 400
        ctx.body = message
        return next()
    }
}