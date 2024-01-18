import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'

export default class Captcha extends ExternalClient {
    private setting: any | boolean = false
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
            ...options,
        })
    }


    public async getCaptchaData() {
        const captcha = (await this.getHeaders()).headers['X-VTEX-API-Captcha']
        console.log(captcha)
        const captchaToken = {
            siteCaptcha: captcha
        }
        return captchaToken;
    }


    private async getHeaders() {
        const App = new Apps(this.context)
        this.setting = await App.getAppSettings(process.env.VTEX_APP_ID ?? '')
        return {
            headers: {
                'Content-type': 'application/json',
                'X-VTEX-API-Captcha': this.setting?.apiCaptcha,
            }
        }
    }
}
