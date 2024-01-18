import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'

export default class Student extends ExternalClient {
    private setting: any | boolean = false
    constructor(context: IOContext, options?: InstanceOptions) {
        super(`http://trika.vtexcommercestable.com.br`, context, {
            ...options,
        })
    }
    public async createStudentData(payload: any) {
        const savedData = await this.http.post<Promise<any>>(
            `/api/dataentities/AK/documents`, payload,
            await this.getHeaders()
        )
        console.log("saved" + savedData)
        if (savedData) {
            return {
                success: true,
                data: savedData
            }
        } else {
            return savedData
        }
    }

    public async getStudentData() {
        const customerData = await this.http.get<Promise<any>>(
            `/api/dataentities/AK/Search`,
            await this.getHeaders()
        )
        console.log("hehhee", (await this.getHeaders()).headers['X-VTEX-API-AppToken'])
        console.log("key", (await this.getHeaders()).headers['X-VTEX-API-AppKey'])
        return customerData
    }

    public async updateStudentData(payload: any) {
        const updateData = await this.http.patch<Promise<any>>(
            `/api/dataentities/AK/documents/${payload.id}`, payload,
            await this.getHeaders()
        )
        console.log("updated" + updateData)
        if (updateData) {
            return {
                success: true,
                data: updateData
            }
        } else {
            return updateData
        }
    }
    public async deleteStudentData(id: string) {
        console.log("getting id", id)
        const deleteData = await this.http.delete<Promise<any>>(
            `/api/dataentities/AK/documents/${id}`,
            await this.getHeaders()
        )

        return deleteData


    }
    private async getHeaders() {
        const App = new Apps(this.context)
        this.setting = await App.getAppSettings(process.env.VTEX_APP_ID ?? '')
        return {
            headers: {
                'Content-type': 'application/json',
                'X-VTEX-API-AppKey': this.setting?.apiKey,
                'X-VTEX-API-AppToken': this.setting?.appToken
            }
        }
    }
}
