export type Role =
  | "coordenador_administrativo"
  | "lider_area"
  | "membro_area"
  | "qualidade"
  | "conselho_diretor"
  | "equipe"
  | "residente_especializando";

export type Phase = "MVP" | "Fase 2" | "Fase 3";

export type DeliveryStatus =
  | "nao_iniciada"
  | "em_andamento"
  | "aguardando_validacao"
  | "devolvida"
  | "validada"
  | "atrasada"
  | "reprogramada";

export type ValidationDecision = "aprovada" | "devolvida" | "rejeitada" | "dispensada";
export type DocumentStatus = "vigente" | "em_revisao" | "proxima_revisao" | "vencido";
export type RiskLevel = "baixo" | "moderado" | "alto" | "critico";
export type DecisionStatus = "aguardando" | "comunicada" | "em_acompanhamento" | "concluida";
export type GovernancePlanStatus = "em_dia" | "atencao" | "deliberacao";
export type CoverageStatus = "coberta" | "atencao";

export type AreaSlug =
  | "coordenacao-administrativa"
  | "coordenacao-clinica"
  | "gestao-da-qualidade"
  | "gestao-de-pessoas"
  | "gestao-de-equipamentos"
  | "gestao-de-conduta-etica"
  | "gestao-financeira"
  | "gestao-operacional"
  | "gestao-de-prontuario"
  | "ambulatorio-pre-anestesico"
  | "extra-bloco"
  | "esg"
  | "inovacao";

export interface AreaDefinition {
  slug: AreaSlug;
  title: string;
  shortTitle: string;
  route: string;
  legacyRoute?: string;
  description: string;
  purpose: string;
  phase: Phase;
  icon: string;
  driveUrl?: string;
  moduleEnabled: boolean;
  pilot: boolean;
  tabs: string[];
  highlights: string[];
}

export interface RouteMatch {
  kind: "home" | "area";
  areaSlug?: AreaSlug;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export interface UserPermissionSet {
  canViewReports: boolean;
  canValidateDeliveries: boolean;
  canScorePerformance: boolean;
  canOpenDrive: boolean;
  canViewSensitiveAreas: boolean;
}

export interface UserSession {
  id: string;
  name: string;
  role: Role;
  label: string;
  primaryAreaSlug?: AreaSlug;
  visibleAreaSlugs: AreaSlug[];
  permissions: UserPermissionSet;
}

export interface DeliveryRecord {
  id: string;
  areaSlug: AreaSlug;
  title: string;
  owner: string;
  dueLabel: string;
  competence: string;
  status: DeliveryStatus;
  evidenceCount: number;
  validationPending: boolean;
}

export interface GovernancePlanItem {
  id: string;
  strategicGoal: string;
  responsibleArea: AreaSlug;
  delivery: string;
  milestone: string;
  dueLabel: string;
  indicator: string;
  risk: string;
  dependency: string;
  status: GovernancePlanStatus;
  decisionRequired: string;
}

export interface LeadershipEntry {
  areaSlug: AreaSlug;
  leader: string;
  substitute: string;
  members: number;
  scope: string;
  pactDeliveries: number;
  status: CoverageStatus;
  conflictNote?: string;
}

export interface DecisionEntry {
  id: string;
  origin: string;
  subject: string;
  recommendation: string;
  decision: string;
  responsible: string;
  dueLabel: string;
  affectedAreas: AreaSlug[];
  communication: string;
  status: DecisionStatus;
}

export interface DocumentRecord {
  id: string;
  title: string;
  ownerArea: AreaSlug;
  version: string;
  status: DocumentStatus;
  nextReview: string;
  audience: string;
}

export interface StrategicRisk {
  id: string;
  title: string;
  areaSlug: AreaSlug;
  level: RiskLevel;
  response: string;
  dueLabel: string;
}

export interface MeetingRecord {
  id: string;
  title: string;
  dateLabel: string;
  audience: string;
  outcome: string;
}

export interface ValidationRecord {
  id: string;
  deliveryId: string;
  validator: string;
  decision: ValidationDecision;
  comment: string;
  submittedAt: string;
}

export interface ScienceRecord {
  id: string;
  deliveryId?: string;
  entityTitle: string;
  audience: string;
  signedCount: number;
  pendingCount: number;
}

export interface EvidenceRecord {
  id: string;
  deliveryId: string;
  title: string;
  kind: "documento" | "ata" | "plano" | "painel" | "comunicado";
  source: "drive" | "app";
  dateLabel: string;
  status: "disponivel" | "pendente_vinculo";
}

export interface MonthlyPerformanceRecord {
  id: string;
  areaSlug: AreaSlug;
  month: string;
  year: number;
  plannedDeliveries: number;
  validatedOnTime: number;
  lateDeliveries: number;
  pendingDeliveries: number;
  returnedDeliveries: number;
  scoreObtained: number;
  scorePossible: number;
  evaluator: string;
  evaluationStatus: "rascunho" | "aguardando_avaliacao" | "avaliado" | "publicado";
  recommendation: string;
  justification: string;
}

export interface ClinicalIndicatorRecord {
  id: string;
  name: string;
  source: "planilha_referencia" | "app";
  mandatory: boolean;
  period: string;
  currentValue: string;
  target: string;
  situation: "na_meta" | "fora_meta" | "sem_dado" | "erro";
  analysis: string;
  planAction: string;
  originSheet: string;
  originCell: string;
}

export interface SyncPreviewRecord {
  id: string;
  indicatorName: string;
  competence: string;
  result: "novo" | "alterado" | "inalterado" | "erro" | "nao_mapeado";
  sourceCell: string;
  note: string;
}

export interface SyncRunRecord {
  id: string;
  performedAt: string;
  performedBy: string;
  status: "concluida" | "parcial" | "com_erro";
  newItems: number;
  changedItems: number;
  errors: number;
}

export interface ProtocolRecord {
  id: string;
  title: string;
  code: string;
  type: string;
  version: string;
  reviewDate: string;
  trainingRequired: boolean;
  scienceStatus: string;
}

export interface ClinicalRiskRecord {
  id: string;
  title: string;
  sourceArea: AreaSlug;
  level: RiskLevel;
  response: string;
  owner: string;
}

export interface EducationRecord {
  id: string;
  theme: string;
  origin: string;
  audience: string;
  dateLabel: string;
  participation: string;
  result: string;
}

export interface PeoplePolicyRecord {
  id: string;
  title: string;
  cycle: string;
  owner: string;
  version: string;
  status: DocumentStatus;
  nextReview: string;
}

export interface TeamCompositionRecord {
  id: string;
  focus: string;
  referencePeriod: string;
  owner: string;
  status: "coberta" | "ajuste_necessario" | "pendente_aprovacao";
  note: string;
}

export interface TrainingRecord {
  id: string;
  title: string;
  audience: string;
  dateLabel: string;
  participation: string;
  status: "programado" | "em_execucao" | "concluido";
  evidence: string;
}

export interface EquipmentChecklistRecord {
  id: string;
  title: string;
  scope: string;
  status: "conforme" | "atencao" | "pendente";
  nextReview: string;
  note: string;
}

export interface EquipmentMaintenanceRecord {
  id: string;
  assetGroup: string;
  partner: string;
  referencePeriod: string;
  status: "em_dia" | "atrasada" | "programada";
  note: string;
}

export interface EquipmentEventRecord {
  id: string;
  title: string;
  impact: RiskLevel;
  owner: string;
  action: string;
}

export interface OperationalFlowRecord {
  id: string;
  title: string;
  referencePeriod: string;
  status: "estavel" | "atencao" | "critico";
  note: string;
}

export interface OperationalCapacityRecord {
  id: string;
  title: string;
  horizon: string;
  status: "adequada" | "ajuste_necessario" | "restrita";
  note: string;
}

export interface OperationalConflictRecord {
  id: string;
  title: string;
  level: RiskLevel;
  owner: string;
  action: string;
}

export interface RecordAuditRecord {
  id: string;
  title: string;
  referencePeriod: string;
  status: "conforme" | "atencao" | "critico";
  note: string;
}

export interface RecordImprovementRecord {
  id: string;
  title: string;
  horizon: string;
  status: "em_dia" | "ajuste_necessario" | "atrasada";
  note: string;
}

export interface RecordTrainingRecord {
  id: string;
  title: string;
  audience: string;
  status: "programado" | "em_execucao" | "concluido";
  evidence: string;
}

export interface AmbulatoryFlowRecord {
  id: string;
  title: string;
  referencePeriod: string;
  status: "estavel" | "atencao" | "critico";
  note: string;
}

export interface AmbulatoryAuditRecord {
  id: string;
  title: string;
  horizon: string;
  status: "conforme" | "ajuste_necessario" | "critico";
  note: string;
}

export interface AmbulatoryRiskRecord {
  id: string;
  title: string;
  level: RiskLevel;
  owner: string;
  action: string;
}

export interface EthicsFlowRecord {
  id: string;
  title: string;
  referencePeriod: string;
  status: "estavel" | "atencao" | "critico";
  note: string;
}

export interface EthicsDeliberationRecord {
  id: string;
  title: string;
  horizon: string;
  status: "programado" | "em_execucao" | "concluido";
  note: string;
}

export interface EthicsSafeguardRecord {
  id: string;
  title: string;
  level: RiskLevel;
  owner: string;
  action: string;
}

export interface FinancialOverviewRecord {
  id: string;
  title: string;
  referencePeriod: string;
  status: "estavel" | "atencao" | "critico";
  note: string;
}

export interface FinancialDocumentRecord {
  id: string;
  title: string;
  horizon: string;
  status: "conforme" | "ajuste_necessario" | "critico";
  note: string;
}

export interface FinancialControlRecord {
  id: string;
  title: string;
  level: RiskLevel;
  owner: string;
  action: string;
}

export interface ExtraSectorRecord {
  id: string;
  sector: string;
  referencePeriod: string;
  status: "estavel" | "atencao" | "critico";
  note: string;
}

export interface ExtraDimensionRecord {
  id: string;
  title: string;
  horizon: string;
  status: "adequada" | "ajuste_necessario" | "restrita";
  note: string;
}

export interface ExtraRiskRecord {
  id: string;
  title: string;
  level: RiskLevel;
  owner: string;
  action: string;
}

export type IntegrationMode = "demo_local" | "preparado_para_vinculo" | "conectado" | "erro";
export type IntakeTool = "google_forms" | "google_sheets" | "google_forms_sigilo";
export type IntegrationBindingStatus = "planejada" | "aguardando_endpoint" | "conectada";

export interface GovernanceDataset {
  deliveryRecords: DeliveryRecord[];
  governancePlan: GovernancePlanItem[];
  leadershipEntries: LeadershipEntry[];
  decisionEntries: DecisionEntry[];
  documentRecords: DocumentRecord[];
  strategicRisks: StrategicRisk[];
  meetingRecords: MeetingRecord[];
  validationRecords: ValidationRecord[];
  scienceRecords: ScienceRecord[];
  evidenceRecords: EvidenceRecord[];
  monthlyPerformanceRecords: MonthlyPerformanceRecord[];
  clinicalIndicatorRecords: ClinicalIndicatorRecord[];
  syncPreviewRecords: SyncPreviewRecord[];
  syncRunRecords: SyncRunRecord[];
  protocolRecords: ProtocolRecord[];
  clinicalRiskRecords: ClinicalRiskRecord[];
  educationRecords: EducationRecord[];
  peoplePolicyRecords: PeoplePolicyRecord[];
  teamCompositionRecords: TeamCompositionRecord[];
  trainingRecords: TrainingRecord[];
  equipmentChecklistRecords: EquipmentChecklistRecord[];
  equipmentMaintenanceRecords: EquipmentMaintenanceRecord[];
  equipmentEventRecords: EquipmentEventRecord[];
  operationalFlowRecords: OperationalFlowRecord[];
  operationalCapacityRecords: OperationalCapacityRecord[];
  operationalConflictRecords: OperationalConflictRecord[];
  recordAuditRecords: RecordAuditRecord[];
  recordImprovementRecords: RecordImprovementRecord[];
  recordTrainingRecords: RecordTrainingRecord[];
  ambulatoryFlowRecords: AmbulatoryFlowRecord[];
  ambulatoryAuditRecords: AmbulatoryAuditRecord[];
  ambulatoryRiskRecords: AmbulatoryRiskRecord[];
  ethicsFlowRecords: EthicsFlowRecord[];
  ethicsDeliberationRecords: EthicsDeliberationRecord[];
  ethicsSafeguardRecords: EthicsSafeguardRecord[];
  financialOverviewRecords: FinancialOverviewRecord[];
  financialDocumentRecords: FinancialDocumentRecord[];
  financialControlRecords: FinancialControlRecord[];
  extraSectorRecords: ExtraSectorRecord[];
  extraDimensionRecords: ExtraDimensionRecord[];
  extraRiskRecords: ExtraRiskRecord[];
}

export interface IntegrationAreaBinding {
  areaSlug: AreaSlug;
  areaTitle: string;
  intakeTool: IntakeTool;
  driveFolderUrl?: string;
  intakeSheetName: string;
  reportSheetName: string;
  evidenceSheetName: string;
  status: IntegrationBindingStatus;
  note: string;
}

export interface DashboardSyncSnapshot {
  source: "demo" | "apps_script";
  mode: IntegrationMode;
  trackedAreas: number;
  formsConfigured: number;
  sheetsConfigured: number;
  evidenceLinked: number;
  pendingBindings: number;
  lastSyncLabel: string;
  note: string;
}

export interface IntegrationManifest {
  source: "local_bootstrap" | "apps_script";
  mode: IntegrationMode;
  rootDriveUrl: string;
  appsScriptUrl?: string;
  generatedAt: string;
  lastSyncLabel: string;
  note: string;
  dashboard: DashboardSyncSnapshot;
  areaBindings: IntegrationAreaBinding[];
}
