# MCP Todo Server

MCP server sederhana yang mengekspos aplikasi todolist melalui Model Context Protocol.

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

## Troubleshooting

Jika mendapat error `spawn todo-mcp ENOENT`, pastikan server dijalankan dengan absolute path, bukan via npm global.