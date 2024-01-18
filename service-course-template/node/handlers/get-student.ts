export async function getStudent(ctx: Context, next: () => Promise<any>) {
    
    const { clients: { student } } = ctx

    const data = await student.getStudentData()
    ctx.body=data
    await next()
}