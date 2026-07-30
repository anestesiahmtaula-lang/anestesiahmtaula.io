const CONFIG_SHEET = "Configuracao";
const MASTER_SHEET = "Lancamentos_Master";
const EVIDENCE_MASTER_SHEET = "Evidencias_Master";
const MASTER_SPREADSHEET_ID = "1jiaHXLaR9p0dTh42MZ-pJbAPgt-DYfvLRHhwLR7tFy4";
const RESPONSE_HEADER_ROW = 1;
const RESPONSE_FIRST_DATA_ROW = 2;
const RESPONSE_COLUMN_COUNT = 13;
const AREA_CODE_MAP = {
  "coordenacao-administrativa": "CADM",
  "coordenacao-clinica": "CCLI",
  "gestao-da-qualidade": "GQUA",
  "gestao-de-pessoas": "GPES",
  "gestao-de-equipamentos": "GEQP",
  "gestao-de-conduta-etica": "GETI",
  "gestao-financeira": "GFIN",
  "gestao-operacional": "GOPE",
  "gestao-de-prontuario": "GPRO",
  "ambulatorio-pre-anestesico": "AMBU",
  "extra-bloco": "EXBL"
};

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
          formUrl: row.form_url || "",
          spreadsheetUrl: row.spreadsheet_url || "",
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
  const configRows = readSheetObjects_(CONFIG_SHEET);
  const areaBindings = configRows.filter(function(row) {
    return row.tipo === "area_binding";
  });
  const syncSnapshot = loadGovernanceRowsFromBindings_(areaBindings);

  syncMasterSheets_(syncSnapshot.deliveries, syncSnapshot.evidences);

  const formsConfigured = areaBindings.filter(function(row) {
    return row.intake_tool === "google_forms" || row.intake_tool === "google_forms_sigilo";
  }).length;
  const sheetsConfigured = areaBindings.filter(function(row) {
    return row.intake_tool === "google_sheets";
  }).length;

  return {
    source: "apps_script",
    mode: "conectado",
    trackedAreas: areaBindings.length,
    formsConfigured: formsConfigured,
    sheetsConfigured: sheetsConfigured,
    evidenceLinked: syncSnapshot.evidences.length,
    pendingBindings: areaBindings.filter(function(row) {
      return row.status !== "conectada";
    }).length,
    lastSyncLabel: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm"),
    note: syncSnapshot.note || "Painel remoto lido das planilhas de respostas das areas."
  };
}

function readArea_(areaSlug) {
  if (!areaSlug) {
    throw new Error("Parametro areaSlug obrigatorio.");
  }

  const configRows = readSheetObjects_(CONFIG_SHEET);
  const areaBindings = configRows.filter(function(row) {
    return row.tipo === "area_binding";
  });
  const syncSnapshot = loadGovernanceRowsFromBindings_(areaBindings, areaSlug);

  syncMasterSheets_(syncSnapshot.deliveries, syncSnapshot.evidences);

  return {
    source: "apps_script",
    mode: "conectado",
    areaSlug: areaSlug,
    deliveries: syncSnapshot.deliveries.filter(function(row) {
      return row.area_slug === areaSlug;
    }),
    evidences: syncSnapshot.evidences.filter(function(row) {
      return row.area_slug === areaSlug;
    }),
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

function loadGovernanceRowsFromBindings_(areaBindings, targetAreaSlug) {
  const deliveries = [];
  const evidences = [];
  const errors = [];

  areaBindings
    .filter(function(binding) {
      if (!binding.spreadsheet_url) {
        return false;
      }

      if (!targetAreaSlug) {
        return true;
      }

      return binding.area_slug === targetAreaSlug;
    })
    .forEach(function(binding) {
      try {
        const sourceRows = readResponseRows_(binding);
        const normalized = normalizeResponseRows_(binding, sourceRows);

        Array.prototype.push.apply(deliveries, normalized.deliveries);
        Array.prototype.push.apply(evidences, normalized.evidences);
      } catch (error) {
        errors.push(
          (binding.area_slug || "area-sem-slug") +
            ": " +
            String(error && error.message ? error.message : error)
        );
      }
    });

  deliveries.sort(function(left, right) {
    return String(right.timestamp || "").localeCompare(String(left.timestamp || ""));
  });
  evidences.sort(function(left, right) {
    return String(right.data_registro || "").localeCompare(String(left.data_registro || ""));
  });

  return {
    deliveries: deliveries,
    evidences: evidences,
    note: errors.length
      ? "Sincronismo direto ativo com alertas em " + errors.length + " area(s)."
      : "Sincronismo direto ativo a partir dos formularios por area.",
    errors: errors
  };
}

function readResponseRows_(binding) {
  const spreadsheetId = extractSpreadsheetId_(binding.spreadsheet_url || "");

  if (!spreadsheetId) {
    throw new Error("ID da planilha de respostas nao identificado.");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheets()[0];
  const lastRow = sheet.getLastRow();

  if (lastRow < RESPONSE_FIRST_DATA_ROW) {
    return [];
  }

  return sheet
    .getRange(RESPONSE_FIRST_DATA_ROW, 1, lastRow - RESPONSE_HEADER_ROW, RESPONSE_COLUMN_COUNT)
    .getValues();
}

function normalizeResponseRows_(binding, sourceRows) {
  const deliveries = [];
  const evidences = [];
  const areaSlug = binding.area_slug || "";
  const areaCode = AREA_CODE_MAP[areaSlug] || "AREA";
  const restrito = binding.intake_tool === "google_forms_sigilo" ? "sim" : "nao";
  const sourceName = binding.area_title || areaSlug;
  const sourceKind = binding.intake_tool || "google_forms";

  sourceRows.forEach(function(row, index) {
    const timestamp = formatCellValue_(row[0]);
    const responsavel = normalizeString_(row[4]);
    const competencia = normalizeString_(row[6]);
    const titulo = normalizeString_(row[7]);
    const descricaoBase = normalizeString_(row[8]);
    const statusInformado = normalizeString_(row[9]);
    const prazo = formatCellValue_(row[10]);
    const driveUrl = normalizeString_(row[11]);
    const observacao = normalizeString_(row[12]);

    if (!titulo && !descricaoBase && !responsavel && !driveUrl) {
      return;
    }

    const sequence = padNumber_(index + 1, 4);
    const registroId = areaCode + "-FORM-" + sequence;
    const evidenciaId = areaCode + "-EFORM-" + sequence;
    const descricao = observacao
      ? descricaoBase + " | Observacoes: " + observacao
      : descricaoBase;

    deliveries.push({
      registro_id: registroId,
      timestamp: timestamp,
      area_slug: areaSlug,
      competencia: competencia,
      tipo_registro: "entrega_formulario",
      titulo: titulo || "Entrega sem titulo informado",
      descricao: descricao || "Entrega registrada via formulario da area.",
      responsavel: responsavel || sourceName,
      status: mapFormStatus_(statusInformado),
      prazo: prazo,
      origem: sourceKind,
      fonte_nome: sourceName,
      drive_url: driveUrl,
      evidence_count: driveUrl ? 1 : 0,
      restrito: restrito,
      ultima_atualizacao: timestamp
    });

    if (driveUrl) {
      evidences.push({
        evidencia_id: evidenciaId,
        registro_id: registroId,
        area_slug: areaSlug,
        titulo: titulo || "Evidencia da entrega",
        tipo_evidencia: "link_drive_formulario",
        drive_url: driveUrl,
        status: "disponivel",
        data_registro: timestamp,
        observacao: observacao || "Evidencia enviada via formulario da area."
      });
    }
  });

  return {
    deliveries: deliveries,
    evidences: evidences
  };
}

function syncMasterSheets_(deliveries, evidences) {
  writeObjectsToSheet_(MASTER_SHEET, deliveries, [
    "registro_id",
    "timestamp",
    "area_slug",
    "competencia",
    "tipo_registro",
    "titulo",
    "descricao",
    "responsavel",
    "status",
    "prazo",
    "origem",
    "fonte_nome",
    "drive_url",
    "evidence_count",
    "restrito",
    "ultima_atualizacao"
  ]);
  writeObjectsToSheet_(EVIDENCE_MASTER_SHEET, evidences, [
    "evidencia_id",
    "registro_id",
    "area_slug",
    "titulo",
    "tipo_evidencia",
    "drive_url",
    "status",
    "data_registro",
    "observacao"
  ]);
}

function writeObjectsToSheet_(sheetName, rows, headers) {
  const sheet = getMasterSpreadsheet_().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Aba nao encontrada para sincronismo: " + sheetName);
  }

  const maxColumns = headers.length;
  const availableRows = Math.max(sheet.getMaxRows() - 1, 0);

  if (availableRows > 0) {
    sheet.getRange(2, 1, availableRows, maxColumns).clearContent();
  }

  if (!rows.length) {
    return;
  }

  const values = rows.map(function(row) {
    return headers.map(function(header) {
      return row[header] != null ? row[header] : "";
    });
  });

  sheet.getRange(2, 1, values.length, maxColumns).setValues(values);
}

function extractSpreadsheetId_(value) {
  const match = String(value || "").match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);

  if (match && match[1]) {
    return match[1];
  }

  const directId = normalizeString_(value);
  return directId && directId.indexOf("/") === -1 ? directId : "";
}

function normalizeString_(value) {
  return String(value == null ? "" : value).trim();
}

function formatCellValue_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
  }

  return normalizeString_(value);
}

function padNumber_(value, size) {
  let result = String(value);

  while (result.length < size) {
    result = "0" + result;
  }

  return result;
}

function mapFormStatus_(status) {
  const normalized = normalizeString_(status).toLowerCase();

  if (!normalized) {
    return "aguardando_validacao";
  }

  if (normalized.indexOf("nao inici") >= 0 || normalized.indexOf("não inici") >= 0) {
    return "nao_iniciada";
  }

  if (normalized.indexOf("andamento") >= 0 || normalized.indexOf("execu") >= 0) {
    return "em_andamento";
  }

  if (normalized.indexOf("atras") >= 0) {
    return "atrasada";
  }

  if (normalized.indexOf("reprogram") >= 0) {
    return "reprogramada";
  }

  if (normalized.indexOf("devolv") >= 0) {
    return "devolvida";
  }

  if (normalized.indexOf("valid") >= 0 || normalized.indexOf("aprov") >= 0) {
    return "validada";
  }

  if (
    normalized.indexOf("conclu") >= 0 ||
    normalized.indexOf("finaliz") >= 0 ||
    normalized.indexOf("entreg") >= 0
  ) {
    return "aguardando_validacao";
  }

  return "aguardando_validacao";
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
