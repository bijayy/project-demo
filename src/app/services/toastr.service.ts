import { InjectionToken } from '@angular/core'

export let TOASTER_TOKEN = new InjectionToken('toastr')

export interface Toastr {
    success(message: string, title?: string)
    info(message: string, title?: string)
    warning(message: string, title?: string)
    error(message: string, title?: string)
}
