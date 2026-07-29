const CONFIG_SHEET = "Configuracao";
const MASTER_SHEET = "Lancamentos_Master";
const EVIDENCE_MASTER_SHEET = "Evidencias_Master";
const MASTER_SPREADSHEET_ID = "1jiaHXLaR9p0dTh42MZ-pJbAPgt-DYfvLRHhwLR7tFy4";

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || "readDashboard";

  try {
    if (action === "readManifest") {
      return jsonOutput_(buildManifest_());
    }

    if (action === "readArea") {
      return jsonOutput_(readArea_(e.parameter.areaSlug || ""));
    }

    return jsonOutput_(buildDashboard_());
  } catch (error) {
    return jsonOutput_({
      source: "apps_script",
      mode: "erro",
      note: String(error && error.message ? error.message : error)
    });
  }
}

function doPost(e) {
  const payload = parsePayload_(e);
  const action = payload.action || "";

  try {
    if (action === "submitRecord") {
      return jsonOutput_(submitRecord_(payload));
    }

    if (action === "submitEvidence") {
      return jsonOutput_(submitEvidence_(payload));
    }

    throw new Error("Acao POST nao suportada.");
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function buildManifest_() {
  const dashboard = buildDashboard_();
  const configRows = readSheetObjects_(CONFIG_SHEET);

  return {
    source: "apps_script",
    mode: "conectado",
    rootDriveUrl: readConfigValue_(configRows, "root_drive_url"),
    appsScriptUrl: ScriptApp.getService().getUrl(),
    generatedAt: new Date().toISOString(),
    lastSyncLabel: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm"),
    note: "Manifesto gerado diretamente da planilha mestra SAHMT.",
    dashboard: dashboard,
    areaBindings: configRows
      .filter(function(row) {
        return row.tipo === "area_binding";
      })
      .map(function(row) {
        return {
          areaSlug: row.area_slug,
          areaTitle: row.area_title,
          intakeTool: row.intake_tool,
          driveFolderUrl: row.drive_folder_url,
          intakeSheetName: row.intake_sheet_name,
          reportSheetName: row.report_sheet_name,
          evidenceSheetName: row.evidence_sheet_name,
          status: row.status || "conectada",
          note: row.note || ""
        };
      })
  };
}

function buildDashboard_() {
  const masterRows = readSheetObjects_(MASTER_SHEET);
  const evidenceRows = readSheetObjects_(EVIDENCE_MASTER_SHEET);
  const configRows = readSheetObjects_(CONFIG_SHEET);
  const areaBindings = configRows.filter(function(row) {
    return row.tipo === "area_binding";
  });
  const formsConfigured = areaBindings.filter(function(row) {
    return row.intake_tool === "google_forms" || row.intake_tool === "google_forms_sigilo";
  }).length;
  const sheetsConfigured = areaBindings.filter(function(row) {
    return row.intake_tool === "google_sheets";
  }).length;
  const trackedAreas = uniqueCount_(masterRows.map(function(row) {
    return row.area_slug;
  }));

  return {
    source: "apps_script",
    mode: "conectado",
    trackedAreas: trackedAreas,
    formsConfigured: formsConfigured,
    sheetsConfigured: sheetsConfigured,
    evidenceLinked: evidenceRows.length,
    pendingBindings: areaBindings.filter(function(row) {
      return row.status !== "conectada";
    }).length,
    lastSyncLabel: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm"),
    note: "Painel remoto lido da planilha mestra."
  };
}

function readArea_(areaSlug) {
  if (!areaSlug) {
    throw new Error("Parametro areaSlug obrigatorio.");
  }

  const masterRows = readSheetObjects_(MASTER_SHEET).filter(function(row) {
    return row.area_slug === areaSlug;
  });
  const evidenceRows = readSheetObjects_(EVIDENCE_MASTER_SHEET).filter(function(row) {
    return row.area_slug === areaSlug;
  });

  return {
    source: "apps_script",
    mode: "conectado",
    areaSlug: areaSlug,
    deliveries: masterRows,
    evidences: evidenceRows,
    fetchedAt: new Date().toISOString()
  };
}

function submitRecord_(payload) {
  const values = [
    payload.registro_id || Utilities.getUuid(),
    new Date().toISOString(),
    payload.area_slug || "",
    payload.competencia || "",
    payload.tipo_registro || "",
    payload.titulo || "",
    payload.descricao || "",
    payload.responsavel || "",
    payload.status || "",
    payload.prazo || "",
    payload.origem || "apps_script",
    payload.fonte_nome || "",
    payload.drive_url || "",
    payload.evidence_count || 0,
    payload.restrito || "nao",
    new Date().toISOString()
  ];

  appendRow_(MASTER_SHEET, values);

  return {
    ok: true,
    action: "submitRecord",
    registro_id: values[0]
  };
}

function submitEvidence_(payload) {
  const values = [
    payload.evidencia_id || Utilities.getUuid(),
    payload.registro_id || "",
    payload.area_slug || "",
    payload.titulo || "",
    payload.tipo_evidencia || "",
    payload.drive_url || "",
    payload.status || "disponivel",
    new Date().toISOString(),
    payload.observacao || ""
  ];

  appendRow_(EVIDENCE_MASTER_SHEET, values);

  return {
    ok: true,
    action: "submitEvidence",
    evidencia_id: values[0]
  };
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function appendRow_(sheetName, values) {
  const sheet = getMasterSpreadsheet_().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Aba nao encontrada: " + sheetName);
  }

  sheet.appendRow(values);
}

function readSheetObjects_(sheetName) {
  const sheet = getMasterSpreadsheet_().getSheetByName(sheetName);

  if (!sheet) {
    return [];
  }

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  const headers = values[0].map(function(header) {
    return String(header).trim();
  });

  return values.slice(1).map(function(row) {
    return headers.reduce(function(accumulator, header, index) {
      accumulator[header] = row[index];
      return accumulator;
    }, {});
  });
}

function readConfigValue_(rows, key) {
  const hit = rows.find(function(row) {
    return row.tipo === "config" && row.chave === key;
  });

  return hit ? hit.valor : "";
}

function uniqueCount_(items) {
  const map = {};

  items.forEach(function(item) {
    if (item) {
      map[item] = true;
    }
  });

  return Object.keys(map).length;
}

function getMasterSpreadsheet_() {
  return SpreadsheetApp.openById(MASTER_SPREADSHEET_ID);
}

function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
