import NotionCustomBlock from '../NotionCustomBlock'

/**
 * Configuration options for rendering Notion content.
 */
export default interface NotionRenderConfig {
  /**
   * Custom blocks to override default Notion block rendering.
   * Each custom block should specify the `type` of Notion block it overrides
   * and the corresponding React component to render that block.
   *
   * @example
   * ```ts
   * import NotionCalloutBlock from "@/components/blocks/NotionCalloutBlock";
   *
   * const config: NotionRenderConfig = {
   *   blocks: [
   *     {
   *       type: "callout",
   *       component: NotionCalloutBlock
   *     }
   *   ]
   * }
   * ```
   */
  blocks?: NotionCustomBlock[]

  /**
   * If set to true, suppresses warnings for unsupported Notion block types.
   * It is recommended to set this to true in production environments.
   */
  hideUnsupportedBlockWarning?: boolean
}
