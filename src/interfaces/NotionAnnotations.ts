/**
 * This interface should be exposed by the @notionhq/client package, but it is not. That's why we have to define it here.
 * It is just a copy of the interface that is used in the @notionhq/client package. See https://github.com/makenotion/notion-sdk-js/issues/507
 */
export default interface Annotations {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red" | "gray_background" | "brown_background" | "orange_background" | "yellow_background" | "green_background" | "blue_background" | "purple_background" | "pink_background" | "red_background";
}