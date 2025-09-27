import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ToolSchema,
  type CallToolRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { TodoApp } from "./todoApp.js";

// Schema definitions
const AddTodoArgsSchema = z.object({
  text: z.string()
});

const ToggleTodoArgsSchema = z.object({
  id: z.string()
});

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

// Server setup
const server = new Server(
  {
    name: "todo-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Inisialisasi aplikasi todo
const todoApp = new TodoApp();

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add-todo",
        description: "Menambahkan todo baru ke dalam daftar",
        inputSchema: zodToJsonSchema(AddTodoArgsSchema) as ToolInput,
      },
      {
        name: "toggle-todo",
        description: "Mengubah status todo (complete/incomplete)",
        inputSchema: zodToJsonSchema(ToggleTodoArgsSchema) as ToolInput,
      },
      {
        name: "get-todos",
        description: "Mendapatkan semua todo dalam daftar",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "add-todo": {
        const parsed = AddTodoArgsSchema.safeParse(args);
        if (!parsed.success) {
          throw new Error(`Invalid arguments for add-todo: ${parsed.error}`);
        }
        const newTodo = todoApp.addTodo(parsed.data.text);
        return {
          content: [{ 
            type: "text", 
            text: `Todo berhasil ditambahkan: ${JSON.stringify(newTodo)}`
          }],
        };
      }

      case "toggle-todo": {
        const parsed = ToggleTodoArgsSchema.safeParse(args);
        if (!parsed.success) {
          throw new Error(`Invalid arguments for toggle-todo: ${parsed.error}`);
        }
        const todo = todoApp.toggleTodo(parsed.data.id);
        if (!todo) {
          return {
            content: [{ 
              type: "text", 
              text: `Todo dengan id ${parsed.data.id} tidak ditemukan`
            }],
          };
        }
        return {
          content: [{ 
            type: "text", 
            text: `Status todo berhasil diubah: ${JSON.stringify(todo)}`
          }],
        };
      }

      case "get-todos": {
        const todos = todoApp.getAllTodos();
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(todos, null, 2)
          }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start server
export async function startMcpServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}