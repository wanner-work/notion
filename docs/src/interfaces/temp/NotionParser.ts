import {
  DatabaseObjectResponse,
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

export interface NotionParser {
  /**
   * Extracts and returns the title of a Notion database.
   *
   * To get the DatabaseObjectResponse, you can use NotionQuery's
   * retrieveDatabaseInformation method or the official Notion SDK's database retrieve
   * method.
   */
  getDatabaseTitle(database: DatabaseObjectResponse): string;
  /**
   * Extracts and returns the description of a Notion database.
   *
   * To get the DatabaseObjectResponse, you can use NotionQuery's
   * retrieveDatabaseInformation method or the official Notion SDK's database retrieve
   * method.
   */
  getDatabaseDescription(database: DatabaseObjectResponse): string;
  /**
   * Extracts and returns the title of a Notion page from its properties.
   *
   * To get the PageObjectResponse, you can use NotionQuery's
   * retrievePageInformation method or the official Notion SDK's page retrieve
   * method.
   */
  getPageTitle(page: PageObjectResponse): string;
  /**
   * Extracts and returns the plain text property value from a Notion page's properties.
   */
  getPlainTextPageProperty(properties: PageObjectResponse['properties'], name: string): string;
  /**
   * Extracts and returns the email property value from a Notion page's properties.
   */
  getMailPageProperty(properties: PageObjectResponse['properties'], name: string): string;
  /**
   * Extracts and returns the url property value from a Notion page's properties.
   */
  getURLPageProperty(properties: PageObjectResponse['properties'], name: string): string;
  /**
   * Extracts and returns the multi-select property values from a Notion page's properties.
   */
  getMultiSelectPageProperty(properties: PageObjectResponse['properties'], name: string): {
    id: string;
    name: string;
    color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
  }[];
  /**
   * Extracts and returns the select property value from a Notion page's properties.
   */
  getSelectPageProperty(properties: PageObjectResponse['properties'], name: string): {
    id: string;
    name: string;
    color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
  };
  /**
   * Extracts and returns the file URL from a Notion page's properties.
   */
  getFilesAndMediaPageProperty(properties: PageObjectResponse['properties'], name: string): string;
}