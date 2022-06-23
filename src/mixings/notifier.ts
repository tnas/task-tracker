import { NotificationType } from "@/interfaces/INotificationForm"
import { store } from "@/store"
import { NOTIFY } from "@/store/mutation-types"

export const notificationMixin = {
    methods: {
        notify(type: NotificationType, title: string, text: string): void {
            store.commit(NOTIFY, {
                title: title,
                text: text,
                type: type
            })
        }
    }
}