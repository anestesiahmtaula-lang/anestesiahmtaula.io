import { areaBySlug } from "../config/areas";
import type {
  DeliveryRecord,
  EvidenceRecord,
  ScienceRecord,
  ValidationRecord
} from "../types";

interface WorkflowBoardProps {
  deliveries: DeliveryRecord[];
  evidences: EvidenceRecord[];
  validations: ValidationRecord[];
  sciences: ScienceRecord[];
}

export function WorkflowBoard({
  deliveries,
  evidences,
  validations,
  sciences
}: WorkflowBoardProps) {
  if (deliveries.length === 0) {
    return (
      <div className="workflow-board workflow-board--empty">
        <strong>Nenhuma entrega vinculada ainda</strong>
        <p>
          Esta area ja esta preparada no PWA, mas ainda nao recebeu entregas rastreaveis para este
          bloco do fluxo minimo.
        </p>
      </div>
    );
  }

  return (
    <div className="workflow-board">
      {deliveries.map((delivery) => {
        const deliveryEvidences = evidences.filter((item) => item.deliveryId === delivery.id);
        const deliveryValidations = validations.filter((item) => item.deliveryId === delivery.id);
        const deliverySciences = sciences.filter((item) => item.deliveryId === delivery.id);

        return (
          <article key={delivery.id} className="workflow-card">
            <header className="workflow-card__header">
              <div>
                <strong>{delivery.title}</strong>
                <p>
                  {areaBySlug[delivery.areaSlug]?.shortTitle} • {delivery.competence}
                </p>
              </div>
              <small>{delivery.dueLabel}</small>
            </header>

            <div className="workflow-card__steps">
              <section className="workflow-step">
                <span className="workflow-step__label">Entrega</span>
                <strong>{delivery.status.split("_").join(" ")}</strong>
                <small>{delivery.owner}</small>
              </section>

              <section className="workflow-step">
                <span className="workflow-step__label">Evidencia</span>
                <strong>{deliveryEvidences.length}</strong>
                <small>
                  {deliveryEvidences.length > 0
                    ? deliveryEvidences[0]?.title
                    : "Sem evidencia vinculada"}
                </small>
              </section>

              <section className="workflow-step">
                <span className="workflow-step__label">Validacao</span>
                <strong>{deliveryValidations[0]?.decision ?? "pendente"}</strong>
                <small>{deliveryValidations[0]?.validator ?? "Aguardando Qualidade"}</small>
              </section>

              <section className="workflow-step">
                <span className="workflow-step__label">Ciencia</span>
                <strong>
                  {deliverySciences[0]
                    ? `${deliverySciences[0].signedCount}/${deliverySciences[0].signedCount + deliverySciences[0].pendingCount}`
                    : "0/0"}
                </strong>
                <small>{deliverySciences[0]?.audience ?? "Sem publico definido"}</small>
              </section>
            </div>
          </article>
        );
      })}
    </div>
  );
}
