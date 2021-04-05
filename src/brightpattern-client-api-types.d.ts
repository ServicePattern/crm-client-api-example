/* eslint-disable @typescript-eslint/ban-ts-comment */

export const requestMessages = [
    'GET_LOGIN_STATE',
    'LOGIN',
    'LOGOUT',
    'GET_AGENT_STATE',
    'SET_AGENT_STATE',
    'ACCEPT_INTERACTION',
    'REJECT_INTERACTION',
    'START_CALL',
    'START_CHAT',
    'START_EMAIL',
    'SEND_DTMF',
    'CONSULT_CALL',
    'BLIND_TRANSFER',
    'TRANSFER',
    'LEAVE_INTERACTION',
    'COMPLETE_INTERACTION',
    'LEAVE_AND_COMPLETE_INTERACTION',
    'SWITCH_ACTIVE_INTERACTION',
    'INVITE_TO_CALL_CONFERENCE',
    'REMOVE_FROM_CALL_CONFERENCE',
    'DESTROY_CALL_CONFERENCE',
    'GET_TEAMS',
    'GET_TEAM_MEMBERS',
    'GET_SERVICES_LIST',
    'SET_SERVICE',
    'GET_DISPOSITIONS_LIST',
    'SET_DISPOSITION',
    'SET_RESCHEDULE',
    'ADD_NOTE',
    'UPDATE_NOTE',
    'REPLACE_NOTE',
    'GET_CONFIG',
    'SET_VARIABLE',
    'ADD_INTERACTION_ASSOCIATED_OBJECT',
    'SET_INTERACTION_ACTIVE_SCREEN',
    'GET_PHONE_DEVICES_LIST',
    'GET_PHONE_DEVICE',
    'SET_PHONE_DEVICE',
    'SET_CALL_HOLD',
    'SET_CALL_RECORDING',
    'SET_CALL_MUTE',
    'SET_SCREEN_RECORDING_MUTE',
    'GET_SCREEN_RECORDING_STATE',
    'SET_WIDGET_MINIMIZED',
] as const
export type RequestMessage = typeof requestMessages[number]

export const callbackMessages = {
    'ON_LOGIN': {needResponse: false},
    'ON_LOGOUT': {needResponse: false},
    'ON_NEW_INTERACTION': {needResponse: false},
    'ON_INTERACTION_REMOVED': {needResponse: false},
    'ON_INTERACTION_STATE_CHANGE': {needResponse: false},
    'ON_ACTIVE_INTERACTION_SWITCHED': {needResponse: false},
    'ON_AGENT_STATE_CHANGE': {needResponse: false},
    'ON_REQUEST_TRANSFER_DATA': {needResponse: true},
    'ON_LOAD_TRANSFER_DATA': {needResponse: false},
    'ON_MANUAL_CALL': {needResponse: false},
    'ON_SEARCH_KNOWLEDGE_BASE': {needResponse: true},
    'ON_GET_KNOWLEDGE_BASE_ARTICLE': {needResponse: true},
    'ON_OPEN_RECORD': {needResponse: false},
    'ON_SEARCH_RECORDS': {needResponse: false},
    'ON_SHOW_SCREEN': {needResponse: false},
    'ON_SCREEN_RECORDING_STATE_CHANGE': {needResponse: false},
    'ON_WIDGET_MINIMIZED_CHANGE': {needResponse: false},
} as const
export type CallbackMessage = keyof typeof callbackMessages

export const responseSuffix = '_RESPONSE' as const

export const requestResponseMessages = requestMessages.map(msg => msg + responseSuffix)
export const callbackResponseMessages = Object.keys(callbackMessages).reduce<string[]>((all, msg) => {
    if ((callbackMessages as unknown as Record<string, {needResponse: boolean}>)[msg].needResponse) {
        all.push(msg + responseSuffix)
    }
    return all
}, [])


export type CallbackMethodsReturnTypeMap = {
    'ON_LOGIN': void
    'ON_LOGOUT': void
    'ON_NEW_INTERACTION': void
    'ON_INTERACTION_REMOVED': void
    'ON_INTERACTION_STATE_CHANGE': void
    'ON_ACTIVE_INTERACTION_SWITCHED': void
    'ON_AGENT_STATE_CHANGE': void
    'ON_REQUEST_TRANSFER_DATA': CustomTransferData
    'ON_LOAD_TRANSFER_DATA': void
    'ON_MANUAL_CALL': void
    'ON_SEARCH_KNOWLEDGE_BASE': ExternalKBSearchResult[]
    'ON_GET_KNOWLEDGE_BASE_ARTICLE': ExternalKBArticle | null
    'ON_OPEN_RECORD': void
    'ON_SEARCH_RECORDS': void
    'ON_SHOW_SCREEN': void
    'ON_SCREEN_RECORDING_STATE_CHANGE': void
    'ON_WIDGET_MINIMIZED_CHANGE': void
}

const resultStatus = ['error', 'success'] as const
export type ResultStatus = typeof resultStatus[number]

type ResultError = {
    message: string
}

export type OperationResult<ReturnType = null> = {
    status: ResultStatus
    data?: ReturnType
    error?: ResultError
}

export type SyncAsyncResult<ReturnType = void> = ReturnType | Promise<ReturnType>

export const agentStates = ['supervising', 'ready', 'not_ready', 'busy', 'after_call_work'] as const
export type AgentState = typeof agentStates[number]

export const interactionStates = [
    'unknown',
    'queued',
    'ivr',
    'wrap_up',
    'wrap_up_hold',
    'delivered',
    'delivery_pending',
    'hold',
    'completed',
] as const
export type InteractionState = typeof interactionStates[number]

export const interactionTypes = ['voice', 'chat', 'email'] as const
export type InteractionType = typeof interactionTypes[number]

export const chatChannelTypes = [
    'telegram',
    'line',
    'facebook',
    'web',
    'nexmo',
    'sms',
    'viber',
    'twitter',
    'wechat',
] as const
export type ChatChannelType = typeof chatChannelTypes[number]

export const callDirections = ['inbound', 'outbound'] as const
export type CallDirection = typeof callDirections[number]

export const phoneDevices = [
    'phone_type_browser',
    'phone_type_external',
    'phone_type_hard_custom',
    'phone_type_hard_default',
    'phone_type_nailed',
    'phone_type_none',
    'phone_type_soft_secure',
    'phone_type_soft_unsecure',
] as const
export type PhoneDevice = typeof phoneDevices[number]

export const dispositionTypes = [
    'SUCCESS',
    'FAILURE',
    'CONTINUE',
    'SPAM',
    'DO_NOT_CALL',
] as const
export type DispositionType = typeof dispositionTypes[number]

export const userStates = ['offline', 'available', 'dnd', 'away', 'busy']
export type UserState = typeof userStates[number]

export type LoginStateData = {
    isLoggedIn: boolean
    agentId?: string
    username?: string
    sessionId?: string
}

export type AgentStateData = {
    state: AgentState
    notReadyReason?: string
}

export type ServiceData = {
    id: string
    name: string
    useDispositions: boolean
    requireDisposition: boolean
}

export type DispositionTarget = {
    service?: string
    interactionId?: string
}

export type DispositionData = {
    id: string
    code: string
    name: string
    type: DispositionType
}

export type IntegrationConfig = any

export type InteractionAssociatedObject = {
    id: string
    type: string
    displayName: string
    displayType: string
    customFields: Record<string, string>
    source: string
}

export type InteractionAssociatedObjectsData = {
    list: InteractionAssociatedObject[]
    selected: string | null
}

export type InteractionData = {
    interactionId: string
    state: InteractionState
    type: InteractionType
    subject: string
    associatedObjects: InteractionAssociatedObjectsData
    callParties: CallParty[]
    callMuted: boolean
    callRecording: boolean
    phoneNumber?: string
    email?: string
    callDirection?: CallDirection
    startTime?: number
    endTime?: number
    duration?: number
    description?: string
    disposition?: string
    globalInteractionId?: string
    service?: string
    playbackUrl?: string
    recordingUrl?: string
    DNIS?: string
    ANI?: string
}

export type InteractionScreen = Record<string, string | number | boolean | null | undefined>

export type CustomTransferData = Record<string, string | number | boolean | undefined | null>

export type ExternalKBArticle = {
    id: string
    title: string
    keywords: string
    answer: string
    notes: string
    language: string
    createdByUser: string
    lastEditedByUser: string
    customFields: Record<string, string>
    source: string
}

export type ExternalKBSearchResult = {
    id: string
    text: string
    title: string
    source: string
}

export type SearchRecordsQuery = {
    text: string
    types: string[]
}

export type RescheduleData = {
    numberToDial: string
    fromTime: string
    untilTime: string
    timezoneCode?: string
}

export type PhoneDeviceData = {
    type: PhoneDevice
    phone?: string
}

export type Team = {
    id: string
    displayName: string
    isSupervised: boolean
    usersCount?: number
}

export type User = {
    id: string
    teamId: string
    firstName: string
    lastName: string
    phone: string
    state: UserState
}

export type CallParty = {
    id: string
    name: string
    phone: string
    userId?: string
}

export type ScreenRecordingState = {
    allowed: boolean
    active: boolean
    muted: boolean
}

export type OnLoginHandler = (loginState: LoginStateData) => SyncAsyncResult
export type OnLogoutHandler = () => SyncAsyncResult
export type OnNewInteractionHandler = (newInteraction: InteractionData) => SyncAsyncResult
export type OnInteractionRemovedHandler = (interaction: InteractionData) => SyncAsyncResult
export type OnInteractionStateChangeHandler = (interaction: InteractionData) => SyncAsyncResult
export type OnActiveInteractionSwitchHandler = (activatedInteractionId: string | null) => SyncAsyncResult
export type OnAgentStateChangeHandler = (state: AgentState, notReadyReason?: string) => SyncAsyncResult
export type OnRequestTransferDataHandler = (interactionId: string) => SyncAsyncResult<CustomTransferData>
export type OnLoadTransferDataHandler = (interactionId: string, data: CustomTransferData) => SyncAsyncResult
export type OnManualCallHandler = (phonenumber: string) => SyncAsyncResult
export type OnWidgetMinimizedChangeHandler = (widgetMinimized: boolean) => SyncAsyncResult
export type OnSearchKnowledgeBaseHandler = (query: string, language?: string) => SyncAsyncResult<ExternalKBSearchResult[]>
export type OnGetKnowledgeBaseArticleHandler = (id: string) => SyncAsyncResult<ExternalKBArticle | null>
export type OnOpenRecordHandler = (record: InteractionAssociatedObject, interactionId?: string) => SyncAsyncResult
export type OnSearchRecordsHandler = (search: SearchRecordsQuery, interactionId?: string) => SyncAsyncResult
export type OnShowScreenHandler = (screen: InteractionScreen, interactionId?: string) => SyncAsyncResult
export type OnScreenRecordingStateChangeHandler = (screenRecordingState: ScreenRecordingState) => SyncAsyncResult

export type MessageLogger = (message: string, data: any) => void

// TODO: resolve type issues
export type InitOptions = {
    integrationKey?: string
    // @ts-ignore
    adcFrame?: any // HTMLIFrameElement
    // @ts-ignore
    mountRoot?: any // HTMLElement
    standalone?: boolean
}

export declare class AgentDesktopClientAPI {
    // @ts-ignore
    adcFrame: any // HTMLIFrameElement | null

    constructor(options?: InitOptions)

    injectMessageLogger(callback: MessageLogger): void

    getLoginState(): Promise<OperationResult<LoginStateData>>
    login(username: string, password: string, tenant?: string): Promise<OperationResult>
    logout(): Promise<OperationResult>
    getAgentState(): Promise<OperationResult<AgentStateData>>
    setAgentState(state: AgentState, notReadyReason?: string): Promise<OperationResult>
    acceptInteraction(interactionId?: string): Promise<OperationResult>
    rejectInteraction(interactionId?: string): Promise<OperationResult>
    startCall(phonenumber: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>
    startChat(channel: ChatChannelType, address: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>
    startEmail(email: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>
    sendDtmf(dtmf: string, interactionId?: string): Promise<OperationResult>
    consultCall(phone: string): Promise<OperationResult>
    blindTransfer(phone: string, customTransferData?: CustomTransferData, interactionId?: string): Promise<OperationResult>
    transfer(customTransferData?: CustomTransferData, mainCallId?: string, consultCallId?: string): Promise<OperationResult>
    leaveInteraction(interactionId?: string): Promise<OperationResult>
    completeInteraction(interactionId?: string): Promise<OperationResult>
    leaveAndCompleteInteraction(disposition?: string, note?: string, interactionId?: string): Promise<OperationResult>
    switchActiveInteraction(interactionId: string): Promise<OperationResult>
    inviteToCallConference(phone: string, customTransferData?: CustomTransferData, interactionId?: string): Promise<OperationResult>
    removeFromCallConference(partyId: string, interactionId?: string): Promise<OperationResult>
    destroyCallConference(interactionId?: string): Promise<OperationResult>
    getTeams(): Promise<OperationResult<Team[]>>
    getTeamMembers(teamId: string): Promise<OperationResult<User[]>>
    getServicesList(): Promise<OperationResult<ServiceData[]>>
    setService(service: string): Promise<OperationResult>
    getDispositionsList(target: DispositionTarget): Promise<OperationResult<DispositionData[]>>
    setDisposition(disposition: string, interactionId?: string): Promise<OperationResult>
    setRescheduleWindow(rescheduleData: RescheduleData, interactionId?: string): Promise<OperationResult>
    addNote(note: string, interactionId?: string): Promise<OperationResult>
    updateNote(note: string, interactionId?: string): Promise<OperationResult>
    replaceNote(note: string, interactionId?: string): Promise<OperationResult>
    getConfig(): Promise<OperationResult<IntegrationConfig>>
    setVariable(key: string, value: string, interactionId?: string): Promise<OperationResult>
    addInteractionAssociatedObject(object: InteractionAssociatedObject, interactionId?: string): Promise<OperationResult>
    setInteractionActiveScreen(screenData: InteractionScreen, interactionId?: string): Promise<OperationResult>
    getPhoneDevicesList(): Promise<OperationResult<PhoneDevice[]>>
    getPhoneDevice(): Promise<OperationResult<PhoneDeviceData>>
    setPhoneDevice(phoneDevice: PhoneDeviceData): Promise<OperationResult>
    setCallHold(state: boolean, interactionId?: string): Promise<OperationResult>
    setCallRecording(state: boolean, interactionId?: string): Promise<OperationResult>
    setCallMute(state: boolean, interactionId?: string): Promise<OperationResult>
    setScreenRecordingMute(state: boolean): Promise<OperationResult>
    getScreenRecordingState(): Promise<OperationResult<ScreenRecordingState>>
    setWidgetMinimized(state: boolean): Promise<OperationResult>

    on(message: 'ON_LOGIN', handler: OnLoginHandler): void
    on(message: 'ON_LOGOUT', handler: OnLogoutHandler): void
    on(message: 'ON_NEW_INTERACTION', handler: OnNewInteractionHandler): void
    on(message: 'ON_INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void
    on(message: 'ON_INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void
    on(message: 'ON_ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void
    on(message: 'ON_AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void
    on(message: 'ON_REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void
    on(message: 'ON_LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void
    on(message: 'ON_MANUAL_CALL', handler: OnManualCallHandler): void
    on(message: 'ON_SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void
    on(message: 'ON_GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void
    on(message: 'ON_OPEN_RECORD', handler: OnOpenRecordHandler): void
    on(message: 'ON_SEARCH_RECORDS', handler: OnSearchRecordsHandler): void
    on(message: 'ON_SHOW_SCREEN', handler: OnShowScreenHandler): void
    on(message: 'ON_SCREEN_RECORDING_STATE_CHANGE', handler: OnScreenRecordingStateChangeHandler): void
    on(message: 'ON_WIDGET_MINIMIZED_CHANGE', handler: OnWidgetMinimizedChangeHandler): void

    remove(message: 'ON_LOGIN', handler: OnLoginHandler): void
    remove(message: 'ON_LOGOUT', handler: OnLogoutHandler): void
    remove(message: 'ON_NEW_INTERACTION', handler: OnNewInteractionHandler): void
    remove(message: 'ON_INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void
    remove(message: 'ON_INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void
    remove(message: 'ON_ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void
    remove(message: 'ON_AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void
    remove(message: 'ON_REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void
    remove(message: 'ON_LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void
    remove(message: 'ON_MANUAL_CALL', handler: OnManualCallHandler): void
    remove(message: 'ON_SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void
    remove(message: 'ON_GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void
    remove(message: 'ON_OPEN_RECORD', handler: OnOpenRecordHandler): void
    remove(message: 'ON_SEARCH_RECORDS', handler: OnSearchRecordsHandler): void
    remove(message: 'ON_SHOW_SCREEN', handler: OnShowScreenHandler): void
    remove(message: 'ON_SCREEN_RECORDING_STATE_CHANGE', handler: OnScreenRecordingStateChangeHandler): void
    remove(message: 'ON_WIDGET_MINIMIZED_CHANGE', handler: OnWidgetMinimizedChangeHandler): void
}

interface AgentDesktopClientAPIClassType {
    prototype: AgentDesktopClientAPI
    new (options?: InitOptions): AgentDesktopClientAPI
}

declare global {
    interface Window {
        brightpattern: {
            AdApi: AgentDesktopClientAPIClassType
        }
    }
}