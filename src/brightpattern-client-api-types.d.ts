export declare const requestMessages: readonly ["GET_AGENT_STATE", "SET_AGENT_STATE", "START_CALL", "START_SMS_CHAT", "START_EMAIL", "TERMINATE_CALL", "COMPLETE_INTERACTION", "SWITCH_ACTIVE_INTERACTION", "CHANGE_SERVICE", "SET_DISPOSITION", "GET_CALL_RECORDING_STATUS", "SET_CALL_RECORDING_STATUS", "GET_SCREEN_RECORDING_STATUS", "SET_SCREEN_RECORDING_STATUS", "MUTE_ALL", "UNMUTE_ALL", "GET_CONFIG", "SET_VARIABLE", "WIDGET_MINIMIZED", "WIDGET_MAXIMIZED", "ADD_INTERACTION_ASSOCIATED_OBJECT", "SET_INTERACTION_ACTIVE_SCREEN"];
export declare type RequestMessage = typeof requestMessages[number];
export declare const requestResponseMessages: readonly ["GET_AGENT_STATE_RESPONSE", "SET_AGENT_STATE_RESPONSE", "START_CALL_RESPONSE", "START_SMS_CHAT_RESPONSE", "START_EMAIL_RESPONSE", "TERMINATE_CALL_RESPONSE", "COMPLETE_INTERACTION_RESPONSE", "SWITCH_ACTIVE_INTERACTION_RESPONSE", "CHANGE_SERVICE_RESPONSE", "SET_DISPOSITION_RESPONSE", "GET_CALL_RECORDING_STATUS_RESPONSE", "SET_CALL_RECORDING_STATUS_RESPONSE", "GET_SCREEN_RECORDING_STATUS_RESPONSE", "SET_SCREEN_RECORDING_STATUS_RESPONSE", "MUTE_ALL_RESPONSE", "UNMUTE_ALL_RESPONSE", "GET_CONFIG_RESPONSE", "SET_VARIABLE_RESPONSE", "WIDGET_MINIMIZED_RESPONSE", "WIDGET_MAXIMIZED_RESPONSE", "ADD_INTERACTION_ASSOCIATED_OBJECT_RESPONSE", "SET_INTERACTION_ACTIVE_SCREEN_RESPONSE"];
export declare type RequestResponseMessage = typeof requestResponseMessages[number];
export declare const callbackMessages: readonly ["LOGIN", "LOGOUT", "NEW_INTERACTION", "INTERACTION_REMOVED", "INTERACTION_STATE_CHANGE", "ACTIVE_INTERACTION_SWITCHED", "AGENT_STATE_CHANGE", "REQUEST_TRANSFER_DATA", "LOAD_TRANSFER_DATA", "MANUAL_CALL", "MAXIMIZE_WIDGET", "SEARCH_KNOWLEDGE_BASE", "GET_KNOWLEDGE_BASE_ARTICLE", "OPEN_RECORD", "SEARCH_RECORDS", "SHOW_SCREEN", "ACTIVATE_INTERACTION_SCREEN"];
export declare type CallbackMessage = typeof callbackMessages[number];
export declare const callbackResponseMessages: readonly ["REQUEST_TRANSFER_DATA_RESPONSE", "SEARCH_KNOWLEDGE_BASE_RESPONSE", "GET_KNOWLEDGE_BASE_ARTICLE_RESPONSE"];
export declare type CallbackResponseMessage = typeof callbackResponseMessages[number];
declare const resultStatus: readonly ["error", "success"];
export declare type ResultStatus = typeof resultStatus[number];
declare type ResultError = {
    message: string;
};
export declare type OperationResult<ReturnType = null> = {
    status: ResultStatus;
    data?: ReturnType;
    error?: ResultError;
};
export declare type SyncAsyncResult<ReturnType = void> = ReturnType | Promise<ReturnType>;
export declare const agentStates: readonly ["supervising", "ready", "not_ready", "busy", "after_call_work"];
export declare type AgentState = typeof agentStates[number];
export declare const interactionState: readonly ["unknown", "queued", "ivr", "wrap_up", "wrap_up_hold", "delivered", "delivery_pending", "hold", "completed"];
export declare type InteractionState = typeof interactionState[number];
export declare const interactionType: readonly ["voice", "chat", "email"];
export declare type InteractionType = typeof interactionType[number];
export declare const callDirection: readonly ["inbound", "outbound"];
export declare type CallDirection = typeof callDirection[number];
export declare const recordingTargets: readonly ["call", "screen"];
export declare type RecordingTarget = typeof recordingTargets[number];
export declare type AgentStateData = {
    state: AgentState;
    notReadyReason?: string;
};
export declare type AgentLoginData = {
    GUID: string;
    agentId: string;
};
export declare type DispositionData = {
    name?: string;
    code?: string;
};
export declare type IntegrationConfig = any;
export declare type InteractionAssociatedObject = {
    id: string;
    type: string;
    displayName: string;
    displayType: string;
    customFields: Record<string, string>;
    source: string;
};
export declare type InteractionAssociatedObjectsData = {
    list: InteractionAssociatedObject[];
    selected: string | null;
};
export declare type InteractionData = {
    interactionId: string;
    state: InteractionState;
    type: InteractionType;
    subject: string;
    associatedObjects: InteractionAssociatedObjectsData;
    phoneNumber?: string;
    email?: string;
    callDirection?: CallDirection;
    startTime?: number;
    endTime?: number;
    duration?: number;
    description?: string;
    disposition?: string;
    globalInteractionId?: string;
    service?: string;
    playbackUrl?: string;
    recordingUrl?: string;
    DNIS?: string;
    ANI?: string;
};
export declare type InteractionScreen = Record<string, string | number | boolean | null | undefined>;
export declare type AgentData = {
    GUID: string;
    agentId: string;
};
export declare type CustomTransferData = Record<string, string | number | boolean | undefined | null>;
export declare type ExternalKBArticle = {
    id: string;
    title: string;
    keywords: string;
    answer: string;
    notes: string;
    language: string;
    createdByUser: string;
    lastEditedByUser: string;
    customFields: Record<string, string>;
    source: string;
};
export declare type ExternalKBSearchResult = {
    id: string;
    text: string;
    title: string;
    source: string;
};
export declare type SearchRecordsQuery = {
    text: string;
    types: string[];
};
export declare type OnLoginHandler = (sessionId: string, userdata: AgentData) => SyncAsyncResult;
export declare type OnLogoutHandler = () => SyncAsyncResult;
export declare type OnNewInteractionHandler = (newInteraction: InteractionData) => SyncAsyncResult;
export declare type OnInteractionRemovedHandler = (interaction: InteractionData) => SyncAsyncResult;
export declare type OnInteractionStateChangeHandler = (interaction: InteractionData) => SyncAsyncResult;
export declare type OnActiveInteractionSwitchHandler = (activatedInteractionId: string | null) => SyncAsyncResult;
export declare type OnAgentStateChangeHandler = (state: AgentState, notReadyReason?: string) => SyncAsyncResult;
export declare type OnRequestTransferDataHandler = (interactionId: string) => SyncAsyncResult<CustomTransferData>;
export declare type OnLoadTransferDataHandler = (interactionId: string, data: CustomTransferData) => SyncAsyncResult;
export declare type OnManualCallHandler = (phonenumber: string) => SyncAsyncResult;
export declare type OnMaximizeWidgetHandler = () => SyncAsyncResult;
export declare type OnSearchKnowledgeBaseHandler = (query: string, language?: string) => SyncAsyncResult<ExternalKBSearchResult[]>;
export declare type OnGetKnowledgeBaseArticleHandler = (id: string) => SyncAsyncResult<ExternalKBArticle | null>;
export declare type OnOpenRecord = (record: InteractionAssociatedObject, interactionId?: string) => SyncAsyncResult;
export declare type OnSearchRecords = (search: SearchRecordsQuery, interactionId?: string) => SyncAsyncResult;
export declare type OnShowScreen = (screen: InteractionScreen, interactionId?: string) => SyncAsyncResult;
export declare type IncomingMessageLogger = (message: RequestResponseMessage | CallbackMessage, data: any) => void;
export declare type OutgoingMessageLogger = (message: RequestMessage | CallbackResponseMessage | 'hi', data: any) => void;
export declare class AgentDesktopClientAPI {
    adcFrame: HTMLIFrameElement | null;
    constructor(integrationKey?: string, mountRoot?: HTMLElement);
    injectIncomingMessageLogger(callback: IncomingMessageLogger): void;
    injectOutgoingMessageLogger(callback: OutgoingMessageLogger): void;
    getAgentState(): Promise<OperationResult<AgentStateData>>;
    setAgentState(state: AgentState, notReadyReason?: string): Promise<OperationResult>;
    startCall(phonenumber: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>;
    startSMSChat(phonenumber: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>;
    startEmail(email: string, initialObject?: InteractionAssociatedObject): Promise<OperationResult<InteractionData>>;
    terminateCall(interactionId?: string): Promise<OperationResult>;
    completeInteraction(interactionId?: string): Promise<OperationResult>;
    switchActiveInteraction(interactionId: string): Promise<OperationResult>;
    changeService(serviceName: string): Promise<OperationResult>;
    setDisposition(dispositionData: DispositionData, interactionId?: string): Promise<OperationResult>;
    getCallRecordingStatus(interactionId?: string): Promise<OperationResult<boolean>>;
    setCallRecordingStatus(newStatus: boolean, interactionId?: string): Promise<OperationResult>;
    getScreenRecordingStatus(): Promise<OperationResult<boolean>>;
    setScreenRecordingStatus(newStatus: boolean): Promise<OperationResult>;
    muteAll(target?: RecordingTarget): Promise<OperationResult>;
    unmuteAll(target?: RecordingTarget): Promise<OperationResult>;
    getConfig(): Promise<OperationResult<IntegrationConfig>>;
    setVariable(key: string, value: string, interactionId?: string): Promise<OperationResult>;
    notifyWidgetMinimized(): Promise<OperationResult>;
    notifyWidgetMaximized(): Promise<OperationResult>;
    addInteractionAssociatedObject(object: InteractionAssociatedObject, interactionId?: string): Promise<OperationResult>;
    setInteractionActiveScreen(screenData: InteractionScreen, interactionId?: string): Promise<OperationResult>;
    on(message: 'LOGIN', handler: OnLoginHandler): void;
    on(message: 'LOGOUT', handler: OnLogoutHandler): void;
    on(message: 'NEW_INTERACTION', handler: OnNewInteractionHandler): void;
    on(message: 'INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void;
    on(message: 'INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void;
    on(message: 'ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void;
    on(message: 'AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void;
    on(message: 'REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void;
    on(message: 'LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void;
    on(message: 'MANUAL_CALL', handler: OnManualCallHandler): void;
    on(message: 'MAXIMIZE_WIDGET', handler: OnMaximizeWidgetHandler): void;
    on(message: 'SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void;
    on(message: 'GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void;
    on(message: 'OPEN_RECORD', handler: OnOpenRecord): void;
    on(message: 'SEARCH_RECORDS', handler: OnSearchRecords): void;
    on(message: 'SHOW_SCREEN', handler: OnShowScreen): void;
    remove(message: 'LOGIN', handler: OnLoginHandler): void;
    remove(message: 'LOGOUT', handler: OnLogoutHandler): void;
    remove(message: 'NEW_INTERACTION', handler: OnNewInteractionHandler): void;
    remove(message: 'INTERACTION_REMOVED', handler: OnInteractionRemovedHandler): void;
    remove(message: 'INTERACTION_STATE_CHANGE', handler: OnInteractionStateChangeHandler): void;
    remove(message: 'ACTIVE_INTERACTION_SWITCHED', handler: OnActiveInteractionSwitchHandler): void;
    remove(message: 'AGENT_STATE_CHANGE', handler: OnAgentStateChangeHandler): void;
    remove(message: 'REQUEST_TRANSFER_DATA', handler: OnRequestTransferDataHandler): void;
    remove(message: 'LOAD_TRANSFER_DATA', handler: OnLoadTransferDataHandler): void;
    remove(message: 'MANUAL_CALL', handler: OnManualCallHandler): void;
    remove(message: 'MAXIMIZE_WIDGET', handler: OnMaximizeWidgetHandler): void;
    remove(message: 'SEARCH_KNOWLEDGE_BASE', handler: OnSearchKnowledgeBaseHandler): void;
    remove(message: 'GET_KNOWLEDGE_BASE_ARTICLE', handler: OnGetKnowledgeBaseArticleHandler): void;
    remove(message: 'OPEN_RECORD', handler: OnOpenRecord): void;
    remove(message: 'SEARCH_RECORDS', handler: OnSearchRecords): void;
    remove(message: 'SHOW_SCREEN', handler: OnShowScreen): void;
}
interface AgentDesktopClientAPIClassType {
    prototype: AgentDesktopClientAPI;
    new (integrationKey?: string, frame?: HTMLElement): AgentDesktopClientAPI;
}
declare global {
    interface Window {
        brightpattern: {
            AdApi: AgentDesktopClientAPIClassType;
        };
    }
}
export {};
