# Integracao Google do PWA SAHMT

Este projeto ja possui uma base real criada no Google Drive para sustentar o PWA SAHMT com coleta por area, consolidacao central e leitura futura pelo app.

## Estrutura real implantada

Fluxo atual:

`Area de gestao -> Planilha da area -> Planilha mestra SAHMT -> Google Apps Script -> PWA`

Neste ciclo, todas as areas foram implantadas com `Google Sheets` nativo para acelerar a operacao e manter um padrao unico de uso.

- `Google Sheets`
  - entrada estruturada por area
  - aba de evidencias por area
  - aba de resumo por area
- `Google Drive`
  - pasta oficial das evidencias e arquivos de cada gestao
- `Planilha mestra`
  - consolida automaticamente `Lancamentos` e `Evidencias` das areas

## Pasta raiz

- Pasta raiz do projeto: [Drive raiz](https://drive.google.com/drive/u/0/folders/1GFGNVG_x8OOZ9beuzm1wAa2mkeTQaSpV)
- Pasta da mestra: [PLANILHA MESTRA](https://drive.google.com/drive/folders/1TrhFBka0uT2IahbWwhY-CjPBuKEYpauC)

## Planilha mestra

Planilha criada:

- [SAHMT_PWA_MESTRE_GESTAO](https://docs.google.com/spreadsheets/d/1jiaHXLaR9p0dTh42MZ-pJbAPgt-DYfvLRHhwLR7tFy4/edit?usp=drivesdk)

Abas principais:

- `Dashboard`
- `Configuracao`
- `Areas`
- `Lancamentos_Master`
- `Evidencias_Master`
- `Listas`

Estado atual da mestra:

- timezone ajustado para `America/Sao_Paulo`
- aba `Areas` preenchida com status `conectada`
- IDs e links reais das planilhas por area registrados
- `Lancamentos_Master` consolidando automaticamente os `Lancamentos` das areas
- `Evidencias_Master` consolidando automaticamente as `Evidencias` das areas

## Planilhas de area criadas

- [SAHMT_ENTRADA_COORDENACAO_ADMINISTRATIVA](https://docs.google.com/spreadsheets/d/1vwjH2VuV84nPqcH1iipgpInguJdPcHKIYNGI23uGuu8/edit?usp=drivesdk)
- [SAHMT_ENTRADA_COORDENACAO_CLINICA](https://docs.google.com/spreadsheets/d/1UDRVwvMMOK9Qn3SLWEipROWzHUhW01Lz6sDmPB5UW00/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_DA_QUALIDADE](https://docs.google.com/spreadsheets/d/1KS9GtfxX3qGXqQhJEnM99ABsTq6KaQBFBmz61DJB4jE/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_DE_PESSOAS](https://docs.google.com/spreadsheets/d/1fzjG9zb6LaMNL9xnQQoczNFHgNVLyFOkqXitCjoUyd0/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_DE_EQUIPAMENTOS](https://docs.google.com/spreadsheets/d/1JsGdTVPXAiYMCacnAk8JGKbvguQV62ZlIKTFMFV4wIA/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_DE_CONDUTA_ETICA](https://docs.google.com/spreadsheets/d/1EopAU7f2fsLGgpG7o8ZNvk5XNA_Cy6rkdVDs9L_u_F4/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_FINANCEIRA](https://docs.google.com/spreadsheets/d/1R6GyDV29WbXaT6fltcaOeW6B9nyDhd3OykPGrtufHGs/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_OPERACIONAL](https://docs.google.com/spreadsheets/d/1c05C1oZIk2NiAhkLcHpz6cSwe-_lpnu9LXQCn66LWzo/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_DE_PRONTUARIO](https://docs.google.com/spreadsheets/d/1RhRP_rQ4uzg5phi9sGC9BrqaY2AC-uveidvtq9_9qAw/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_AMBULATORIO_PRE_ANESTESICO](https://docs.google.com/spreadsheets/d/1s6NgWfonm_nP6Ny-Dd-aaF66JTA1v5-mqL2znwNY9YI/edit?usp=drivesdk)
- [SAHMT_ENTRADA_GESTAO_AREAS_ASSISTENCIAIS_EXTRA_BLOCO](https://docs.google.com/spreadsheets/d/1bQJuxGvNWYL-_4SdxU7wU7kKWcoMNU_pmSYCnHqslAA/edit?usp=drivesdk)

Padrao de cada planilha:

- `Instrucoes`
- `Lancamentos`
- `Evidencias`
- `Resumo`
- `Listas`

## Cabecalhos padrao

### Aba `Lancamentos`

| Coluna | Campo |
| --- | --- |
| A | `registro_id` |
| B | `timestamp` |
| C | `area_slug` |
| D | `competencia` |
| E | `tipo_registro` |
| F | `titulo` |
| G | `descricao` |
| H | `responsavel` |
| I | `status` |
| J | `prazo` |
| K | `origem` |
| L | `fonte_nome` |
| M | `drive_url` |
| N | `evidence_count` |
| O | `restrito` |
| P | `ultima_atualizacao` |

### Aba `Evidencias`

| Coluna | Campo |
| --- | --- |
| A | `evidencia_id` |
| B | `registro_id` |
| C | `area_slug` |
| D | `titulo` |
| E | `tipo_evidencia` |
| F | `drive_url` |
| G | `status` |
| H | `data_registro` |
| I | `observacao` |

## Apps Script

Arquivos base incluidos no repositorio:

- [Code.gs](C:/Users/SAHMTIA/Documents/Projeto%20de%20Gest%C3%A3o/docs/google-apps-script/Code.gs)
- [appsscript.json](C:/Users/SAHMTIA/Documents/Projeto%20de%20Gest%C3%A3o/docs/google-apps-script/appsscript.json)

Endpoints previstos:

- `?action=readManifest`
- `?action=readDashboard`
- `?action=readArea&areaSlug=gestao-operacional`
- `POST action=submitRecord`
- `POST action=submitEvidence`

Web App publicado em 29/07/2026:

- [Apps Script Web App](https://script.google.com/macros/s/AKfycbw-dXiyr9sHjCR325dtJz4Q-_3tg1jifPms9srNRt1WQupC-BkN_e0Eb_dIa6EThws/exec)

## Estado do sincronismo

- Apps Script publicado como `App da Web`
- acesso configurado como `Qualquer pessoa`
- URL publicada gravada em `src/config/google-integration.ts`
- backend pronto para responder `readManifest`, `readDashboard` e `readArea`

## Proximos ajustes recomendados

1. Validar no PWA a leitura real do `readManifest`.
2. Conectar as paginas internas do app para trocar a base `governance-demo` pela leitura remota onde ainda houver fallback.
3. Validar se a consolidacao via formulas da mestra continuara como fonte oficial ou se o Apps Script tambem gravara direto nas abas master.

## Observacao importante

A base Google ja esta operando de verdade no Drive e o elo de exposicao por Apps Script ja foi publicado. O passo seguinte passa a ser a validacao funcional da leitura remota dentro do PWA.
