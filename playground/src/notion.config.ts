import { NotionRenderConfig } from '@wanner.work/notion'
import NotionCalloutBlock from '@/components/blocks/NotionCalloutBlock'

export default {
  blocks: [
    {
      type: 'callout',
      component: NotionCalloutBlock
    }
  ],
  hideUnsupportedBlockWarning: false
} satisfies NotionRenderConfig
