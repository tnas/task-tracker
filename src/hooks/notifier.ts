import { NotificationType } from "@/interfaces/INotificationForm"
import { store } from '@/store'
import { NOTIFY } from "@/store/mutation-types"

type Notifier = {
    notify: (type: NotificationType, title: string, text: string) => void
}

export default () : Notifier => {
    const notify = (type: NotificationType, title: string, text: string): void => {
        store.commit(NOTIFY, {
            title: title,
            text: text,
            type: type
        })
    }

    return {
        notify
    }
}