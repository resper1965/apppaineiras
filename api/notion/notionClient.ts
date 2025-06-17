import { Client } from "@notionhq/client";

const notionClient = new Client({ auth: process.env.EXPO_PUBLIC_NOTION_READ_KEY });

export default notionClient;
