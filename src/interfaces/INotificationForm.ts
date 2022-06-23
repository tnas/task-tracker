export enum NotificationType {
    SUCCESS, FAILURE, DANGER
}

export interface INotificationForm {
    title: string
    text: string
    type: NotificationType
    id: number
}