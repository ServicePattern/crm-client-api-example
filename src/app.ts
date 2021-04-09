import {Hamburger} from './models/hamburger'

import {Menu} from './models/menu'
import {Tab} from './models/tab'
import {Logger} from './models/logger'
import {initializeSessionHandlers} from './controllers/session'
import {initializePhoneDeviceHandlers} from './controllers/phone-device'
import {initializeAgentStateHandlers} from './controllers/agent-state'
import {initializeStartInteractionHandlers} from './controllers/interactions/start-interaction'
import {initializeTransferInteractionHandlers} from './controllers/interactions/transfer'
import {initializeConferenceInteractionHandlers} from "./controllers/interactions/conference";
import {initializeActiveInteractionHandlers} from './controllers/interactions/active-interaction'
import {initializeAssociatedObjectInteractionHandlers} from './controllers/interactions/associatedObject'
import {initializeNotesAndDispositionsHandlers} from './controllers/interactions/notes-dispositions'
import {initializeEndInteractionHandlers} from './controllers/interactions/end-interaction'
import {initializeTeamsAndServiceHandlers} from './controllers/teams-service'
import {initializeScreenRecordingHandlers} from './controllers/screen-recording'
import {initializeKnowledgeBaseHandlers} from './controllers/knowledge-base'
import {initializeRescheduleHandlers} from './controllers/reschedule'
import {initializeWidgetAndConfigHandlers} from './controllers/widget-config'
import {initializeResizeButtonHandler} from './controllers/resize-button'

import './app.css'

const integrationKey = 'test-adapter'
const adcMountNode = document.getElementById('adc_mount_node')!

const adApi = new window.brightpattern.AdApi({
    integrationKey,
    mountRoot: adcMountNode,
    standalone: !!(new URLSearchParams(location.search)).get('standalone'),
})

const hamburger = new Hamburger('.hamburger', '.menu')
hamburger.initializeEventListener()

const menu = new Menu(hamburger, {
    menu: '.menu',
    menuItems: '.menu-item',
    section: '.section',
    multipleSelect: '#menu_multiple_select_checkbox'
})

menu.initializeEventListeners()

const tab = new Tab('.tab', '.tab-item', '.tab-content')
tab.initializeEventListeners()


const logger = new Logger(adApi, '#log')
logger.initialize()
logger.initializeClearLogOnClick('#clear_log')


initializeResizeButtonHandler()

initializeSessionHandlers(adApi)
initializePhoneDeviceHandlers(adApi)
initializeAgentStateHandlers(adApi)
initializeTeamsAndServiceHandlers(adApi)
initializeScreenRecordingHandlers(adApi)
initializeKnowledgeBaseHandlers(adApi)
initializeRescheduleHandlers(adApi)
initializeWidgetAndConfigHandlers(adApi)

initializeStartInteractionHandlers(adApi)
initializeTransferInteractionHandlers(adApi)
initializeConferenceInteractionHandlers(adApi)
initializeActiveInteractionHandlers(adApi)
initializeAssociatedObjectInteractionHandlers(adApi)
initializeNotesAndDispositionsHandlers(adApi)
initializeEndInteractionHandlers(adApi)
