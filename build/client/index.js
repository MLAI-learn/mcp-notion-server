/**
 * Notion API client wrapper
 */
import { convertToMarkdown } from "../markdown/index.js";
export class NotionClientWrapper {
    notionToken;
    baseUrl = "https://api.notion.com/v1";
    headers;
    constructor(token) {
        this.notionToken = token;
        this.headers = {
            Authorization: `Bearer ${this.notionToken}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
        };
    }
    async appendBlockChildren(block_id, children) {
        const body = { children };
        const response = await fetch(`${this.baseUrl}/blocks/${block_id}/children`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async retrieveBlock(block_id) {
        const response = await fetch(`${this.baseUrl}/blocks/${block_id}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async retrieveBlockChildren(block_id, start_cursor, page_size) {
        const params = new URLSearchParams();
        if (start_cursor)
            params.append("start_cursor", start_cursor);
        if (page_size)
            params.append("page_size", page_size.toString());
        const response = await fetch(`${this.baseUrl}/blocks/${block_id}/children?${params}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async deleteBlock(block_id) {
        const response = await fetch(`${this.baseUrl}/blocks/${block_id}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return response.json();
    }
    async updateBlock(block_id, block) {
        const response = await fetch(`${this.baseUrl}/blocks/${block_id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(block),
        });
        return response.json();
    }
    async retrievePage(page_id) {
        const response = await fetch(`${this.baseUrl}/pages/${page_id}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async updatePageProperties(page_id, properties) {
        const body = { properties };
        const response = await fetch(`${this.baseUrl}/pages/${page_id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async listAllUsers(start_cursor, page_size) {
        const params = new URLSearchParams();
        if (start_cursor)
            params.append("start_cursor", start_cursor);
        if (page_size)
            params.append("page_size", page_size.toString());
        const response = await fetch(`${this.baseUrl}/users?${params.toString()}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async retrieveUser(user_id) {
        const response = await fetch(`${this.baseUrl}/users/${user_id}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async retrieveBotUser() {
        const response = await fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async createDatabase(parent, properties, title) {
        const body = { parent, title, properties };
        const response = await fetch(`${this.baseUrl}/databases`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async queryDatabase(database_id, filter, sorts, start_cursor, page_size) {
        const body = {};
        if (filter)
            body.filter = filter;
        if (sorts)
            body.sorts = sorts;
        if (start_cursor)
            body.start_cursor = start_cursor;
        if (page_size)
            body.page_size = page_size;
        const response = await fetch(`${this.baseUrl}/databases/${database_id}/query`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async retrieveDatabase(database_id) {
        const response = await fetch(`${this.baseUrl}/databases/${database_id}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async updateDatabase(database_id, title, description, properties) {
        const body = {};
        if (title)
            body.title = title;
        if (description)
            body.description = description;
        if (properties)
            body.properties = properties;
        const response = await fetch(`${this.baseUrl}/databases/${database_id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async createDatabaseItem(database_id, properties) {
        const body = {
            parent: { database_id },
            properties,
        };
        const response = await fetch(`${this.baseUrl}/pages`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async createComment(parent, discussion_id, rich_text) {
        const body = { rich_text };
        if (parent) {
            body.parent = parent;
        }
        if (discussion_id) {
            body.discussion_id = discussion_id;
        }
        const response = await fetch(`${this.baseUrl}/comments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async retrieveComments(block_id, start_cursor, page_size) {
        const params = new URLSearchParams();
        params.append("block_id", block_id);
        if (start_cursor)
            params.append("start_cursor", start_cursor);
        if (page_size)
            params.append("page_size", page_size.toString());
        const response = await fetch(`${this.baseUrl}/comments?${params.toString()}`, {
            method: "GET",
            headers: this.headers,
        });
        return response.json();
    }
    async search(query, filter, sort, start_cursor, page_size) {
        const body = {};
        if (query)
            body.query = query;
        if (filter)
            body.filter = filter;
        if (sort)
            body.sort = sort;
        if (start_cursor)
            body.start_cursor = start_cursor;
        if (page_size)
            body.page_size = page_size;
        const response = await fetch(`${this.baseUrl}/search`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return response.json();
    }
    async toMarkdown(response) {
        return convertToMarkdown(response);
    }
}
