import {AgentDesktopClientAPI} from "../brightpattern-client-api-types"

const messageClass = {
    'o': 'outgoing',
    'or': 'outgoing-result',
    'i': 'incoming',
    'ir': 'incoming-result',
    'e': 'error',
}

interface LoggerI {
    log(type: keyof typeof messageClass, message: string, content: string): void

    clearLog(): void

    initializeClearLogOnClick(buttonSelector: string): void

    initialize(): void
}

export class Logger implements LoggerI {
    logsNode: HTMLElement | null
    adApi: AgentDesktopClientAPI

    constructor(adApi: AgentDesktopClientAPI, logsSelector: string) {
        this.logsNode = document.querySelector(logsSelector)
        this.adApi = adApi
    }

    log = (type: keyof typeof messageClass, message: string, content: string) => {
        if (!this.logsNode) {
            throw new Error('Logs node is not found. Please, provide it to the Logger')
        }
        const logMessageDiv = this.createLogNode(type, message, content)
        const wasScrolledToBottom = this.isScrolledToBottom(this.logsNode)

        this.addLogMessage(logMessageDiv)

        if (wasScrolledToBottom)
            this.scrollLogsNodeToBottom(this.logsNode)
    }

    createLogNode(type: keyof typeof messageClass, message: string, content: string) {
        const logMessageDiv = document.createElement('div')
        const typeContainerDiv = document.createElement('div')
        const typeDiv = document.createElement('div')
        const dataDiv = document.createElement('div')

        logMessageDiv.classList.add('log-msg')
        logMessageDiv.classList.add(messageClass[type])
        typeDiv.textContent = message
        dataDiv.textContent = content

        typeContainerDiv.appendChild(typeDiv)
        logMessageDiv.appendChild(typeContainerDiv)
        logMessageDiv.appendChild(dataDiv)

        return logMessageDiv
    }

    addLogMessage(logMessageDiv: HTMLElement,) {
        this.logsNode?.appendChild(logMessageDiv)
    }

    isScrolledToBottom(node: HTMLElement) {
        return node.scrollHeight - node.clientHeight <= node.scrollTop + 1
    }

    scrollLogsNodeToBottom(logsNode: HTMLElement) {
        logsNode.scrollTop = logsNode.scrollHeight - logsNode.clientHeight
    }

    clearLog = () => {
        if (!this.logsNode) {
            throw new Error('Logs node is not found. Please, provide it to the Logger')
        }

        this.logsNode.innerText = ''
    }

    initializeClearLogOnClick = (buttonSelector: string) => {
        const button = document.querySelector(buttonSelector)
        if (!button) {
            throw new Error(`No button found by this selector: ${buttonSelector}`,)
        }
        button.addEventListener('click', this.clearLog)
    }

    initialize = () => {
        this.adApi.injectMessageLogger((message, data) => {
            if (message.startsWith('ON_')) {
                if (message.endsWith('_RESPONSE')) {
                    this.log('or', message, data ? JSON.stringify(data) : '')
                } else {
                    this.log('i', message, data ? JSON.stringify(data) : '')
                }
            } else {
                if (message.endsWith('_RESPONSE')) {
                    this.log(data.status === 'success' ? 'ir' : 'e', message, JSON.stringify(data))
                } else {
                    this.log('o', message, data ? JSON.stringify(data) : '')
                }
            }
        })
    }
}