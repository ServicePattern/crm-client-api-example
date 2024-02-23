import {LoremIpsum} from 'lorem-ipsum'

import type {
    AgentDesktopClientAPI,
    ExternalKBArticleData,
    ExternalKBItemData,
    ExternalKBSearchResultData,
    KBFolderOptions,
} from '../brightpattern-client-api-types'
import {assertDefined, findNode, flatTree} from '../helpers'
import type {TreeStructure} from '../models/tree'
import {Tree} from '../models/tree'


type ArticleData = {
    content: string
}

const textGen = new LoremIpsum()

export function initializeKnowledgeBaseHandlers(adApi: AgentDesktopClientAPI) {

    const initialTree: TreeStructure<{}, ArticleData> = {
        'root_1': {
            type: 'node',
            displayName: 'Common cases',
            id: 'root_1',
            ref: {},
            children: {
                'customers_1': {
                    type: 'node',
                    displayName: 'End users',
                    id: 'customers_1',
                    ref: {},
                    children: {
                        'article_1': {
                            type: 'leaf',
                            displayName: 'Unable to login',
                            id: 'article_1',
                            ref: {
                                content: textGen.generateParagraphs(3),
                            },
                        },
                        'article_2': {
                            type: 'leaf',
                            displayName: 'Service unavailable error',
                            id: 'article_2',
                            ref: {
                                content: textGen.generateParagraphs(3),
                            },
                        },
                        'article_3': {
                            type: 'leaf',
                            displayName: 'Help with registration',
                            id: 'article_3',
                            ref: {
                                content: textGen.generateParagraphs(3),
                            },
                        },
                    },
                },
                'partners_1': {
                    type: 'node',
                    displayName: 'Business partners',
                    id: 'partners_2',
                    ref: {},
                    children: {
                        'article_4': {
                            type: 'leaf',
                            displayName: 'Request for a meeting',
                            id: 'article_4',
                            ref: {
                                content: textGen.generateParagraphs(3),
                            },
                        },
                        'article_5': {
                            type: 'leaf',
                            displayName: 'Contract questions',
                            id: 'article_5',
                            ref: {
                                content: textGen.generateParagraphs(3),
                            },
                        },
                    },
                }
            },
        },
        'root_2': {
            type: 'node',
            displayName: 'Hardware maintenance',
            id: 'root_2',
            ref: {},
            children: {
                'article_6': {
                    type: 'leaf',
                    displayName: 'HTC device malfuction',
                    id: 'article_6',
                    ref: {
                        content: textGen.generateParagraphs(3),
                    },
                },
                'article_7': {
                    type: 'leaf',
                    displayName: 'PU voltage issues',
                    id: 'article_7',
                    ref: {
                        content: textGen.generateParagraphs(3),
                    },
                },
                'article_8': {
                    type: 'leaf',
                    displayName: 'Unable to connect wireless device',
                    id: 'article_8',
                    ref: {
                        content: textGen.generateParagraphs(3),
                    },
                },
            },
        },
        'readme': {
            type: 'leaf',
            displayName: 'KB Reminder',
            id: 'readme',
            ref: {
                content: textGen.generateParagraphs(1),
            },
        }
    }

    const kbTreeRoot = document.getElementById('kb_tree_root')
    assertDefined(kbTreeRoot)
    const kbTree = new Tree(initialTree, {mountNode: kbTreeRoot})

    adApi.on('ON_SEARCH_KNOWLEDGE_BASE', (query, _language, folderId) => {
        const currentTree = kbTree.getTree()
        const foundNode = folderId ? findNode(currentTree, folderId) : undefined
        if (folderId && (!foundNode || foundNode.type !== 'node')) {
            return []
        }
        const searchRoot = foundNode?.type == 'node' ? foundNode.children : currentTree
        const allLeafs = flatTree(searchRoot)

        return allLeafs
        .filter(leaf => leaf.displayName.includes(query) || leaf.ref.content.includes(query))
        .map<ExternalKBSearchResultData>(leaf => ({
            type: 'article',
            id: leaf.id,
            text: leaf.ref.content,
            title: leaf.displayName,
        }))
    })

    adApi.on('ON_GET_KNOWLEDGE_BASE_ARTICLE', (articleId): ExternalKBArticleData | null => {
        const leaf = flatTree(kbTree.getTree()).find(leaf => leaf.id === articleId)
        if (!leaf) {
            return null
        }
        return {
            id: leaf.id,
            title: leaf.displayName,
            answer: leaf.ref.content,
            keywords: 'none',
            createdByUser: 'unknown',
            lastEditedByUser: 'unknown',
            notes: 'empty',
            language: 'en',
            customFields: [],
        }
    })

    adApi.on('ON_GET_KNOWLEDGE_BASE_FOLDER', ({folderId}: KBFolderOptions): ExternalKBItemData[] => {
        const currentTree = kbTree.getTree()
        const foundNode = folderId ? findNode(currentTree, folderId) : undefined
        if (folderId && (!foundNode || foundNode.type !== 'node')) {
            return []
        }
        const requestedRoot = foundNode?.type == 'node' ? foundNode.children : currentTree
        return Object.values(requestedRoot)
        .map<ExternalKBItemData>(item => {
            if (item.type === 'node') {
                return {
                    type: 'folder',
                    id: item.id,
                    title: item.displayName,
                }
            } else {
                return {
                    type: 'article',
                    id: item.id,
                    title: item.displayName,
                    text: item.ref.content,
                }
            }
        })
    })
}
