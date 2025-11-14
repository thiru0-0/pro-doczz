const express = require("express")
const router = express.Router()

router.post("/generate", (req, res) => {
  const { type, context } = req.body || {}
  const now = new Date().toISOString()
  let title = "Document"
  let content = ""

  if (type === "resume") {
    title = "Professional Resume"
    content = `Name\nRole\nSummary\nExperience\nEducation\nSkills\nContext: ${context || ""}`
  } else if (type === "proposal") {
    title = "Client Proposal"
    content = `Introduction\nObjectives\nScope\nTimeline\nPricing\nNext Steps\nContext: ${context || ""}`
  } else if (type === "policy") {
    title = "Company Policy"
    content = `Purpose\nPolicy\nProcedures\nCompliance\nDefinitions\nContext: ${context || ""}`
  } else {
    title = "Document"
    content = `Title\nBody\nContext: ${context || ""}`
  }

  res.json({ title, content, generatedAt: now })
})

module.exports = router