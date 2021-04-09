import { AgentDesktopClientAPI } from "../brightpattern-client-api-types"

export function initializeKnowledgeBaseHandlers(adApi: AgentDesktopClientAPI) {
    const searchKBResultTextarea = document.getElementById('search_kb_result_textarea')! as HTMLTextAreaElement
    const kbArticleFullDataTextarea = document.getElementById('kb_article_full_data_textarea')! as HTMLTextAreaElement


    adApi.on('ON_SEARCH_KNOWLEDGE_BASE', () => {
        let searchKbResult: any | null = null
        try {
            searchKbResult = JSON.parse(searchKBResultTextarea.value)
        } catch (e) {
            alert('You have syntax error in the KB search results data structure. Cannot parse JSON.')
        }
        if (!searchKbResult) {
            return null
        }
        return searchKbResult
    })

    adApi.on('ON_GET_KNOWLEDGE_BASE_ARTICLE', () => {
        let kbArticleDullData: any | null = null
        try {
            kbArticleDullData = JSON.parse(kbArticleFullDataTextarea.value)
        } catch (e) {
            alert('You have syntax error in the KB Article data structure. Cannot parse JSON.')
        }
        if (!kbArticleDullData) {
            return null
        }
        return kbArticleDullData
    })

}