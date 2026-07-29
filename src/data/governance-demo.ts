import type {
  ClinicalIndicatorRecord,
  ClinicalRiskRecord,
  DecisionEntry,
  DeliveryRecord,
  EducationRecord,
  AmbulatoryAuditRecord,
  AmbulatoryFlowRecord,
  AmbulatoryRiskRecord,
  EthicsDeliberationRecord,
  EthicsFlowRecord,
  EthicsSafeguardRecord,
  FinancialControlRecord,
  FinancialDocumentRecord,
  FinancialOverviewRecord,
  ExtraDimensionRecord,
  ExtraRiskRecord,
  ExtraSectorRecord,
  EquipmentChecklistRecord,
  EquipmentEventRecord,
  EquipmentMaintenanceRecord,
  EvidenceRecord,
  DocumentRecord,
  GovernancePlanItem,
  LeadershipEntry,
  MeetingRecord,
  MonthlyPerformanceRecord,
  OperationalCapacityRecord,
  OperationalConflictRecord,
  OperationalFlowRecord,
  PeoplePolicyRecord,
  ProtocolRecord,
  RecordAuditRecord,
  RecordImprovementRecord,
  RecordTrainingRecord,
  ScienceRecord,
  StrategicRisk,
  SyncPreviewRecord,
  SyncRunRecord,
  TeamCompositionRecord,
  TrainingRecord,
  ValidationRecord
} from "../types";

export const deliveryRecords: DeliveryRecord[] = [
  {
    id: "ent-001",
    areaSlug: "coordenacao-administrativa",
    title: "Atualizacao do plano de governanca 2026",
    owner: "Francisco Tadeu",
    dueLabel: "15 ago 2026",
    competence: "Ago/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-002",
    areaSlug: "gestao-da-qualidade",
    title: "Relatorio mensal consolidado de julho",
    owner: "Gestao da Qualidade",
    dueLabel: "31 jul 2026",
    competence: "Jul/2026",
    status: "aguardando_validacao",
    evidenceCount: 5,
    validationPending: true
  },
  {
    id: "ent-003",
    areaSlug: "gestao-de-pessoas",
    title: "Revisao anual da politica de gestao de pessoas",
    owner: "Gestao de Pessoas",
    dueLabel: "12 ago 2026",
    competence: "Ago/2026",
    status: "em_andamento",
    evidenceCount: 1,
    validationPending: false
  },
  {
    id: "ent-004",
    areaSlug: "coordenacao-clinica",
    title: "Leitura inicial dos indicadores obrigatorios",
    owner: "Coordenacao Clinica",
    dueLabel: "20 ago 2026",
    competence: "Ago/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-008",
    areaSlug: "coordenacao-clinica",
    title: "Auditoria trimestral de conformidade de protocolos",
    owner: "Rodrigo Lima",
    dueLabel: "18 ago 2026",
    competence: "3T/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-009",
    areaSlug: "coordenacao-clinica",
    title: "Mapa de risco assistencial anual",
    owner: "Coordenacao Clinica",
    dueLabel: "30 set 2026",
    competence: "2026",
    status: "em_andamento",
    evidenceCount: 1,
    validationPending: false
  },
  {
    id: "ent-005",
    areaSlug: "coordenacao-administrativa",
    title: "Reuniao anual integrada do SAHMT",
    owner: "Coordenacao Administrativa",
    dueLabel: "10 set 2026",
    competence: "Set/2026",
    status: "em_andamento",
    evidenceCount: 3,
    validationPending: false
  },
  {
    id: "ent-006",
    areaSlug: "gestao-operacional",
    title: "Revisao do plano de contingencia para falha de sistema",
    owner: "Gestao Operacional",
    dueLabel: "26 jul 2026",
    competence: "Jul/2026",
    status: "atrasada",
    evidenceCount: 1,
    validationPending: false
  },
  {
    id: "ent-007",
    areaSlug: "gestao-da-qualidade",
    title: "Fila de validacao das entregas de julho",
    owner: "Qualidade",
    dueLabel: "29 jul 2026",
    competence: "Jul/2026",
    status: "validada",
    evidenceCount: 6,
    validationPending: false
  },
  {
    id: "ent-010",
    areaSlug: "gestao-de-equipamentos",
    title: "Consolidado mensal das manutencoes preventivas",
    owner: "Gustavo Bicalho",
    dueLabel: "08 ago 2026",
    competence: "Ago/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-011",
    areaSlug: "gestao-de-equipamentos",
    title: "Treinamento anual de bombas de infusao e equipamentos prioritarios",
    owner: "Gestao de Equipamentos",
    dueLabel: "25 ago 2026",
    competence: "2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-012",
    areaSlug: "gestao-operacional",
    title: "Consolidado mensal de absenteismo e atrasos",
    owner: "Marcio Henrique",
    dueLabel: "06 ago 2026",
    competence: "Jul/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-013",
    areaSlug: "gestao-operacional",
    title: "Revisao trimestral de capacidade assistencial",
    owner: "Gestao Operacional",
    dueLabel: "28 ago 2026",
    competence: "3T/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-014",
    areaSlug: "gestao-de-prontuario",
    title: "Auditoria trimestral de consulta pre-anestesica e grafico anestesico",
    owner: "Francisco Tadeu",
    dueLabel: "14 ago 2026",
    competence: "3T/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-015",
    areaSlug: "gestao-de-prontuario",
    title: "Plano de melhoria documental apos auditoria",
    owner: "Gestao de Prontuario",
    dueLabel: "28 ago 2026",
    competence: "Ago/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-016",
    areaSlug: "ambulatorio-pre-anestesico",
    title: "Auditoria trimestral de registros, conciliacao medicamentosa e TCLE",
    owner: "Ricardo Lucas",
    dueLabel: "16 ago 2026",
    competence: "3T/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-017",
    areaSlug: "ambulatorio-pre-anestesico",
    title: "Mapa de barreiras do fluxo do paciente",
    owner: "Ambulatorio Pre-anestesico",
    dueLabel: "27 ago 2026",
    competence: "Ago/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-018",
    areaSlug: "gestao-de-conduta-etica",
    title: "Revisao trimestral do fluxo protegido de acolhimento etico",
    owner: "Comite de Conduta Etica",
    dueLabel: "18 ago 2026",
    competence: "3T/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-019",
    areaSlug: "gestao-de-conduta-etica",
    title: "Atualizacao anual do codigo de conduta e ciencia dirigida",
    owner: "Gestao de Conduta Etica",
    dueLabel: "05 set 2026",
    competence: "2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-020",
    areaSlug: "gestao-financeira",
    title: "Consolidado mensal de dados financeiros autorizados",
    owner: "Gestao Financeira",
    dueLabel: "07 ago 2026",
    competence: "Jul/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-021",
    areaSlug: "gestao-financeira",
    title: "Revisao trimestral dos controles de acesso e publicacao oficial",
    owner: "Coordenacao Administrativa",
    dueLabel: "22 ago 2026",
    competence: "3T/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
  {
    id: "ent-022",
    areaSlug: "extra-bloco",
    title: "Consolidado mensal por setores assistenciais extra bloco",
    owner: "Areas Assistenciais Extra Bloco",
    dueLabel: "09 ago 2026",
    competence: "Jul/2026",
    status: "em_andamento",
    evidenceCount: 2,
    validationPending: false
  },
  {
    id: "ent-023",
    areaSlug: "extra-bloco",
    title: "Revisao trimestral de dimensionamento e riscos setoriais",
    owner: "Coordenacao Clinica",
    dueLabel: "26 ago 2026",
    competence: "3T/2026",
    status: "nao_iniciada",
    evidenceCount: 0,
    validationPending: false
  },
];

export const governancePlan: GovernancePlanItem[] = [
  {
    id: "gov-001",
    strategicGoal: "Consolidar a governanca descentralizada em smartphone e desktop",
    responsibleArea: "coordenacao-administrativa",
    delivery: "Plano de governanca anual",
    milestone: "Versao pactuada com areas lideres",
    dueLabel: "15 ago 2026",
    indicator: "100% das areas com entregas pactuadas",
    risk: "Atraso na definicao de dependencias entre areas",
    dependency: "Confirmacao das liderancas e responsaveis substitutos",
    status: "em_dia",
    decisionRequired: "Validar a ordem dos marcos anuais"
  },
  {
    id: "gov-002",
    strategicGoal: "Tornar o fluxo mensal rastreavel",
    responsibleArea: "gestao-da-qualidade",
    delivery: "Relatorio mensal por area",
    milestone: "Primeira rodada de julho publicada",
    dueLabel: "31 jul 2026",
    indicator: "Areas com relatorio mensal disponivel",
    risk: "Dependencia de submissao incompleta pelas areas",
    dependency: "Fila de validacao operacional",
    status: "deliberacao",
    decisionRequired: "Definir regra de publicacao quando houver devolucao parcial"
  },
  {
    id: "gov-003",
    strategicGoal: "Manter documentacao administrativa vigente",
    responsibleArea: "coordenacao-administrativa",
    delivery: "Revisao anual do Regimento Interno",
    milestone: "Versao 2026 em revisao",
    dueLabel: "22 ago 2026",
    indicator: "Documentos criticos sem vencimento",
    risk: "Aprovacao tardia por multiplas areas contribuintes",
    dependency: "Parecer juridico e comunicacao institucional",
    status: "atencao",
    decisionRequired: "Confirmar aprovadores finais"
  },
];

export const leadershipEntries: LeadershipEntry[] = [
  {
    areaSlug: "coordenacao-administrativa",
    leader: "Francisco Tadeu",
    substitute: "Coordenacao a definir",
    members: 4,
    scope: "Direcao, integracao e pactuacao da governanca",
    pactDeliveries: 7,
    status: "atencao",
    conflictNote: "Substituto ainda nao formalizado"
  },
  {
    areaSlug: "coordenacao-clinica",
    leader: "Coordenacao Clinica",
    substitute: "Representante assistencial",
    members: 6,
    scope: "Indicadores, protocolos e riscos assistenciais",
    pactDeliveries: 5,
    status: "coberta"
  },
  {
    areaSlug: "gestao-da-qualidade",
    leader: "Comissao da Qualidade",
    substitute: "Representante suplente",
    members: 5,
    scope: "Validacao, consolidacao e relatorio mensal",
    pactDeliveries: 6,
    status: "coberta"
  },
  {
    areaSlug: "gestao-de-pessoas",
    leader: "Francisco Tadeu",
    substitute: "Representante de Pessoas",
    members: 3,
    scope: "Composicao, politicas e treinamentos",
    pactDeliveries: 4,
    status: "coberta"
  }
];

export const decisionEntries: DecisionEntry[] = [
  {
    id: "dec-001",
    origin: "Plano de governanca",
    subject: "Confirmar calendario do relatorio anual de governanca",
    recommendation: "Fechar rito em novembro para publicacao em dezembro",
    decision: "Aguardando deliberacao do Conselho Diretor",
    responsible: "Coordenacao Administrativa",
    dueLabel: "05 ago 2026",
    affectedAreas: ["coordenacao-administrativa", "gestao-da-qualidade"],
    communication: "Pendente de circular interna",
    status: "aguardando"
  },
  {
    id: "dec-002",
    origin: "Documento administrativo",
    subject: "Versao do Regimento Interno para revisao anual",
    recommendation: "Manter versao atual e abrir revisao controlada",
    decision: "Revisao autorizada com trilha documental",
    responsible: "Francisco Tadeu",
    dueLabel: "12 ago 2026",
    affectedAreas: ["coordenacao-administrativa", "gestao-de-pessoas", "gestao-da-qualidade"],
    communication: "Comunicado previsto para reuniao integrada",
    status: "em_acompanhamento"
  },
  {
    id: "dec-003",
    origin: "Risco estrategico",
    subject: "Dependencia da leitura inicial dos indicadores clinicos",
    recommendation: "Tratar leitura como piloto de somente leitura",
    decision: "Encaminhada para proxima sprint",
    responsible: "Coordenacao Clinica",
    dueLabel: "20 ago 2026",
    affectedAreas: ["coordenacao-clinica", "gestao-da-qualidade"],
    communication: "Decisao registrada em ata",
    status: "comunicada"
  }
];

export const documentRecords: DocumentRecord[] = [
  {
    id: "doc-001",
    title: "Regimento Interno",
    ownerArea: "coordenacao-administrativa",
    version: "v2025.4",
    status: "em_revisao",
    nextReview: "22 ago 2026",
    audience: "Conselho Diretor, Pessoas, Qualidade"
  },
  {
    id: "doc-002",
    title: "Organograma SAHMT",
    ownerArea: "coordenacao-administrativa",
    version: "v2026.1",
    status: "proxima_revisao",
    nextReview: "10 set 2026",
    audience: "Todas as areas"
  },
  {
    id: "doc-003",
    title: "Contrato Social",
    ownerArea: "coordenacao-administrativa",
    version: "v2026.2",
    status: "vigente",
    nextReview: "15 jan 2027",
    audience: "Conselho Diretor e Financeira"
  },
  {
    id: "doc-004",
    title: "Plano de Comunicacao",
    ownerArea: "coordenacao-administrativa",
    version: "v2025.2",
    status: "vencido",
    nextReview: "15 jul 2026",
    audience: "Todas as areas"
  }
];

export const strategicRisks: StrategicRisk[] = [
  {
    id: "risk-001",
    title: "Dependencia de criterios finais para publicacao mensal",
    areaSlug: "gestao-da-qualidade",
    level: "alto",
    response: "Definir rito de publicacao parcial com decisao formal",
    dueLabel: "05 ago 2026"
  },
  {
    id: "risk-002",
    title: "Substituicao nao formalizada na coordenacao administrativa",
    areaSlug: "coordenacao-administrativa",
    level: "moderado",
    response: "Registrar suplente e periodo de cobertura",
    dueLabel: "12 ago 2026"
  },
  {
    id: "risk-003",
    title: "Plano de contingencia institucional vencido",
    areaSlug: "gestao-operacional",
    level: "critico",
    response: "Atualizar versao e submeter evidencia para revisao",
    dueLabel: "30 jul 2026"
  }
];

export const meetingRecords: MeetingRecord[] = [
  {
    id: "meet-001",
    title: "Reuniao integrada anual",
    dateLabel: "10 set 2026",
    audience: "Liderancas de todas as areas",
    outcome: "Pactuar entregas anuais e dependencias criticas"
  },
  {
    id: "meet-002",
    title: "Checkpoint mensal da governanca",
    dateLabel: "31 jul 2026",
    audience: "Coordenacao Administrativa e Qualidade",
    outcome: "Fechar pendencias do relatorio mensal"
  }
];

export const validationRecords: ValidationRecord[] = [
  {
    id: "val-001",
    deliveryId: "ent-002",
    validator: "Gestao da Qualidade",
    decision: "devolvida",
    comment: "Falta evidencia vinculada a decisao de ciencia",
    submittedAt: "28 jul 2026"
  },
  {
    id: "val-002",
    deliveryId: "ent-007",
    validator: "Gestao da Qualidade",
    decision: "aprovada",
    comment: "Fila fechada com pontuacao liberada",
    submittedAt: "29 jul 2026"
  }
];

export const scienceRecords: ScienceRecord[] = [
  {
    id: "sci-001",
    deliveryId: "ent-002",
    entityTitle: "Relatorio mensal consolidado de julho",
    audience: "Liderancas das areas",
    signedCount: 3,
    pendingCount: 2
  },
  {
    id: "sci-002",
    deliveryId: "ent-001",
    entityTitle: "Decisao sobre revisao do Regimento Interno",
    audience: "Coordenacao Administrativa e areas contribuintes",
    signedCount: 4,
    pendingCount: 1
  }
];

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "evi-001",
    deliveryId: "ent-001",
    title: "Minuta do plano de governanca 2026",
    kind: "documento",
    source: "drive",
    dateLabel: "24 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-002",
    deliveryId: "ent-001",
    title: "Mapa de dependencias entre areas",
    kind: "painel",
    source: "app",
    dateLabel: "27 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-003",
    deliveryId: "ent-002",
    title: "Rascunho do relatorio mensal consolidado",
    kind: "painel",
    source: "app",
    dateLabel: "28 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-004",
    deliveryId: "ent-002",
    title: "Registro de validacao pendente da ciencia",
    kind: "ata",
    source: "app",
    dateLabel: "28 jul 2026",
    status: "pendente_vinculo"
  },
  {
    id: "evi-005",
    deliveryId: "ent-005",
    title: "Pauta preliminar da reuniao anual integrada",
    kind: "ata",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-007",
    deliveryId: "ent-008",
    title: "Checklist trimestral de conformidade anestesiologica",
    kind: "documento",
    source: "drive",
    dateLabel: "27 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-008",
    deliveryId: "ent-009",
    title: "Matriz preliminar de riscos assistenciais",
    kind: "painel",
    source: "app",
    dateLabel: "28 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-006",
    deliveryId: "ent-006",
    title: "Versao vencida do plano de contingencia",
    kind: "documento",
    source: "drive",
    dateLabel: "20 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-009",
    deliveryId: "ent-010",
    title: "Relatorio conciliado com Engenharia Clinica",
    kind: "documento",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-010",
    deliveryId: "ent-010",
    title: "Painel interno de pendencias tecnicas",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-011",
    deliveryId: "ent-012",
    title: "Painel mensal de absenteismo e atrasos",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-012",
    deliveryId: "ent-012",
    title: "Registro de contingencias operacionais da semana",
    kind: "ata",
    source: "drive",
    dateLabel: "28 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-013",
    deliveryId: "ent-014",
    title: "Amostra auditada de registros anestesiologicos",
    kind: "documento",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-014",
    deliveryId: "ent-014",
    title: "Painel de nao conformidades documentais",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-015",
    deliveryId: "ent-016",
    title: "Amostra auditada de atendimentos pre-anestesicos",
    kind: "documento",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-016",
    deliveryId: "ent-016",
    title: "Painel de barreiras e nao conformidades do ambulatorio",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-017",
    deliveryId: "ent-018",
    title: "Matriz protegida de fluxo e triagem etica",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-018",
    deliveryId: "ent-018",
    title: "Ata controlada de revisao do rito de acolhimento",
    kind: "ata",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-019",
    deliveryId: "ent-020",
    title: "Painel de consolidacao financeira autorizada",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-020",
    deliveryId: "ent-020",
    title: "Memorial de conciliacao com a fonte contabil oficial",
    kind: "documento",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-021",
    deliveryId: "ent-022",
    title: "Painel de consolidacao por setor assistencial",
    kind: "painel",
    source: "app",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  },
  {
    id: "evi-022",
    deliveryId: "ent-022",
    title: "Memorial de dimensionamento e cobertura setorial",
    kind: "documento",
    source: "drive",
    dateLabel: "29 jul 2026",
    status: "disponivel"
  }
];

export const clinicalIndicators: ClinicalIndicatorRecord[] = [
  {
    id: "ci-001",
    name: "Taxa de procedimentos eletivos com consulta pre-anestesica ambulatorial",
    source: "planilha_referencia",
    mandatory: true,
    period: "Jul/2026",
    currentValue: "82%",
    target: "Configurar meta",
    situation: "na_meta",
    analysis: "Resultado importado da planilha de referencia sem divergencias no periodo.",
    planAction: "Manter monitoramento trimestral e registrar analise critica no app.",
    originSheet: "TAXA ",
    originCell: "H12"
  },
  {
    id: "ci-002",
    name: "Incidencia de hipotermia nao intencional no periodo intraoperatorio ate a alta anestesica",
    source: "planilha_referencia",
    mandatory: true,
    period: "Jul/2026",
    currentValue: "Sem dado",
    target: "Configurar meta",
    situation: "sem_dado",
    analysis: "A competencia veio sem medicao consolidada e exige revisao da coleta.",
    planAction: "Confirmar origem do dado e revisar formulario vinculado antes da proxima sincronizacao.",
    originSheet: "TAXA ",
    originCell: "H18"
  },
  {
    id: "ci-003",
    name: "Taxa de saidas sem eventos relacionados ao ato anestesico",
    source: "app",
    mandatory: false,
    period: "Jul/2026",
    currentValue: "97,4%",
    target: "Meta local em validacao",
    situation: "fora_meta",
    analysis: "Indicador complementar ja em avaliacao interna, com necessidade de plano de acao.",
    planAction: "Abrir plano de seguranca focado em passagem de caso e checklist final.",
    originSheet: "OUTROS INDICADORES",
    originCell: "G9"
  }
];

export const indicatorSyncPreview: SyncPreviewRecord[] = [
  {
    id: "sp-001",
    indicatorName: "Consulta pre-anestesica ambulatorial",
    competence: "Jul/2026",
    result: "alterado",
    sourceCell: "TAXA !H12",
    note: "Valor formatado atualizado de 79% para 82%."
  },
  {
    id: "sp-002",
    indicatorName: "Hipotermia nao intencional",
    competence: "Jul/2026",
    result: "erro",
    sourceCell: "TAXA !H18",
    note: "Competencia sem dado valido; diferenciar vazio de zero."
  },
  {
    id: "sp-003",
    indicatorName: "Volume de anestesias",
    competence: "Jul/2026",
    result: "inalterado",
    sourceCell: "ANESTESIAS!H6",
    note: "Sem diferenca em relacao a sincronizacao anterior."
  }
];

export const indicatorSyncRuns: SyncRunRecord[] = [
  {
    id: "sr-001",
    performedAt: "29 jul 2026 | 08:45",
    performedBy: "Rodrigo Lima",
    status: "parcial",
    newItems: 1,
    changedItems: 2,
    errors: 1
  },
  {
    id: "sr-002",
    performedAt: "18 jul 2026 | 16:10",
    performedBy: "Gestao da Qualidade",
    status: "concluida",
    newItems: 0,
    changedItems: 1,
    errors: 0
  }
];

export const protocolRecords: ProtocolRecord[] = [
  {
    id: "pr-001",
    title: "Diretriz Medica da Anestesiologia",
    code: "CL-AN-001",
    type: "Diretriz",
    version: "v2026.1",
    reviewDate: "15 set 2026",
    trainingRequired: true,
    scienceStatus: "Em divulgacao"
  },
  {
    id: "pr-002",
    title: "Via aerea dificil",
    code: "CL-AN-009",
    type: "Protocolo",
    version: "v2025.3",
    reviewDate: "30 out 2026",
    trainingRequired: true,
    scienceStatus: "Ciencia concluida"
  },
  {
    id: "pr-003",
    title: "Divulgacao de Incidentes Relacionados a Seguranca do Paciente",
    code: "CL-AN-014",
    type: "ROP",
    version: "v2026.2",
    reviewDate: "12 nov 2026",
    trainingRequired: false,
    scienceStatus: "Aguardando revisao"
  }
];

export const clinicalRisks: ClinicalRiskRecord[] = [
  {
    id: "cr-001",
    title: "Falha na estratificacao de risco pre-anestesico em casos de agenda comprimida",
    sourceArea: "ambulatorio-pre-anestesico",
    level: "alto",
    response: "Reforcar triagem e checklist de elegibilidade antes da sala.",
    owner: "Rodrigo Lima"
  },
  {
    id: "cr-002",
    title: "Dependencia de contribuicoes de areas assistenciais para fechamento do mapa anual",
    sourceArea: "extra-bloco",
    level: "moderado",
    response: "Padronizar devolutiva mensal de riscos setoriais.",
    owner: "Coordenacao Clinica"
  }
];

export const educationRecords: EducationRecord[] = [
  {
    id: "ed-001",
    theme: "Treinamento anual de ROPs e protocolos",
    origin: "Protocolo e ROP",
    audience: "Equipe assistencial",
    dateLabel: "14 ago 2026",
    participation: "42 confirmados",
    result: "Programado"
  },
  {
    id: "ed-002",
    theme: "Oportunidade de aprendizado a partir de eventos sem dano",
    origin: "Evento e disclosure",
    audience: "Preceptores e residentes",
    dateLabel: "22 ago 2026",
    participation: "18 confirmados",
    result: "Em preparacao"
  }
];

export const peoplePolicyRecords: PeoplePolicyRecord[] = [
  {
    id: "pp-001",
    title: "Politica de Gestao de Pessoas",
    cycle: "Revisao anual",
    owner: "Francisco Tadeu",
    version: "v2026.1",
    status: "em_revisao",
    nextReview: "12 ago 2026"
  },
  {
    id: "pp-002",
    title: "Politica de Expansao e Integracao de Novos Socios",
    cycle: "Revisao anual",
    owner: "Gestao de Pessoas",
    version: "v2025.3",
    status: "proxima_revisao",
    nextReview: "05 set 2026"
  },
  {
    id: "pp-003",
    title: "Politica do Contrato de Substituicao do SAHMT",
    cycle: "Conforme vigencia",
    owner: "Gestao de Pessoas",
    version: "v2026.2",
    status: "vigente",
    nextReview: "15 jan 2027"
  }
];

export const teamCompositionRecords: TeamCompositionRecord[] = [
  {
    id: "tc-001",
    focus: "Cobertura das substituicoes e ausencias programadas",
    referencePeriod: "Ago/2026",
    owner: "Representante de Pessoas",
    status: "coberta",
    note: "Mapa mensal atualizado com cobertura assistencial prevista."
  },
  {
    id: "tc-002",
    focus: "Planejamento de ferias e ausencias",
    referencePeriod: "2o semestre 2026",
    owner: "Francisco Tadeu",
    status: "ajuste_necessario",
    note: "Existem lacunas de aprovacao cruzada com a Gestao Operacional."
  },
  {
    id: "tc-003",
    focus: "Trilha de avaliacao de desempenho",
    referencePeriod: "Ciclo 2026",
    owner: "Gestao de Pessoas",
    status: "pendente_aprovacao",
    note: "Criterios objetivos aguardam fechamento com Operacional e Qualidade."
  }
];

export const trainingRecords: TrainingRecord[] = [
  {
    id: "tr-001",
    title: "Reuniao ampliada de pessoas e governanca",
    audience: "Liderancas e equipe",
    dateLabel: "21 ago 2026",
    participation: "31 confirmados",
    status: "programado",
    evidence: "Pauta, presenca e ata vinculadas ao ciclo."
  },
  {
    id: "tr-002",
    title: "Saude e bem-estar da equipe",
    audience: "Equipe assistencial",
    dateLabel: "18 set 2026",
    participation: "24 pre-inscritos",
    status: "em_execucao",
    evidence: "Plano trimestral com indicador de adesao e devolutiva."
  },
  {
    id: "tr-003",
    title: "Ciclo semestral de avaliacao de desempenho",
    audience: "Lideres e responsaveis por devolutiva",
    dateLabel: "30 jul 2026",
    participation: "Material pronto para submissao",
    status: "concluido",
    evidence: "Roteiro de devolutiva e plano de desenvolvimento."
  }
];

export const equipmentChecklistRecords: EquipmentChecklistRecord[] = [
  {
    id: "eqc-001",
    title: "Checklist de equipamentos da anestesiologia",
    scope: "Centro cirurgico e apoio imediato",
    status: "conforme",
    nextReview: "18 ago 2026",
    note: "Checklist revisado com itens criticos de seguranca e rastreio de faltas."
  },
  {
    id: "eqc-002",
    title: "Fluxo de preparo e transporte do arsenal anestesico",
    scope: "Centro cirurgico, extra bloco e SRPA",
    status: "atencao",
    nextReview: "07 ago 2026",
    note: "Necessita atualizar evidencia de treinamento do ultimo ciclo."
  },
  {
    id: "eqc-003",
    title: "Registro de checagem de bombas prioritarias",
    scope: "Unidades com maior criticidade assistencial",
    status: "pendente",
    nextReview: "02 ago 2026",
    note: "Modelo ja definido, aguardando inicio do preenchimento no novo ciclo."
  }
];

export const equipmentMaintenanceRecords: EquipmentMaintenanceRecord[] = [
  {
    id: "eqm-001",
    assetGroup: "Carrinhos e monitores de anestesia",
    partner: "Engenharia Clinica",
    referencePeriod: "Jul/2026",
    status: "em_dia",
    note: "Preventivas conciliadas sem pendencia critica aberta."
  },
  {
    id: "eqm-002",
    assetGroup: "Bombas de infusao",
    partner: "Engenharia Clinica",
    referencePeriod: "Jul/2026",
    status: "programada",
    note: "Janela de manutencao confirmada para a primeira quinzena de agosto."
  },
  {
    id: "eqm-003",
    assetGroup: "Equipamentos de backup de via aerea",
    partner: "Fornecedor homologado",
    referencePeriod: "Jul/2026",
    status: "atrasada",
    note: "Reposicao de componente depende de liberacao tecnica e rechecagem."
  }
];

export const equipmentEventRecords: EquipmentEventRecord[] = [
  {
    id: "eqe-001",
    title: "Oscilacao em bomba de infusao durante uso assistido",
    impact: "alto",
    owner: "Gustavo Bicalho",
    action: "Bloquear equipamento, abrir analise tecnica e reforcar comunicacao de contingencia."
  },
  {
    id: "eqe-002",
    title: "Atraso na devolucao de checklist de transporte do arsenal",
    impact: "moderado",
    owner: "Gestao de Equipamentos",
    action: "Padronizar ponto de coleta e revalidar o fluxo com Operacional."
  }
];

export const operationalFlowRecords: OperationalFlowRecord[] = [
  {
    id: "opf-001",
    title: "Distribuicao diaria da escala assistencial",
    referencePeriod: "Semana 30/2026",
    status: "estavel",
    note: "Escala publicada com contingencias registradas sem ruptura assistencial."
  },
  {
    id: "opf-002",
    title: "Absenteismo e atrasos no bloco cirurgico",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Ha concentracao de atrasos em duas janelas de troca de sala."
  },
  {
    id: "opf-003",
    title: "Plano de contingencia para falha de sistema",
    referencePeriod: "Jul/2026",
    status: "critico",
    note: "Documento vencido e aguardando nova submissao para validacao."
  }
];

export const operationalCapacityRecords: OperationalCapacityRecord[] = [
  {
    id: "opc-001",
    title: "Cobertura de salas em horario regular",
    horizon: "Ago/2026",
    status: "adequada",
    note: "Cobertura prevista alinhada com Pessoas e Clinica."
  },
  {
    id: "opc-002",
    title: "Capacidade em dias de maior demanda",
    horizon: "3T/2026",
    status: "ajuste_necessario",
    note: "Necessita revisar distribuicao de apoio em duas frentes do bloco."
  },
  {
    id: "opc-003",
    title: "Expansao assistencial para janelas extras",
    horizon: "2o semestre 2026",
    status: "restrita",
    note: "Depende de pactuacao de equipe, equipamentos e cobertura de contingencia."
  }
];

export const operationalConflictRecords: OperationalConflictRecord[] = [
  {
    id: "opcft-001",
    title: "Conflito de disponibilidade em troca de turno",
    level: "moderado",
    owner: "Marcio Henrique",
    action: "Padronizar criterio de remanejamento e registrar aprendizado do caso."
  },
  {
    id: "opcft-002",
    title: "Dependencia de protocolo vencido para contingencia de sistema",
    level: "critico",
    owner: "Gestao Operacional",
    action: "Atualizar documento, submeter evidencia e revalidar a comunicacao com a equipe."
  }
];

export const recordAuditRecords: RecordAuditRecord[] = [
  {
    id: "rda-001",
    title: "Consulta pre-anestesica, TCLE e SBAR",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Amostra com falhas pontuais de completude e necessidade de reforco de assinatura."
  },
  {
    id: "rda-002",
    title: "Grafico anestesico e registros de intercorrencia",
    referencePeriod: "Jul/2026",
    status: "conforme",
    note: "Maioria dos registros aderente ao padrao esperado no periodo."
  },
  {
    id: "rda-003",
    title: "Plano de contingencia documental em queda de sistema",
    referencePeriod: "Jul/2026",
    status: "critico",
    note: "Fluxo manual precisa revisao para evitar perda de rastreabilidade."
  }
];

export const recordImprovementRecords: RecordImprovementRecord[] = [
  {
    id: "rdi-001",
    title: "Plano de melhoria documental da auditoria atual",
    horizon: "Ago/2026",
    status: "em_dia",
    note: "Acoes ja distribuidas por responsavel com criterio de reaprendizagem."
  },
  {
    id: "rdi-002",
    title: "Reauditoria de nao conformidades recorrentes",
    horizon: "3T/2026",
    status: "ajuste_necessario",
    note: "Necessita alinhar janela de reaplicacao com Clinica e Operacional."
  },
  {
    id: "rdi-003",
    title: "Atualizacao do fluxo documental em indisponibilidade de sistema",
    horizon: "Ago/2026",
    status: "atrasada",
    note: "Documento de contingencia ainda nao foi ressubmetido para validacao."
  }
];

export const recordTrainingRecords: RecordTrainingRecord[] = [
  {
    id: "rdt-001",
    title: "Treinamento por nao conformidade critica",
    audience: "Equipe assistencial",
    status: "programado",
    evidence: "Conteudo ja definido com lista de presenca e reavaliacao prevista."
  },
  {
    id: "rdt-002",
    title: "Reforco de preenchimento do grafico anestesico",
    audience: "Equipe e preceptores",
    status: "em_execucao",
    evidence: "Pauta aplicada em encontros curtos de passagem e checagem."
  },
  {
    id: "rdt-003",
    title: "Ciclo semestral de melhoria de registros",
    audience: "Liderancas de area",
    status: "concluido",
    evidence: "Ata, devolutiva e pontos de reauditoria vinculados ao periodo."
  }
];

export const ambulatoryFlowRecords: AmbulatoryFlowRecord[] = [
  {
    id: "abf-001",
    title: "Fluxo de consulta pre-anestesica ambulatorial",
    referencePeriod: "Jul/2026",
    status: "estavel",
    note: "Agenda principal coberta com triagem e devolutiva registradas."
  },
  {
    id: "abf-002",
    title: "Barreiras de acesso e preparo do paciente",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Persistem faltas de documentacao previa em dois pontos de entrada."
  },
  {
    id: "abf-003",
    title: "Contingencia para indisponibilidade de informacao no pre-atendimento",
    referencePeriod: "Jul/2026",
    status: "critico",
    note: "Necessita reforco do fluxo manual para manter seguranca e rastreabilidade."
  }
];

export const ambulatoryAuditRecords: AmbulatoryAuditRecord[] = [
  {
    id: "aba-001",
    title: "Auditoria de registros e conciliacao medicamentosa",
    horizon: "Ago/2026",
    status: "conforme",
    note: "Amostra principal aderente, com pequenas correcoes de padrao."
  },
  {
    id: "aba-002",
    title: "Auditoria de TCLE e completude da consulta",
    horizon: "3T/2026",
    status: "ajuste_necessario",
    note: "Requer reforco de assinatura e checagem final antes do fechamento."
  },
  {
    id: "aba-003",
    title: "Revisao das barreiras do processo do paciente",
    horizon: "Ago/2026",
    status: "critico",
    note: "Mapa de gargalos ainda depende de consolidacao com Prontuario e Clinica."
  }
];

export const ambulatoryRiskRecords: AmbulatoryRiskRecord[] = [
  {
    id: "abr-001",
    title: "Paciente chega sem informacoes criticas consolidadas",
    level: "alto",
    owner: "Ricardo Lucas",
    action: "Padronizar pre-checagem e reforcar ponte com Prontuario e Clinica."
  },
  {
    id: "abr-002",
    title: "Falha de registro do TCLE em atendimento de maior rotatividade",
    level: "moderado",
    owner: "Ambulatorio Pre-anestesico",
    action: "Reforcar checklist final e monitorar amostra de reaprendizagem."
  }
];

export const ethicsFlowRecords: EthicsFlowRecord[] = [
  {
    id: "etf-001",
    title: "Recebimento protegido de questoes sensiveis",
    referencePeriod: "Jul/2026",
    status: "estavel",
    note: "Canal com triagem minima e segregacao adequada entre acolhimento e decisao."
  },
  {
    id: "etf-002",
    title: "Prazos de encaminhamento para analise preliminar",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Duas ocorrencias ficaram proximas do limite e exigem reforco de cobertura."
  },
  {
    id: "etf-003",
    title: "Registro de cadeia de custodia documental",
    referencePeriod: "Jul/2026",
    status: "critico",
    note: "Padrao de rastreio precisa ser consolidado antes do proximo ciclo trimestral."
  }
];

export const ethicsDeliberationRecords: EthicsDeliberationRecord[] = [
  {
    id: "etd-001",
    title: "Rito trimestral de acolhimento e classificacao inicial",
    horizon: "3T/2026",
    status: "em_execucao",
    note: "Fluxo em revisao para reduzir atrasos sem ampliar exposicao indevida."
  },
  {
    id: "etd-002",
    title: "Atualizacao anual do codigo de conduta",
    horizon: "2026",
    status: "programado",
    note: "Texto-base pronto para ciencia dirigida por perfis autorizados."
  },
  {
    id: "etd-003",
    title: "Checklist de encerramento e comunicacao institucional",
    horizon: "Ago/2026",
    status: "concluido",
    note: "Roteiro de fechamento homologado sem expor detalhes de casos no PWA."
  }
];

export const ethicsSafeguardRecords: EthicsSafeguardRecord[] = [
  {
    id: "ets-001",
    title: "Acesso indevido a informacoes sensiveis de apuracao",
    level: "alto",
    owner: "Comite de Conduta Etica",
    action: "Restringir visoes, reforcar trilha de acesso e revisar perfis autorizados."
  },
  {
    id: "ets-002",
    title: "Atraso na comunicacao formal de desfechos permitidos",
    level: "moderado",
    owner: "Coordenacao Administrativa",
    action: "Padronizar janela de comunicacao institucional com versoes resumidas e protegidas."
  }
];

export const financialOverviewRecords: FinancialOverviewRecord[] = [
  {
    id: "fin-ov-001",
    title: "Consolidado mensal de dados financeiros autorizados",
    referencePeriod: "Jul/2026",
    status: "estavel",
    note: "Conciliacao principal em andamento com base oficial e sem divergencia relevante ate o momento."
  },
  {
    id: "fin-ov-002",
    title: "Prazo de recebimento de documentos de suporte",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Duas fontes internas enviaram memoriais proximos ao limite do fechamento."
  },
  {
    id: "fin-ov-003",
    title: "Regra de publicacao institucional de informacoes autorizadas",
    referencePeriod: "3T/2026",
    status: "critico",
    note: "Fluxo ainda depende de padrao formal para evitar circular dado parcial ou nao homologado."
  }
];

export const financialDocumentRecords: FinancialDocumentRecord[] = [
  {
    id: "fin-doc-001",
    title: "Memorial de conciliacao contabil do periodo",
    horizon: "Jul/2026",
    status: "conforme",
    note: "Base principal recebida e vinculada ao ciclo com trilha minima de leitura."
  },
  {
    id: "fin-doc-002",
    title: "Checklist de documentos oficiais para fechamento",
    horizon: "Ago/2026",
    status: "ajuste_necessario",
    note: "Necessita padronizar a janela de recebimento de comprovacoes complementares."
  },
  {
    id: "fin-doc-003",
    title: "Rito trimestral de publicacao autorizada",
    horizon: "3T/2026",
    status: "critico",
    note: "A governanca de versao e aprovacao final ainda precisa de formalizacao institucional."
  }
];

export const financialControlRecords: FinancialControlRecord[] = [
  {
    id: "fin-ctl-001",
    title: "Exposicao indevida de dado financeiro nao homologado",
    level: "alto",
    owner: "Coordenacao Administrativa",
    action: "Restringir visualizacao, manter fonte oficial unica e liberar apenas resumos autorizados."
  },
  {
    id: "fin-ctl-002",
    title: "Atraso na liberacao de documentos de suporte para o fechamento",
    level: "moderado",
    owner: "Gestao Financeira",
    action: "Padronizar a cadencia de envio e abrir alerta antecipado para pendencias recorrentes."
  }
];

export const extraSectorRecords: ExtraSectorRecord[] = [
  {
    id: "ext-sec-001",
    sector: "Hemodinamica",
    referencePeriod: "Jul/2026",
    status: "estavel",
    note: "Setor com devolutiva mensal entregue e sem ruptura assistencial reportada."
  },
  {
    id: "ext-sec-002",
    sector: "Endoscopia",
    referencePeriod: "Jul/2026",
    status: "atencao",
    note: "Persistem variacoes de cobertura em janelas de maior rotatividade assistencial."
  },
  {
    id: "ext-sec-003",
    sector: "Ressonancia e apoio diagnostico",
    referencePeriod: "Jul/2026",
    status: "critico",
    note: "Fluxo setorial ainda depende de consolidacao de risco e contingencia com a Clinica."
  }
];

export const extraDimensionRecords: ExtraDimensionRecord[] = [
  {
    id: "ext-dim-001",
    title: "Cobertura das escalas por setor assistencial",
    horizon: "Ago/2026",
    status: "adequada",
    note: "A maior parte dos setores entrou no ciclo com cobertura prevista e responsavel definido."
  },
  {
    id: "ext-dim-002",
    title: "Dimensionamento para janelas de pico e sobreposicao",
    horizon: "3T/2026",
    status: "ajuste_necessario",
    note: "Dois setores exigem revisao fina de distribuicao e apoio cruzado."
  },
  {
    id: "ext-dim-003",
    title: "Contingencia de cobertura para expansao eventual",
    horizon: "2o semestre 2026",
    status: "restrita",
    note: "Nao ha folga suficiente para expansao sem pactuacao previa com Operacional e Pessoas."
  }
];

export const extraRiskRecords: ExtraRiskRecord[] = [
  {
    id: "ext-risk-001",
    title: "Setor devolve risco assistencial fora da janela do consolidado clinico",
    level: "alto",
    owner: "Coordenacao Clinica",
    action: "Padronizar a janela mensal de devolutiva e acionar alerta antes do fechamento."
  },
  {
    id: "ext-risk-002",
    title: "Dimensionamento setorial sem confirmacao cruzada de cobertura",
    level: "moderado",
    owner: "Gestao Operacional",
    action: "Amarrar revisao setorial com mapa de cobertura e trilha de contingencia."
  }
];

export const monthlyPerformanceRecords: MonthlyPerformanceRecord[] = [
  {
    id: "mpr-001",
    areaSlug: "coordenacao-administrativa",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 3,
    validatedOnTime: 1,
    lateDeliveries: 0,
    pendingDeliveries: 2,
    returnedDeliveries: 0,
    scoreObtained: 1,
    scorePossible: 3,
    evaluator: "Gestao da Qualidade",
    evaluationStatus: "aguardando_avaliacao",
    recommendation: "Priorizar fechamento do plano anual e formalizacao do substituto.",
    justification: "Ha boa tracao do nucleo administrativo, mas ainda existem dependencias abertas."
  },
  {
    id: "mpr-002",
    areaSlug: "gestao-da-qualidade",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 2,
    validatedOnTime: 1,
    lateDeliveries: 0,
    pendingDeliveries: 0,
    returnedDeliveries: 1,
    scoreObtained: 1,
    scorePossible: 2,
    evaluator: "Conselho Diretor",
    evaluationStatus: "rascunho",
    recommendation: "Fechar regra de publicacao parcial antes da proxima competencia.",
    justification: "A fila funcionou, porem a regra de publicacao ainda depende de deliberacao."
  },
  {
    id: "mpr-003",
    areaSlug: "gestao-de-pessoas",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 1,
    validatedOnTime: 0,
    lateDeliveries: 0,
    pendingDeliveries: 1,
    returnedDeliveries: 0,
    scoreObtained: 0,
    scorePossible: 1,
    evaluator: "Gestao da Qualidade",
    evaluationStatus: "rascunho",
    recommendation: "Concluir revisao anual da politica com definicao de aprovadores.",
    justification: "A entrega esta em andamento, mas sem submissao de validacao no periodo."
  },
  {
    id: "mpr-004",
    areaSlug: "gestao-de-conduta-etica",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 1,
    validatedOnTime: 0,
    lateDeliveries: 0,
    pendingDeliveries: 1,
    returnedDeliveries: 0,
    scoreObtained: 0,
    scorePossible: 1,
    evaluator: "Gestao da Qualidade",
    evaluationStatus: "rascunho",
    recommendation: "Fechar o padrao de cadeia de custodia antes de ampliar o fluxo trimestral.",
    justification: "A governanca basica do processo existe, mas ainda depende de reforco nas salvaguardas."
  },
  {
    id: "mpr-005",
    areaSlug: "gestao-financeira",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 1,
    validatedOnTime: 0,
    lateDeliveries: 0,
    pendingDeliveries: 1,
    returnedDeliveries: 0,
    scoreObtained: 0,
    scorePossible: 1,
    evaluator: "Gestao da Qualidade",
    evaluationStatus: "rascunho",
    recommendation: "Formalizar a regra de publicacao autorizada antes do proximo fechamento mensal.",
    justification: "A trilha principal existe, mas a governanca de versao e liberacao externa ainda requer reforco."
  },
  {
    id: "mpr-006",
    areaSlug: "extra-bloco",
    month: "Julho",
    year: 2026,
    plannedDeliveries: 1,
    validatedOnTime: 0,
    lateDeliveries: 0,
    pendingDeliveries: 1,
    returnedDeliveries: 0,
    scoreObtained: 0,
    scorePossible: 1,
    evaluator: "Gestao da Qualidade",
    evaluationStatus: "rascunho",
    recommendation: "Padronizar a devolutiva setorial antes de ampliar o consolidado trimestral.",
    justification: "A leitura por setor ja existe, mas a cadencia de riscos e dimensionamento ainda precisa de estabilizacao."
  }
];
