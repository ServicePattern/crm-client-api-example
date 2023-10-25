import {Hamburger} from './models/hamburger'

import {Menu} from './models/menu'
import {Tab} from './models/tab'
import {Logger} from './models/logger'
import {initializeSessionHandlers} from './controllers/session'
import {initializePhoneDeviceHandlers} from './controllers/phone-device'
import {initializeAgentStateHandlers} from './controllers/agent-state'
import {initializeStartInteractionHandlers} from './controllers/interactions/start-interaction'
import {initializeChatHandlers} from './controllers/interactions/chat'
import {initializeTransferInteractionHandlers} from './controllers/interactions/transfer'
import {initializeConferenceInteractionHandlers} from "./controllers/interactions/conference";
import {initializeActiveInteractionHandlers} from './controllers/interactions/active-interaction'
import {initializeAssociatedObjectInteractionHandlers} from './controllers/interactions/associatedObject'
import {initializeNotesAndDispositionsHandlers} from './controllers/interactions/notes-dispositions'
import {initializeEndInteractionHandlers} from './controllers/interactions/end-interaction'
import {initializeTeamsHandlers} from './controllers/teams'
import {initializeServicesAndDIDHandlers} from './controllers/services-did'
import {initializeScreenRecordingHandlers} from './controllers/screen-recording'
import {initializeKnowledgeBaseHandlers} from './controllers/knowledge-base'
import {initializeRescheduleHandlers} from './controllers/reschedule'
import {initializeWidgetAndConfigHandlers} from './controllers/widget-config'
import {initializeResizeButtonHandler} from './controllers/resize-button'

import './app.css'


const adcMountNode = document.getElementById('adc_mount_node')!
const urlParams = new URLSearchParams(location.search)

const brightpatternDomain = urlParams.get('bpatternDomain') || 'localhost:3000'
const integrationKey = urlParams.get('integrationKey') || 'test-adapter'


loadCommWidgetApi().then(initializeIntegration)


function loadCommWidgetApi() {
    return new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script')
        scriptTag.addEventListener('load', resolve)
        scriptTag.addEventListener('error', reject)
        scriptTag.type = 'application/javascript'
        scriptTag.src = `https://${brightpatternDomain}/agent/communicator/adapters/api.js`
        document.head.appendChild(scriptTag)
    })
}

function initializeIntegration() {

    const adApi = new window.brightpattern.AdApi({
        integrationKey,
        mountRoot: adcMountNode,
        standalone: !!urlParams.get('standalone'),
        disableNewInteractionPopup: !!urlParams.get('no-popup'),
    })
    // @ts-expect-error Add API instance to the global scope so you can access it through the browser console for testing purposes
    window.adApi = adApi
    
    const hamburger = new Hamburger({hamburger: '.hamburger', menu: '.menu', menuItem: '.menu-item'})
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
    initializeTeamsHandlers(adApi)
    initializeServicesAndDIDHandlers(adApi)
    initializeScreenRecordingHandlers(adApi)
    initializeKnowledgeBaseHandlers(adApi)
    initializeRescheduleHandlers(adApi)
    initializeWidgetAndConfigHandlers(adApi)
    
    initializeStartInteractionHandlers(adApi)
    initializeChatHandlers(adApi)
    initializeTransferInteractionHandlers(adApi)
    initializeConferenceInteractionHandlers(adApi)
    initializeActiveInteractionHandlers(adApi)
    initializeAssociatedObjectInteractionHandlers(adApi)
    initializeNotesAndDispositionsHandlers(adApi)
    initializeEndInteractionHandlers(adApi)
    
}