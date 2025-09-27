# MCP Todo Server (Updated)

MCP server sederhana yang mengekspos aplikasi todolist melalui Model Context Protocol menggunakan @modelcontextprotocol/sdk versi 1.17.0.

## Instalasi

```bash
git clone https://github.com/yourusername/todo-mcp.git
cd todo-mcp
npm install
npm run build
```

## Menjalankan server

```bash
npm start
```

Atau bisa juga dijalankan langsung:
```bash
node dist/index.js
```

## Mengintegrasikan dengan MCP config

```json
  {
    "mcpServers": {
      "todo-mcp": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "mirzaakhena/todo-mcp"
        ] 
      }
    }
  }
```

## Fitur

Server menyediakan tiga tool yang bisa digunakan:

- `add-todo` - Menambahkan todo baru ke daftar
- `toggle-todo` - Mengubah status todo (selesai/belum selesai)
- `get-todos` - Melihat semua todo dalam daftar

## Perubahan dari v0.5.0

- Updated ke MCP SDK 1.17.0
- Menghapus dynamic imports dan @ts-ignore comments
- Menambahkan proper TypeScript types
- Improved type safety dengan ToolSchema
- Cleaner import statements
- Menghapus dependency express yang tidak diperlukan

## Troubleshooting

Jika mendapat error `spawn todo-mcp ENOENT`, pastikan server dijalankan dengan absolute path, bukan via npm global.