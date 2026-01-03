import {
  DatabaseObjectResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

export default class NotionParser {
  /**
   * Extracts and returns the title of a Notion database.
   *
   * To get the DatabaseObjectResponse, you can use NotionQuery's
   * retrieveDatabaseInformation method or the official Notion SDK's database retrieve
   * method.
   *
   * @param database the Notion database object
   */
  public static getDatabaseTitle(database: DatabaseObjectResponse) {
    if (database.title.length > 0) {
      return database.title.map((part) => part.plain_text).join('')
    }

    return undefined
  }

  /**
   * Extracts and returns the description of a Notion database.
   *
   * To get the DatabaseObjectResponse, you can use NotionQuery's
   * retrieveDatabaseInformation method or the official Notion SDK's database retrieve
   * method.
   *
   * @param database the Notion database object
   */
  public static getDatabaseDescription(database: DatabaseObjectResponse) {
    if (database.description.length > 0) {
      return database.description.map((part) => part.plain_text).join('')
    }

    return undefined
  }

  /**
   * Extracts and returns the title of a Notion page from its properties.
   *
   * To get the PageObjectResponse, you can use NotionQuery's
   * retrievePageInformation method or the official Notion SDK's page retrieve
   * method.
   *
   * @param page the Notion page object
   */
  public static getPageTitle(page: PageObjectResponse) {
    const title = Array.from(Object.values(page.properties)).find(
      (property) => property.type === 'title'
    )

    if (title && title.type === 'title' && title.title.length > 0) {
      return title.title.map((part) => part.plain_text).join('')
    }

    return undefined
  }

  /**
   * Extracts and returns the plain text property value from a Notion page's properties.
   * @param properties
   * @param name
   */
  public static getPlainTextPageProperty(
    properties: PageObjectResponse['properties'],
    name: string
  ) {
    const property = properties[name]
    if (property && property.type === 'rich_text' && property.rich_text.length > 0) {
      return property.rich_text.map((part) => part.plain_text).join('')
    }

    return undefined
  }

  /**
   * Extracts and returns the email property value from a Notion page's properties.
   * @param properties the properties of the Notion page
   * @param name the name of the email property to extract
   */
  public static getMailPageProperty(properties: PageObjectResponse['properties'], name: string) {
    const property = properties[name]
    if (property && property.type === 'email' && property.email) {
      return property.email
    }

    return undefined
  }

  /**
   * Extracts and returns the url property value from a Notion page's properties.
   * @param properties
   * @param name
   */
  public static getURLPageProperty(properties: PageObjectResponse['properties'], name: string) {
    const property = properties[name]
    if (property && property.type === 'url' && property.url) {
      return new URL(property.url).toString()
    }

    return undefined
  }

  /**
   * Extracts and returns the multi-select property values from a Notion page's properties.
   * @param properties
   * @param name
   */
  public static getMultiSelectPageProperty(
    properties: PageObjectResponse['properties'],
    name: string
  ) {
    const property = properties[name]
    if (property && property.type === 'multi_select' && property.multi_select.length > 0) {
      return property.multi_select.map((option) => option)
    }

    return []
  }

  /**
   * Extracts and returns the select property value from a Notion page's properties.
   * @param properties
   * @param name
   */
  public static getSelectPageProperty(properties: PageObjectResponse['properties'], name: string) {
    const property = properties[name]
    if (property && property.type === 'select' && property.select) {
      return property.select
    }

    return undefined
  }

  /**
   * Extracts and returns the file URL from a Notion page's properties.
   * @param properties
   * @param name
   */
  public static getFilesAndMediaPageProperty(
    properties: PageObjectResponse['properties'],
    name: string
  ) {
    const property = properties[name]
    if (property && property.type === 'files' && property.files.length > 0) {
      const file = property.files[0]
      if (file.type === 'external') {
        return file.external.url
      } else if (file.type === 'file') {
        return file.file.url
      }
    }
    return undefined
  }
}
