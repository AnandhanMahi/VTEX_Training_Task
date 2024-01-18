export async function getCaptcha(ctx: Context, next: () => Promise<any>) {
    
    const { clients: { captcha } } = ctx

    const data = await captcha.getCaptchaData()
    ctx.body=data
    await next()
}