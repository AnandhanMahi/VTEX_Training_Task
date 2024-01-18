import { IOClients } from '@vtex/api'
import Analytics from '../clients/analytics'
import Student from './student'
import Captcha from './captcha'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    public get analytics() {
        return this.getOrSet('analytics', Analytics)
    }
    public get student() {
        return this.getOrSet('student', Student)
    }
    public get captcha() {
        return this.getOrSet('captcha', Captcha)
    }
}
