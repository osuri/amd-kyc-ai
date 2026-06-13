import { Button } from "@mui/material";
import { Download } from "lucide-react";

function escapeHtml(value) {
  return String(value ?? "Not available")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCustomerRows(customer = {}) {
  const entries = Object.entries(customer);

  if (!entries.length) {
    return "<tr><th>Customer</th><td>Not available</td></tr>";
  }

  return entries
    .map(([key, value]) => {
      const label = key
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      return `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`;
    })
    .join("");
}

function getRiskLevel(score) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));

  if (value >= 75) return { value, label: "High risk", color: "#dc2626" };
  if (value >= 45) return { value, label: "Needs review", color: "#d97706" };
  return { value, label: "Low risk", color: "#16a34a" };
}

function formatListItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function buildReportHtml(result) {
  const generatedAt = new Date().toLocaleString();
  const evidence = result.evidence || [];
  const evidenceHtml = evidence.length
    ? formatListItems(evidence)
    : "<li>No risk indicators detected.</li>";
  const evidenceSummary = evidence.length
    ? evidence.join(", ")
    : "No supporting risk indicators were returned.";
  const risk = getRiskLevel(result.score);
  const workflow = [
    "OCR Agent",
    "Extraction Agent",
    "AML Screening",
    "Risk Scoring",
    "Decision Engine"
  ];
  const auditLogs = [
    "OCR Agent Completed",
    "Extraction Agent Completed",
    "AML Screening Completed",
    "Risk Score Generated",
    "Decision Generated"
  ];

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>KYC Review Report</title>
    <style>
      @page { margin: 18mm; }
      body {
        margin: 0;
        color: #172033;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        line-height: 1.45;
      }
      header {
        border-bottom: 2px solid #0f766e;
        margin-bottom: 22px;
        padding-bottom: 14px;
      }
      h1 {
        margin: 0 0 6px;
        color: #0f172a;
        font-size: 26px;
      }
      h2 {
        margin: 0 0 10px;
        color: #0f172a;
        font-size: 16px;
      }
      h3 {
        margin: 0;
        color: #0f172a;
        font-size: 14px;
      }
      .meta {
        color: #64748b;
        font-size: 12px;
      }
      .section {
        break-inside: avoid;
        margin-top: 18px;
        border: 1px solid #dbe3ef;
        border-radius: 8px;
        padding: 14px;
      }
      .section-label {
        margin-bottom: 2px;
        color: #64748b;
        font-size: 11px;
      }
      .summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      .metric {
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 12px;
      }
      .label {
        color: #64748b;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .value {
        margin-top: 5px;
        color: #0f172a;
        font-size: 18px;
        font-weight: 800;
      }
      .dashboard-grid {
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        gap: 14px;
      }
      .risk-wrap {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 16px;
        align-items: center;
      }
      .risk-gauge {
        display: grid;
        width: 112px;
        height: 112px;
        place-items: center;
        border-radius: 999px;
        background: conic-gradient(${risk.color} ${risk.value * 3.6}deg, #e5e7eb 0deg);
      }
      .risk-center {
        display: grid;
        width: 76px;
        height: 76px;
        place-items: center;
        align-content: center;
        border-radius: 999px;
        background: #ffffff;
        box-shadow: inset 0 0 0 1px #e2e8f0;
      }
      .risk-score {
        color: #0f172a;
        font-size: 28px;
        font-weight: 900;
        line-height: 1;
      }
      .progress {
        height: 9px;
        overflow: hidden;
        border-radius: 999px;
        background: #e2e8f0;
      }
      .progress-bar {
        width: ${risk.value}%;
        height: 100%;
        background: ${risk.color};
      }
      .workflow {
        display: grid;
        gap: 8px;
      }
      .workflow-step,
      .audit-item {
        display: flex;
        align-items: center;
        gap: 9px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #f8fafc;
      }
      .workflow-step {
        padding: 9px;
      }
      .step-index {
        display: grid;
        width: 26px;
        height: 26px;
        place-items: center;
        border-radius: 999px;
        color: #1d4ed8;
        background: #dbeafe;
        font-weight: 800;
      }
      .status {
        margin-left: auto;
        color: #0f766e;
        font-weight: 800;
      }
      .brief-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 12px;
      }
      .brief-field {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px;
        background: #f8fafc;
      }
      .evidence-list li {
        margin-bottom: 6px;
      }
      .audit-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
      }
      .audit-item {
        min-height: 42px;
        padding: 9px;
      }
      .check {
        color: #0f766e;
        font-weight: 900;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #e2e8f0;
        padding: 9px 10px;
        text-align: left;
        vertical-align: top;
      }
      th {
        width: 34%;
        background: #f8fafc;
        color: #334155;
      }
      ul {
        margin: 0;
        padding-left: 20px;
      }
      footer {
        margin-top: 28px;
        border-top: 1px solid #e2e8f0;
        padding-top: 10px;
        color: #64748b;
        font-size: 11px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 18px;
      }
      button {
        border: 1px solid #0f766e;
        border-radius: 6px;
        padding: 9px 12px;
        color: #ffffff;
        background: #0f766e;
        font-weight: 700;
        cursor: pointer;
      }
      @media print {
        .actions {
          display: none;
        }
        .section {
          break-inside: avoid;
        }
      }
      @media (max-width: 760px) {
        .summary,
        .dashboard-grid,
        .brief-grid,
        .audit-list {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="actions">
      <button type="button" onclick="window.print()">Save as PDF</button>
    </div>

    <header>
      <h1>KYC Review Report</h1>
      <div class="meta">Generated ${escapeHtml(generatedAt)}</div>
    </header>

    <section class="summary">
      <div class="metric">
        <div class="label">Customer</div>
        <div class="value">${escapeHtml(result.customer?.name)}</div>
      </div>
      <div class="metric">
        <div class="label">Risk score</div>
        <div class="value">${escapeHtml(result.score)}</div>
      </div>
      <div class="metric">
        <div class="label">Decision</div>
        <div class="value">${escapeHtml(result.decision)}</div>
      </div>
    </section>

    <section class="section">
      <div class="section-label">Extracted details</div>
      <h2>Customer details</h2>
      <table>
        <tbody>
          ${formatCustomerRows(result.customer)}
        </tbody>
      </table>
    </section>

    <section class="dashboard-grid">
      <div class="section">
        <div class="section-label">Risk scoring</div>
        <h2>Customer risk gauge</h2>
        <div class="risk-wrap">
          <div class="risk-gauge">
            <div class="risk-center">
              <div class="risk-score">${escapeHtml(risk.value)}</div>
              <div>${escapeHtml(risk.label)}</div>
            </div>
          </div>
          <div>
            <div class="label">Decision confidence</div>
            <h3>${escapeHtml(result.decision || "Pending")}</h3>
            <div class="progress" aria-label="Risk score">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-label">Automation path</div>
        <h2>Agent workflow</h2>
        <div class="workflow">
          ${workflow
            .map(
              (agent, index) => `<div class="workflow-step">
                <div class="step-index">${index + 1}</div>
                <div>
                  <strong>${escapeHtml(agent)}</strong>
                  <div class="meta">Completed successfully</div>
                </div>
                <div class="status">Done</div>
              </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="dashboard-grid">
      <div class="section">
        <div class="section-label">Evidence review</div>
        <h2>Explainability</h2>
        <ul class="evidence-list">${evidenceHtml}</ul>
      </div>

      <div class="section">
        <div class="section-label">Review brief</div>
        <h2>Compliance copilot</h2>
        <div class="brief-grid">
          <div class="brief-field">
            <div class="label">Customer</div>
            <strong>${escapeHtml(result.customer?.name)}</strong>
          </div>
          <div class="brief-field">
            <div class="label">Decision</div>
            <strong>${escapeHtml(result.decision)}</strong>
          </div>
          <div class="brief-field">
            <div class="label">Risk score</div>
            <strong>${escapeHtml(result.score)}</strong>
          </div>
        </div>
        <div class="label">Evidence summary</div>
        <p>${escapeHtml(evidenceSummary)}</p>
      </div>
    </section>

    <section class="section">
      <div class="section-label">Traceability</div>
      <h2>Audit trail</h2>
      <div class="audit-list">
        ${auditLogs
          .map(
            (log) => `<div class="audit-item">
              <span class="check">✓</span>
              <span>${escapeHtml(log)}</span>
            </div>`
          )
          .join("")}
      </div>
    </section>

    <footer>
      AI Compliance Copilot report. Review final decisions according to internal compliance policy.
    </footer>

    <script>
      window.addEventListener("load", () => {
        window.setTimeout(() => {
          window.focus();
          window.print();
        }, 300);
      });
    </script>
  </body>
</html>`;
}

export default function PdfReportButton({ result }) {
  const saveReport = () => {
    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      window.alert("Please allow popups to save the KYC report as PDF.");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(buildReportHtml(result));
    reportWindow.document.close();
  };

  return (
    <Button
      type="button"
      variant="outlined"
      startIcon={<Download size={18} />}
      onClick={saveReport}
    >
      Save PDF
    </Button>
  );
}
