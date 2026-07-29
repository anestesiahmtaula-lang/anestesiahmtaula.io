import { SectionCard } from "./SectionCard";
import type { MonthlyPerformanceRecord } from "../types";

interface MonthlyReportSectionProps {
  areaTitle: string;
  monthlyRecord?: MonthlyPerformanceRecord;
  canClose: boolean;
}

export function MonthlyReportSection({
  areaTitle,
  monthlyRecord,
  canClose
}: MonthlyReportSectionProps) {
  return (
    <SectionCard title="Relatorio mensal" eyebrow="Base para leitura do periodo">
      {monthlyRecord ? (
        <div className="report-card">
          <div className="report-card__header">
            <div>
              <strong>
                {monthlyRecord.month}/{monthlyRecord.year} • {areaTitle}
              </strong>
              <p>
                Avaliador: {monthlyRecord.evaluator} • status: {monthlyRecord.evaluationStatus}
              </p>
            </div>
            <div className="report-card__status">
              <span className="button button--disabled" aria-disabled="true">
                Rascunho controlado
              </span>
              <span className={`tone-chip ${canClose ? "tone-chip--conforme" : "tone-chip--pendente"}`}>
                {canClose ? "Fechamento permitido" : "Fechamento restrito"}
              </span>
            </div>
          </div>

          <div className="report-card__metrics">
            <div>
              <span>Previstas</span>
              <strong>{monthlyRecord.plannedDeliveries}</strong>
            </div>
            <div>
              <span>Pendentes</span>
              <strong>{monthlyRecord.pendingDeliveries}</strong>
            </div>
            <div>
              <span>Pontuacao</span>
              <strong>
                {monthlyRecord.scoreObtained}/{monthlyRecord.scorePossible}
              </strong>
            </div>
          </div>

          <p className="muted-block">Recomendacao: {monthlyRecord.recommendation}</p>
          <p className="muted-block">Justificativa: {monthlyRecord.justification}</p>
        </div>
      ) : (
        <div className="report-card report-card--empty">
          <strong>Competencia mensal ainda nao configurada</strong>
          <p>
            Esta area ja participa do fluxo do PWA, mas o fechamento mensal ainda nao foi liberado
            com base avaliativa para esta competencia.
          </p>
        </div>
      )}
    </SectionCard>
  );
}
