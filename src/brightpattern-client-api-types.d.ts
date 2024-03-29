/* eslint-disable @typescript-eslint/ban-ts-comment */
/** Must not have dependencies (imports) */

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
    'INVITE_TO_CHAT_CONFERENCE',
    'REMOVE_FROM_CHAT_CONFERENCE',
    'MERGE_ALL_CALLS_INTO_CONFERENCE',
    'GET_TEAMS',
    'GET_TEAM_MEMBERS',
    'GET_SERVICES_LIST',
    'GET_SERVICE',
    'SET_SERVICE',
    'GET_DID_LIST',
    'GET_DID',
    'SET_DID',
    'GET_DISPOSITIONS_LIST',
    'SET_DISPOSITION',
    'SET_RESCHEDULE',
    'ADD_NOTE',
    'UPDATE_NOTE',
    'REPLACE_NOTE',
    'GET_CONFIG',
    'GET_VARIABLES',
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
    'SEND_CHAT_MESSAGE',
    'SUGGEST_CHAT_MESSAGE',
    'GET_AGENT_NOT_READY_REASONS',
    'ACTIVATE_PAGE',
    'GET_INTERACTIONS_STATE',
    'SET_CALL_RECORDING_MUTE',
    'SET_DIAL_CANDIDATES',
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
    'ON_GET_KNOWLEDGE_BASE_FOLDER': {needResponse: true},
    'ON_SEARCH_KNOWLEDGE_BASE': {needResponse: true},
    'ON_GET_KNOWLEDGE_BASE_ARTICLE': {needResponse: true},
    'ON_OPEN_RECORD': {needResponse: false},
    'ON_SEARCH_RECORDS': {needResponse: false},
    'ON_SHOW_SCREEN': {needResponse: false},
    'ON_SCREEN_RECORDING_STATE_CHANGE': {needResponse: false},
    'ON_WIDGET_MINIMIZED_CHANGE': {needResponse: false},
    'ON_SERVER_ERROR': {needResponse: false},
    'ON_SOFTPHONE_STATUS_CHANGE': {needResponse: false},
    'ON_AUDIO_DEVICE_CHANGE': {needResponse: false},
    'ON_PHONE_CAPABILITIES_CHANGE': {needResponse: false},
    'ON_CALL_AUDIO_QUALITY_ALERT': {needResponse: false},
    'ON_WEB_SCREEN_POP_CUSTOM': {needResponse: true},
    'ON_SAVE_ACTIVITY_RECORD': {needResponse: false},
    'ON_VALIDATE_ASSOCIATED_RECORDS': {needResponse: true},
    'ON_REQUEST_RECORD_INFO': {needResponse: true},
    'ON_REQUEST_RECORD_ON_SCREEN': {needResponse: true},
} as const
export type CallbackMessage = keyof typeof callbackMessages


type FilterByHavingResponse<T> = {
    [Key in keyof T]: T[Key] extends {needResponse: true} ? Key : never
}

const typedKeys = <T extends {[key: string]: unknown}>(data: T): Array<keyof T> =>
    Object.keys.call<typeof data, Array<typeof data>, Array<keyof T>>(data, data)

export type CallbackMessageWithResponse = FilterByHavingResponse<typeof callbackMessages>[keyof typeof callbackMessages]

export const RESPONSE_SUFFIX = '_RESPONSE' as const

export const requestResponseMessages = requestMessages.map<`${RequestMessage}${typeof RESPONSE_SUFFIX}`>(message => {
    return `${message}${RESPONSE_SUFFIX}`
})
export const callbackResponseMessages = typedKeys(callbackMessages)
    .filter<CallbackMessageWithResponse>((message: CallbackMessage): message is CallbackMessageWithResponse => {
        return callbackMessages[message].needResponse
    })
    .map<`${CallbackMessageWithResponse}${typeof RESPONSE_SUFFIX}`>(message => {
        return `${message}${RESPONSE_SUFFIX}`
    })

export type CallbackResponseMessage = keyof {
    [Key in keyof typeof callbackMessages as typeof callbackMessages[Key] extends {needResponse: true} ? `${Key}${typeof RESPONSE_SUFFIX}` : never]: true
}

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
    'ON_GET_KNOWLEDGE_BASE_FOLDER': ExternalKBItemData[]
    'ON_SEARCH_KNOWLEDGE_BASE': ExternalKBSearchResultData[]
    'ON_GET_KNOWLEDGE_BASE_ARTICLE': ExternalKBArticleData | null
    'ON_OPEN_RECORD': void
    'ON_SEARCH_RECORDS': void
    'ON_SHOW_SCREEN': void
    'ON_SCREEN_RECORDING_STATE_CHANGE': void
    'ON_WIDGET_MINIMIZED_CHANGE': void
    'ON_SERVER_ERROR': void
    'ON_SOFTPHONE_STATUS_CHANGE': void
    'ON_AUDIO_DEVICE_CHANGE': void
    'ON_PHONE_CAPABILITIES_CHANGE': void
    'ON_CALL_AUDIO_QUALITY_ALERT': void
    'ON_WEB_SCREEN_POP_CUSTOM': boolean
    'ON_SAVE_ACTIVITY_RECORD': void
    'ON_VALIDATE_ASSOCIATED_RECORDS': RecordsValidationResult
    'ON_REQUEST_RECORD_INFO': InteractionAssociatedObjectData | null
    'ON_REQUEST_RECORD_ON_SCREEN': InteractionAssociatedObjectData | null
}

const resultStatus = ['error', 'success'] as const
export type ResultStatus = typeof resultStatus[number]

export const resultErrorCodes = {
    not_enough_privileges: 1,
    not_logged_in: 2,
    invalid_args: 3,
    logged_without_phone: 4,
    banned: 5,
    api_not_answer: 6,
    invalid_request: 7,
    timeout: 8,
    no_chat_in_service: 9,
    empty_number: 10,
    no_service: 11,
    self_call: 12,
    no_interaction: 13,
    api_method_not_implemented: 14,
    not_suitable_state: 15,
    no_disposition: 16,
    object_not_found: 17,
    no_permissions_did_sms: 18,
    no_permissions_did_call: 19,
    no_channel_in_service: 20,
    unknown_error: 99,
} as const
export type ResultErrorCodes = typeof resultErrorCodes

export const serverErrorCodes = {
    forced_logout_by_other_client: 100,
    forced_logout_by_supervisor: 101,
    invalid_request: 102,
    phone_not_registered: 103,
    phone_not_in_dial_plan: 104,
    tenant_disabled: 105,
    destination_user_not_logged: 106,
    user_disabled_or_deleted: 107,
    user_already_logged_in: 108,
    invalid_credentials: 109,
    other_user_logged_with_phone: 110,
    invalid_token: 111,
    logged_users_limit_reached: 112,
    already_logged_in_with_the_same_session: 113,
    not_enough_privileges: 114,
    sip_server_error: 200,
    unknown_error: 300,
} as const
export type ServerErrorCodes = typeof serverErrorCodes

export type ResultError = {
    code: ResultErrorCodes[keyof ResultErrorCodes]
    name: keyof ResultErrorCodes
    message?: string
}

export type OperationResult<ReturnType = null> =
    {status: 'success'; data: ReturnType} |
    {status: 'error'; error: ResultError}

export type SyncAsyncResult<ReturnType = void> = ReturnType | Promise<ReturnType>

export const agentStates = ['supervising', 'ready', 'not_ready', 'busy', 'after_call_work', 'reserved', 'ringing'] as const
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
    'whatsapp',
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
    'phone_type_microsoft_teams',
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

export type UserState = AgentState | 'offline'

export const chatPartyTypes = ['internal', 'external'] as const
export type ChatPartyType = typeof chatPartyTypes[number]

export type LoginStateData = {
    isLoggedIn: boolean
    agentId?: string
    username?: string
    sessionId?: string
}

export type AgentStateData = {
    state: AgentState
    reservedForIncomingInteraction: boolean
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

export type InteractionAssociatedObjectData = {
    id: string
    type: string
    displayName: string
    displayType: string
    customFields: Record<string, string>
}
export type InteractionAssociatedObject = {
    source: string
} & InteractionAssociatedObjectData

export type InteractionAssociatedObjectsData = {
    list: InteractionAssociatedObject[]
    selected: string[]
}

export type AttachedData = Record<string, string>

export type InteractionData = {
    interactionId: string
    globalInteractionId?: string
    state: InteractionState
    type: InteractionType
    callParties: CallParty[]
    callMuted: boolean
    callRecording: boolean
    chatParties: ChatParty[]
    attachedData: AttachedData
    phoneNumber?: string
    email?: string
    callDirection?: CallDirection
    startTime?: number
    endTime?: number
    duration?: number
    description?: string
    disposition?: string
    service?: string
    playbackUrl?: string
    recordingUrl?: string
    DNIS?: string
    ANI?: string
    origination?: InteractionOrigination

    /** @deprecated */
    subject: string
    /** @deprecated */
    associatedObjects: InteractionAssociatedObjectsData
}

export type InteractionActivityData = {
    interactionId: string
    globalInteractionId?: string
    state: InteractionState
    type: InteractionType
    associatedObjects: InteractionAssociatedObjectsData
    attachedData: AttachedData
    phoneNumber?: string
    email?: string
    callDirection?: CallDirection
    startTime?: number
    endTime?: number
    duration?: number
    description?: string
    disposition?: string
    service?: string
    playbackUrl?: string
    recordingUrl?: string
    DNIS?: string
    ANI?: string
    origination?: InteractionOrigination

    /** @deprecated */
    subject: string
    /** @deprecated */
    callParties: CallParty[]
    /** @deprecated */
    callMuted: boolean
    /** @deprecated */
    callRecording: boolean
    /** @deprecated */
    chatParties: ChatParty[]
}

export type InteractionScreen = Record<string, string | number | boolean | null | undefined>

export type CustomTransferData = Record<string, string | number | boolean | undefined | null>

export type ExternalKBArticleData = {
    id: string
    title: string
    keywords: string
    answer: string
    notes: string
    language: string
    createdByUser: string
    lastEditedByUser: string
    customFields: string[]
}
export type ExternalKBArticle = ExternalKBArticleData & {source: string}

export type ExternalKBArticleItem = {
    id: string
    type: 'article'
    title: string
    text: string
}
export type ExternalKBFolderItem = {
    id: string
    type: 'folder'
    title: string
}

export type ExternalKBSearchResultData = ExternalKBArticleItem
export type ExternalKBSearchResult = ExternalKBSearchResultData & {source: string}

export type ExternalKBItemData = ExternalKBArticleItem | ExternalKBFolderItem
export type ExternalKBItem = ExternalKBItemData & {source: string}

export type KBFolderOptions = {
    language?: string
    folderId?: string
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

export type ChatParty = {
    id: string
    type: ChatPartyType
    name: string
    userId?: string
    contactId?: string
    email?: string
    phone?: string
}

export type ScreenRecordingState = {
    allowed: boolean
    active: boolean
    muted: boolean
}

export type ServerErrorData = {
    code: ServerErrorCodes[keyof ServerErrorCodes]
    name: keyof ServerErrorCodes
    timestamp: number // Date.now()
    message?: string
}

export type LoginData = {
    username: string
    password: string
    tenant?: string
}

export type PhoneCapabilities = {
    canDial: boolean
    canAnswer: boolean
    canHold: boolean
    canRetrieve: boolean
}

export type DIDNumber = {
    id: string
    number: string
    isSMS: boolean
    isVoice: boolean
}

export type WebScreenPopSecondaryUrl = {
    label?: string
    url?: string
}

export type WebScreenPop = {
    action: 'OPEN_WEB_PAGE' | 'DISPLAY_TEXT'
    url: string
    content: string
    label: string
    popUponAnswer: boolean
    keepPopupOpenAfterFinish: boolean
    popup: boolean
    secondaryUrls?: {
        [key: number]: WebScreenPopSecondaryUrl
    }
}

export const interactionOriginations = [
    'dialpad',
    'dialpad-search',
    'directory',
    'recent',
    'favorites',
    'workitem',
    'interaction',
    'contact-profile',
    'help',
    'conference',
    'auto',
    'integration-api',
    'chat-center',
] as const
export type InteractionOrigination = typeof interactionOriginations[number]

export type InteractionsState = {
    activeInteractionId: string | null
    interactions: InteractionData[]
}

export type OpenRecordOptions = {
    inNewTab: boolean
    source: 'user' | 'scenario'
}

export const phoneTypes = ['mobile', 'business', 'home', 'fax', 'other'] as const
type PhoneType = typeof phoneTypes[number]

export type PhoneData = {
    number: string
    type: PhoneType
    displayType?: string
}

export type DialCandidate = {
    id: string
    displayName: string
    phones: PhoneData[]
    associatedObjects: InteractionAssociatedObjectData[]
    email?: string
}

export type RecordsValidationResult = {
    valid: boolean
    message?: string
}

export type RecordInfoRequest = {
    id: string
    type: string
}

export type InitialObjects = InteractionAssociatedObjectData | InteractionAssociatedObjectData[]


export type InitiateResult = {
    id: string | null
    error?: string
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
export type OnWidgetMinimizedChangeHandler = (widgetMinimized: boolean) => SyncAsyncResult
export type OnGetKnowledgeBaseFolderHandler = (options: KBFolderOptions) => SyncAsyncResult<ExternalKBItemData[]>
export type OnSearchKnowledgeBaseHandler = (query: string, language?: string, folderId?: string) => SyncAsyncResult<ExternalKBSearchResultData[]>
export type OnGetKnowledgeBaseArticleHandler = (articleId: string) => SyncAsyncResult<ExternalKBArticleData | null>
export type OnOpenRecordHandler = (record: InteractionAssociatedObjectData, interactionId?: string, options?: OpenRecordOptions) => SyncAsyncResult
export type OnSearchRecordsHandler = (search: SearchRecordsQuery, interactionId?: string, inNewTab?: boolean) => SyncAsyncResult
export type OnShowScreenHandler = (screen: InteractionScreen, interactionId?: string) => SyncAsyncResult
export type OnScreenRecordingStateChangeHandler = (screenRecordingState: ScreenRecordingState) => SyncAsyncResult
export type OnServerErrorHandler = (error: ServerErrorData) => SyncAsyncResult
export type OnSoftphoneStatusChangeHandler = (ready: boolean, error?: string) => SyncAsyncResult
export type OnAudioDeviceChangeHandler = (inputDevice?: string, outputDevice?: string) => SyncAsyncResult
export type OnPhoneCapabilitiesChangeHandler = (caps: PhoneCapabilities) => SyncAsyncResult
export type OnCallAudioQualityAlertHandler = (callId: string, alert: boolean) => SyncAsyncResult
export type OnWebScreenPopCustomHandler = (interactionId: string, webScreenPop: WebScreenPop) => SyncAsyncResult<boolean>
export type OnSaveActivityRecordHandler = (activity: InteractionActivityData) => SyncAsyncResult
export type OnValidateAssociatedRecordsHandler = (interactionId: string, records: InteractionAssociatedObjectsData) => SyncAsyncResult<RecordsValidationResult>
export type OnRequestRecordInfoHandler = (payload: RecordInfoRequest) => SyncAsyncResult<InteractionAssociatedObjectData | null>
export type OnRequestRecordOnScreenHandler = () => SyncAsyncResult<InteractionAssociatedObjectData | null>

export type MessageLogger = (message: string, data: any) => void

// TODO: resolve type issues
export type InitOptions = {
    integrationKey?: string
    // @ts-ignore
    adcFrame?: any // HTMLIFrameElement
    // @ts-ignore
    mountRoot?: any // HTMLElement
    standalone?: boolean
    disableNewInteractionPopup?: boolean
}

export declare class AgentDesktopClientAPI {
    // @ts-ignore
    adcFrame: any // HTMLIFrameElement | null

    constructor(options?: InitOptions)

    injectMessageLogger(callback: MessageLogger): void

    getLoginState(): Promise<OperationResult<LoginStateData>>
    login(loginData: LoginData, force?: boolean): Promise<OperationResult>
    logout(): Promise<OperationResult>
    getAgentState(): Promise<OperationResult<AgentStateData>>
    setAgentState(state: AgentState, notReadyReason?: string): Promise<OperationResult>
    acceptInteraction(interactionId?: string): Promise<OperationResult>
    rejectInteraction(interactionId?: string): Promise<OperationResult>
    startCall(phonenumber: string, associatedObjects?: InitialObjects): Promise<OperationResult<InitiateResult>>
    startChat(channel: ChatChannelType, address: string, associatedObjects?: InitialObjects): Promise<OperationResult<InitiateResult>>
    startEmail(email: string, associatedObjects?: InitialObjects): Promise<OperationResult<InitiateResult>>
    sendDtmf(dtmf: string, interactionId?: string): Promise<OperationResult>
    consultCall(phone: string): Promise<OperationResult>
    blindTransfer(phone: string, customTransferData?: CustomTransferData, interactionId?: string): Promise<OperationResult>
    transfer(customTransferData?: CustomTransferData): Promise<OperationResult>
    leaveInteraction(interactionId?: string): Promise<OperationResult>
    completeInteraction(interactionId?: string): Promise<OperationResult>
    leaveAndCompleteInteraction(disposition?: string, note?: string, interactionId?: string): Promise<OperationResult>
    switchActiveInteraction(interactionId: string): Promise<OperationResult>
    inviteToCallConference(phone: string, customTransferData?: CustomTransferData, interactionId?: string): Promise<OperationResult>
    removeFromCallConference(partyId: string, interactionId?: string): Promise<OperationResult>
    destroyCallConference(interactionId?: string): Promise<OperationResult>
    mergeAllCallsIntoConference(customTransferData?: CustomTransferData): Promise<OperationResult>
    inviteToChatConference(partyId: string, interactionId?: string): Promise<OperationResult>
    removeFromChatConference(partyId: string, interactionId?: string): Promise<OperationResult>
    getTeams(): Promise<OperationResult<Team[]>>
    getTeamMembers(teamId: string): Promise<OperationResult<User[]>>
    getServicesList(): Promise<OperationResult<ServiceData[]>>
    getService(): Promise<OperationResult<ServiceData | null>>
    setService(service: string | null): Promise<OperationResult>
    getDIDNumbersList(): Promise<OperationResult<DIDNumber[]>>
    getDIDNumber(): Promise<OperationResult<DIDNumber | null>>
    setDIDNumber(did: string | null): Promise<OperationResult>
    getDispositionsList(target: DispositionTarget): Promise<OperationResult<DispositionData[]>>
    setDisposition(disposition: string, interactionId?: string): Promise<OperationResult>
    setRescheduleWindow(rescheduleData: RescheduleData, interactionId?: string): Promise<OperationResult>
    addNote(note: string, interactionId?: string): Promise<OperationResult>
    updateNote(note: string, interactionId?: string): Promise<OperationResult>
    replaceNote(note: string, interactionId?: string): Promise<OperationResult>
    getConfig(): Promise<OperationResult<IntegrationConfig>>
    setVariable(key: string, value: string, interactionId?: string): Promise<OperationResult>
    getVariables(keys: string[], interactionId?: string): Promise<OperationResult<Record<string, string>>>
    addInteractionAssociatedObject(object: InteractionAssociatedObjectData, interactionId?: string): Promise<OperationResult>
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
    sendChatMessage(message: string, interactionId?: string): Promise<OperationResult>
    suggestChatMessage(message: string, allowOverwrite?: boolean, interactionId?: string): Promise<OperationResult>
    getAgentNotReadyReasons(): Promise<OperationResult<string[]>>
    activatePage(): Promise<OperationResult>
    getInteractionsState(): Promise<OperationResult<InteractionsState>>
    setCallRecordingMute(state: boolean, interactionId?: string): Promise<OperationResult>
    setDialCandidates(candidates: DialCandidate[]): Promise<OperationResult>

    on(message: 'ON_LOGIN', handler: OnLoginHandler): void
    on(message: 'ON_LOGOUT', handler: OnLogoutHandler): void
    on(message: 'ON_NEW_INTERACTION', handler: OnNewInteractionHandler): void
    on(message: 'ON_INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void
    on(message: 'ON_INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void
    on(message: 'ON_ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void
    on(message: 'ON_AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void
    on(message: 'ON_REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void
    on(message: 'ON_LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void
    on(message: 'ON_GET_KNOWLEDGE_BASE_FOLDER', handler: OnGetKnowledgeBaseFolderHandler): void
    on(message: 'ON_SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void
    on(message: 'ON_GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void
    on(message: 'ON_OPEN_RECORD', handler: OnOpenRecordHandler): void
    on(message: 'ON_SEARCH_RECORDS', handler: OnSearchRecordsHandler): void
    on(message: 'ON_SHOW_SCREEN', handler: OnShowScreenHandler): void
    on(message: 'ON_SCREEN_RECORDING_STATE_CHANGE', handler: OnScreenRecordingStateChangeHandler): void
    on(message: 'ON_WIDGET_MINIMIZED_CHANGE', handler: OnWidgetMinimizedChangeHandler): void
    on(message: 'ON_SERVER_ERROR', handler: OnServerErrorHandler): void
    on(message: 'ON_SOFTPHONE_STATUS_CHANGE', handler: OnSoftphoneStatusChangeHandler): void
    on(message: 'ON_AUDIO_DEVICE_CHANGE', handler: OnAudioDeviceChangeHandler): void
    on(message: 'ON_PHONE_CAPABILITIES_CHANGE', handler: OnPhoneCapabilitiesChangeHandler): void
    on(message: 'ON_CALL_AUDIO_QUALITY_ALERT', handler: OnCallAudioQualityAlertHandler): void
    on(message: 'ON_WEB_SCREEN_POP_CUSTOM', handler: OnWebScreenPopCustomHandler): void
    on(message: 'ON_SAVE_ACTIVITY_RECORD', handler: OnSaveActivityRecordHandler): void
    on(message: 'ON_VALIDATE_ASSOCIATED_RECORDS', handler: OnValidateAssociatedRecordsHandler): void
    on(message: 'ON_REQUEST_RECORD_INFO', handler: OnRequestRecordInfoHandler): void
    on(message: 'ON_REQUEST_RECORD_ON_SCREEN', handler: OnRequestRecordOnScreenHandler): void

    remove(message: 'ON_LOGIN', handler: OnLoginHandler): void
    remove(message: 'ON_LOGOUT', handler: OnLogoutHandler): void
    remove(message: 'ON_NEW_INTERACTION', handler: OnNewInteractionHandler): void
    remove(message: 'ON_INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void
    remove(message: 'ON_INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void
    remove(message: 'ON_ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void
    remove(message: 'ON_AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void
    remove(message: 'ON_REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void
    remove(message: 'ON_LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void
    remove(message: 'ON_GET_KNOWLEDGE_BASE_FOLDER', handler: OnGetKnowledgeBaseFolderHandler): void
    remove(message: 'ON_SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void
    remove(message: 'ON_GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void
    remove(message: 'ON_OPEN_RECORD', handler: OnOpenRecordHandler): void
    remove(message: 'ON_SEARCH_RECORDS', handler: OnSearchRecordsHandler): void
    remove(message: 'ON_SHOW_SCREEN', handler: OnShowScreenHandler): void
    remove(message: 'ON_SCREEN_RECORDING_STATE_CHANGE', handler: OnScreenRecordingStateChangeHandler): void
    remove(message: 'ON_WIDGET_MINIMIZED_CHANGE', handler: OnWidgetMinimizedChangeHandler): void
    remove(message: 'ON_SERVER_ERROR', handler: OnServerErrorHandler): void
    remove(message: 'ON_SOFTPHONE_STATUS_CHANGE', handler: OnSoftphoneStatusChangeHandler): void
    remove(message: 'ON_AUDIO_DEVICE_CHANGE', handler: OnAudioDeviceChangeHandler): void
    remove(message: 'ON_PHONE_CAPABILITIES_CHANGE', handler: OnPhoneCapabilitiesChangeHandler): void
    remove(message: 'ON_CALL_AUDIO_QUALITY_ALERT', handler: OnCallAudioQualityAlertHandler): void
    remove(message: 'ON_WEB_SCREEN_POP_CUSTOM', handler: OnWebScreenPopCustomHandler): void
    remove(message: 'ON_SAVE_ACTIVITY_RECORD', handler: OnSaveActivityRecordHandler): void
    remove(message: 'ON_VALIDATE_ASSOCIATED_RECORDS', handler: OnValidateAssociatedRecordsHandler): void
    remove(message: 'ON_REQUEST_RECORD_INFO', handler: OnRequestRecordInfoHandler): void
    remove(message: 'ON_REQUEST_RECORD_ON_SCREEN', handler: OnRequestRecordOnScreenHandler): void
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
