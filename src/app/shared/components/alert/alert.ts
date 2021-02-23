/**
 * Tipos de mensagem de alerta
 */
export enum AlertType {
    SUCCESS,
    WARNING,
    DANGER,
    INFO
}

/**
 * Classe de mensagem de alerta
 */
export class Alert {
    /**
     * @property alertType 
     * @property message 
     */
    constructor(
        public readonly alertType : AlertType,
        public readonly message: string
    )  {}
}