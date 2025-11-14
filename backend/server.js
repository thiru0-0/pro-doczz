const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")

const frontendPath = path.join(__dirname, "..", "frontend")
const port = process.env.PORT || 3001

const sendFile = (res, filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end("Not found")
    } else {
      const ext = path.extname(filePath).toLowerCase()
      const map = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript" }
      res.writeHead(200, { "Content-Type": map[ext] || "text/plain" })
      res.end(data)
    }
  })
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true)
  const pathname = parsed.pathname || "/"

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    })
    return res.end()
  }

  if (pathname === "/api/generate" && req.method === "POST") {
    let body = ""
    req.on("data", chunk => { body += chunk })
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}")
        const type = data.type
        const context = data.context || ""
        const now = new Date().toISOString()
        let title = "Document"
        let content = ""
        if (type === "resume") { title = "Professional Resume"; content = `Name\nRole\nSummary\nExperience\nEducation\nSkills\nContext: ${context}` }
        else if (type === "proposal") { title = "Client Proposal"; content = `Introduction\nObjectives\nScope\nTimeline\nPricing\nNext Steps\nContext: ${context}` }
        else if (type === "policy") { title = "Company Policy"; content = `Purpose\nPolicy\nProcedures\nCompliance\nDefinitions\nContext: ${context}` }
        else { title = "Document"; content = `Title\nBody\nContext: ${context}` }
        const json = JSON.stringify({ title, content, generatedAt: now })
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
        res.end(json)
      } catch {
        res.writeHead(400)
        res.end("Bad Request")
      }
    })
    return
  }

  if (["/", "/features", "/solutions", "/solutions/for-professionals", "/solutions/for-students", "/pricing", "/login", "/signup"].includes(pathname)) {
    return sendFile(res, path.join(frontendPath, "index.html"))
  }

  if (pathname === "/app/dashboard") {
    return sendFile(res, path.join(frontendPath, "app", "dashboard.html"))
  }
  if (pathname === "/app/account") {
    return sendFile(res, path.join(frontendPath, "app", "account.html"))
  }
  if (pathname.startsWith("/app/editor/")) {
    return sendFile(res, path.join(frontendPath, "app", "editor.html"))
  }

  const filePath = path.join(frontendPath, pathname)
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) return sendFile(res, filePath)
    res.writeHead(404)
    res.end("Not found")
  })
})

server.listen(port, () => {
  console.log(`DocuGenius server running on http://localhost:${port}`)
})