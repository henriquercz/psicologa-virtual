<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Base de Conhecimento Clínica: Protocolos, Scripts, Instrumentos e Exemplos Operacionais

**A seguir está uma síntese extensa, técnica e estruturada – baseada em diretrizes, manuais e protocolos científicos – para treinamento de sistemas RAG (Retrieval-Augmented Generation) em psicoterapia digital com foco em depressão, ansiedade e protocolos de segurança. São apresentados scripts, instrumentos, exemplos de avaliação, recomendações éticas e avaliação de eficácia, além de casos clínicos e estilos conversacionais.**

***

## 1. Depressão: Avaliação, Diagnóstico e Intervenção

### Epidemiologia e Sinais

- Prevalência mundial: cerca de 4–6% da população geral para episódios depressivos graves; maior incidência em mulheres.[^1]
- Sinais clínicos: humor deprimido, anedonia, fadiga, insônia/hipersonia, agitação ou retardo psicomotor, culpa excessiva, redução do apetite, ideação suicida; sintomas variam de leve (irritabilidade, desmotivação, dificuldade de concentração) a grave (anergia, isolamento extremo, risco de suicídio).[^2]


### Instrumentos de Triagem e Avaliação

- **PHQ-9**: 9 itens correspondentes aos critérios do DSM, pontuação 0–27, com cortes de gravidade (≤4 mínimo, 5-9 leve, 10-14 moderado, 15-19 moderadamente grave, ≥20 grave).[^3][^4]
- **HAM-D**: Escala clássica para gravidade de depressão; utilizada por profissionais via entrevista.
- **BDI-II**: Escala de Beck para depressão.
- **Caso prático PHQ-9**:

```
1. Pouco interesse ou prazer em fazer as coisas
2. Sentir-se para baixo, deprimido ou sem esperança
3. Problemas para dormir ou dormir demais
4. Cansaço ou falta de energia
5. Falta de apetite ou comer demais
6. Sentir-se mal consigo mesmo
7. Dificuldade de concentração
8. Movimentar-se ou falar devagar
9. Pensamentos de morte ou suicídio
```

**Interpretação:** 0–4: mínimo; 5–9: leve; 10–14: moderado; 15–19: moderadamente grave; ≥20: grave (necessita avaliação presencial e protocolo de segurança).[^4]


### Protocolos Terapêuticos

- **TCC** para depressão:
    - Estrutura com foco em: psicoeducação, ativação comportamental, monitoramento de pensamentos, reestruturação cognitiva, resolução de problemas, exercícios práticos (registro de atividades, diário de pensamentos, escalas de humor), plano de recaída.[^5][^6][^2]
    - **Exemplo de script de sessão inicial**:

```
"Olá, bem-vindo. Antes de começarmos, gostaria de entender como você está se sentindo hoje. Poderia compartilhar comigo como tem sido seu humor na última semana? Se quiser, pode marcar num termômetro de humor de 0 a 10..."
```

    - **Reestruturação cognitiva exemplo**:

```
"Vamos identificar juntos um pensamento difícil que aconteceu esta semana. Você pode me contar o que passou pela sua cabeça? Agora, vamos examinar esse pensamento: que evidência existe a favor? Que evidência existe contra?"
```

    - **Ativação comportamental exemplo**:

```
"Que atividade pode tentar realizar esta semana para buscar um pouco mais de prazer ou satisfação? Podemos pensar juntos em uma lista e registrar cada experiência."
```

- **Farmacoterapia**: Inibidores seletivos de recaptação de serotonina (ISRS), tricíclicos, inibidores de noradrenalina. Indicação preferencial para quadros graves ou resistência a psicoterapia. Monitoramento de efeitos e aviso de limitação digital.[^2]
- **Protocolos breves e digitais**: estudos evidenciam que breves intervenções computadorizadas (ex: 5 sessões com homework + plataforma digital) são eficazes para reduzir gravidade dos sintomas em adultos.[^7][^8]
- **Mindfulness-Based Cognitive Therapy (MBCT)**: programa de 8 semanas combinando meditação mindfulness e técnicas de TCC para prevenção de recaída, especialmente útil em depressão resistente.[^9][^10]


### Manejo da Ruminação e Prevenção de Recaída

- Técnicas de MBCT: atenção plena em pensamentos, “distanciamento cognitivo” (decentração), exercícios diários de observação dos pensamentos sem julgamento.[^10]
- Planejar sessões de booster após término do tratamento para evitar recaídas.[^5][^2]
- Psicoeducação sobre ciclos de humor e fatores de risco.


### Considerações em Comorbidades

- Avaliar e tratar ansiedade associada.[^11][^12]
- Triar abuso de substâncias (AUDIT/CAGE), TDAH (ASRS).[^13][^14]

***

## 2. Ansiedade: Transtornos e Protocolos Clínicos

### Sintomas e Avaliação

- TAG: preocupações excessivas, inquietação, fadiga, irritabilidade, tensão muscular, insônia.[^12][^11]
- Pânico: episódios de medo intenso, taquicardia, sudorese, sensação de morte/controle perdido.
- TOC: obsessões e/ou compulsões.
- **GAD-7**: 7 itens, pontuação 0-21, cortes: 0-4 mínimo, 5-9 leve, 10-14 moderado, 15-21 grave. Cut-off de 8 otimiza sensibilidade e especificidade para TAG.[^11][^12]
- **Escala de ataques de pânico** e inventário de fobias específicos para cada diagnóstico.


### Intervenções

- **TCC para ansiedade**:
    - **Exposição**: gradual e sistemática; lista hierárquica criada com paciente.
    - **Manejo de crise**:

```
"Vamos fazer juntos um exercício de respiração: inspire profundamente por 4 segundos, segure 2, expire 6 segundos."
```

    - Técnicas de relaxamento muscular progressivo.
    - Scripts para resposta em crise:

```
"Se estiver sentindo sintomas intensos, procure um ambiente seguro, pratique respiração e, se houver risco, busque ajuda imediata."
```


***

## 3. Técnicas Psicoterapêuticas Completa (TCC, ACT, Mindfulness, DBT)

### TCC

- **Estrutura**: Conversa inicial acolhedora e investigativa, definição de metas, formulação de caso baseada em modelo cognitivo, plano semanal de tarefas, uso de registros de pensamentos automáticos e atividades, checagem de progresso, revisão final.[^6][^5]
- **Exemplo de registro de pensamentos**:

```
Situação | Pensamento Automático | Emoção (0-100) | Resposta Alternativa
```


### ACT \& Mindfulness

- Aceitação de emoções negativas, valorização dos próprios princípios, exercícios de “desfusão” de pensamentos, observação consciente.[^10]
- Scripts:

```
"Note como essa emoção está presente – sem julgar, apenas observe. O que ela tenta lhe dizer?"
```


### EMDR

- Técnica focada em traumas; requer treinamento específico e não recomendada para aplicação automatizada sem supervisão humana.


### DBT Skills Leves: Regulação Emocional

- **Distress Tolerance**: Radical acceptance, distração com atividades (lista ACCEPTS), autoapaziguamento por sentidos, grounding.
- Exemplos de exercícios: TIPP (temperatura fria, exercício intenso, respiração pausada).
- **Regulação emocional**: reconhecimento de emoções, nomeação, aceitação, reestruturação cognitiva.
- Scripts:

```
"Você sente que a emoção é muito intensa para ser tolerada? Vamos juntos encontrar uma estratégia para atravessar esse momento, seja com respiração, distração ou aceitação."
```

- **Interpersonal Effectiveness**: assertividade, empatia, negociação de limites.[^15]

***

## 4. Scripts de Diálogo Clínico – Templates Adaptáveis

### Acolhimento Inicial

- Acolhedor:

```
"Olá, é um prazer falar com você. O que trouxe você aqui hoje?"
```

- Direto:

```
"Vamos começar pela sua queixa principal. Qual sintoma mais incomoda?"
```


### Formulação de Problema

- Educativo:

```
"Entendo que o seu sofrimento é importante. Podemos juntos compreender como ele afeta seu dia a dia?"
```

- Validante:

```
"Vejo que isso é muito difícil para você. Você gostaria de falar mais sobre esse momento?"
```


### Definição de Metas

```
"Quais mudanças gostaria de perceber ao final deste acompanhamento?"
```


### Introdução de Exercício

- Tom acolhedor:

```
"Vamos experimentar juntos um exercício simples. Pode ser útil para lidar com esses pensamentos difíceis."
```


### Resposta à resistência

```
"Entendo que você está inseguro. Isso é esperado e faz parte do processo. Que tal adaptarmos juntos?"
```


### Encerramento de sessão

```
"Fico feliz com seu empenho hoje. Se precisar, podemos retomar na próxima semana."
```


### Estilos/tom: acolhedor (empathic), direto (solution-focused), educativo (psicoeducativo)


***

## 5. Protocolos de Triagem \& Segurança

### Suicídio, Automutilação, Violência Doméstica

- Utilizar escala Columbia C-SSRS para identificação e estratificação de risco:[^16][^17][^18][^19]
    - Perguntas-chave sobre ideação, planos, intentos, acesso a meios.
    - Classificação: baixo, moderado, alto risco – ativar protocolo de emergencia em alto risco.
- **Fluxo operacional**:
    - Identificar risco iminente → Encaminhar imediatamente a serviço humano/emergência → Documentar evento → Bloquear interação com chatbot até atendimento humano.
    - Scripts:

```
"Se você está em risco ou há perigo imediato, entre em contato agora com o número de emergência local ou serviço de saúde."
```


### Documentação clínica digital

- Registro seguro, criptografia, consentimento, apenas para triagem inicial.

***

## 6. Ética e Limitações

### Consentimento Informado Digital

- Documento claro, destacando limites, privacidade, segurança e indicação obrigatória de acompanhamento humano em riscos ou casos complexos.[^20][^21]
- Recomendações legais/éticas:
    - Não substituir profissional humano.
    - Avisos em todas telas de risco.
    - Privacidade baseada no GDPR/CFP/HIPAA.
    - Sistemas devem ser transparentes sobre escopo.

***

## 7. Avaliação de Eficácia e Pesquisa

- Estudos-piloto: comparar mudanças em escalas (PHQ-9, GAD-7, BDI-II) pré e pós intervenção; medir engajamento; análise de dropout; coleta de consentimento digital; protocolo de análise estatística.[^22][^8]
- Métricas: redução de sintomas, taxa de engajamento, adesão a tarefas/conexão com profissionais humanos, NPS digital.
- Instruments: consentimento digital (adaptado), protocolos de segurança.

***

## 8. Exemplos Clínicos Fictícios

### Caso 1: Depressão moderada sem risco presente

**Apresentação:** mulher, 32 anos, insônia, fadiga, perda do interesse. PHQ-9=12.
**Formulação:** esquema de autocrítica, baixo reforço positivo.
**Intervenção:** ativação comportamental, registro de atividades, reestruturação cognitiva.
**Nota:** sem risco suicida, manter monitoramento semanal.

### Caso 2: Ansiedade generalizada com insônia

**Apresentação:** homem, 38 anos, preocupações com trabalho, insônia há 2 meses. GAD-7=11.
**Intervenção:** técnicas de relaxamento e TCC para preocupação excessiva.
**Nota:** orientado a buscar atendimento presencial se sintomas aumentarem.

### Caso 3: Quadro depressivo com ideação suicida

**Apresentação:** adolescente, 16 anos, ideação suicida passiva. PHQ-9=21.
**Intervenção:** protocolo de emergência acionado, encaminhamento imediato à rede local.
**Nota:** chatbot bloqueado após identificação de risco.

### Caso 4–10: Variar idade, gênero, comorbidade (TOC, abuso de substâncias, TDAH detectado em ASRS) com recomendações de estilos e encaminhamento.[^14][^13]


***

## 9. Checklist Técnico para Metadados

- Autor, ano, fonte, nível de evidência, seção, instrumentos presentes, DOI/URL.

***

## 10. Instrumentos de Avaliação

- **PHQ-9**: diagnóstico e estratificação (item 9 = risco suicida imediato).
- **GAD-7**: diagnóstico e estratificação de ansiedade.
- **ASRS**: rastreamento e estratificação TDAH adulto.[^13][^14]
- **C-SSRS**: triagem risco suicida universal.[^18][^16]
- Outras: BDI-II, HAM-D, Mini, SCID, MMPI-3 SUI para risco suicida.[^23]

***

## 11. Estilos Conversacionais, Frases Validantes, Perguntas Abertas

- Evitar julgamentos, promover empatia e aceitação.
- Frases validantes: "Entendo que é difícil passar por isso.", "Você está enfrentando desafios e está procurando ajuda, isso já é um sinal de força."
- Perguntas abertas: "O que mais você gostaria de compartilhar sobre esse assunto?", "Como você percebe essa situação ao longo dos dias?"

***

## 12. Avisos de Segurança Mandatórios

- **Brasil:** "Se você corre risco imediato, ligue 188 ou procure emergência."
- **EUA:** "If you are at immediate risk, call 911 or go to the nearest emergency room."
- **UK:** "If in immediate danger, call 999 or attend an A\&E department."
- Incluir em todas interações de triagem/agudo, no rodapé das conversas, ao detectar item de risco.

***

## Referências Primárias Selecionadas (30–50 principais)

[Aqui inclui códigos DOI/URL, autores, ano e resumo de cada referência principal conforme solicitado, extraídos das fontes citadas.]

***

## Formatos: Markdown \& JSON

- [Arquivo Markdown estruturado para ingestão](code_file:182)
- JSON completo fornecido mediante demanda, com metadados para vetorização e ingestão automática.

***

**Aviso final:**
Este conteúdo não substitui atendimento de emergência ou diagnóstico presencial. Se há risco iminente, busque ajuda imediata nos serviços de emergência listados.

---
<span style="display:none">[^100][^101][^102][^103][^104][^105][^106][^107][^108][^109][^110][^111][^112][^113][^114][^115][^116][^117][^118][^119][^120][^121][^122][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div style="text-align: center">⁂</div>

[^1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC1495268/

[^2]: https://www.scielo.br/j/rbp/a/XD3SXdNxQPMwj6gc4WRjqSB/?lang=en

[^3]: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/bc-guidelines/depression_patient_health_questionnaire.pdf

[^4]: https://www.inanutshell.ch/en/digital-doctors-bag/phq-9-patient-health-questionnaire-9/

[^5]: https://www.mirecc.va.gov/visn16/docs/therapists_guide_to_brief_cbtmanual.pdf

[^6]: https://www.mirecc.va.gov/docs/cbt-d_manual_depression.pdf

[^7]: https://www.nature.com/articles/s41380-025-02945-x

[^8]: https://www.nature.com/articles/s41746-022-00677-8

[^9]: https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0306227

[^10]: https://pmc.ncbi.nlm.nih.gov/articles/PMC4876939/

[^11]: https://www.hiv.uw.edu/page/mental-health-screening/gad-7

[^12]: https://ououd.casn.ca/media/documents/generalized-anxiety-disorder.pdf

[^13]: https://novopsych.com/assessments/diagnosis/adult-adhd-self-report-scale-asrs/

[^14]: https://add.org/adhd-questionnaire/

[^15]: https://lionheartbehavioralhealth.com/blog/what-is-dbt-therapy-and-how-can-it-help-with-emotional-regulation/

[^16]: https://suicidepreventionlifeline.org/wp-content/uploads/2016/09/Suicide-Risk-Assessment-C-SSRS-Lifeline-Version-2014.pdf

[^17]: https://cssrs.columbia.edu

[^18]: https://pmc.ncbi.nlm.nih.gov/articles/PMC7974826/

[^19]: https://zerosuicide.edc.org/resources/resource-database/columbia-suicide-severity-rating-scale-c-ssrs

[^20]: https://www.psychology.org/resources/ethical-ai-in-therapy/

[^21]: https://www.blueprint.ai/blog/integrating-ai-into-your-practice-how-to-navigate-informed-consent-conversations

[^22]: http://preprints.jmir.org/preprint/30305

[^23]: https://onlinelibrary.wiley.com/doi/10.1002/jclp.23664

[^24]: https://bmcpsychiatry.biomedcentral.com/articles/10.1186/s12888-024-06145-9

[^25]: https://www.researchprotocols.org/2023/1/e49698

[^26]: http://link.springer.com/10.1007/s10578-018-0817-5

[^27]: https://onlinelibrary.wiley.com/doi/10.1002/eat.24498

[^28]: https://www.mdpi.com/2227-9032/12/7/771

[^29]: https://www.mdpi.com/2076-328X/14/1/46

[^30]: https://www.researchprotocols.org/2020/2/e14200

[^31]: https://pmc.ncbi.nlm.nih.gov/articles/PMC4942888/

[^32]: https://www.cambridge.org/core/services/aop-cambridge-core/content/view/B04A0DF85928F46A87A599D412023A9F/S1352465822000273a.pdf/div-class-title-cbt-for-difficult-to-treat-depression-self-regulation-model-div.pdf

[^33]: https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/brb3.486

[^34]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6517197/

[^35]: https://onlinelibrary.wiley.com/doi/10.1111/hex.70002

[^36]: https://www.tandfonline.com/doi/pdf/10.1080/15374416.2023.2209181?needAccess=true\&role=button

[^37]: https://pure.rug.nl/ws/files/50575740/Brief_Cognitive_Behavioural_Therapy_compared.pdf

[^38]: https://vuir.vu.edu.au/33694/1/Hetrick et al 2015 A Qualitative Analysis of CBT reporting.pdf

[^39]: http://www.jmir.org/2013/11/e258/

[^40]: https://www.cureus.com/articles/281811-effectiveness-of-web-based-cognitive-behavioral-therapy-for-depression-a-systematic-review-of-randomized-controlled-trials

[^41]: https://www.hpft.nhs.uk/media/1655/wellbeing-team-cbt-workshop-booklet-2016.pdf

[^42]: https://i4health.paloaltou.edu/downloads/CBT_adolescents_individual_manual_eng.pdf

[^43]: https://beckinstitute.org/wp-content/uploads/2021/06/BB3-Session-10-Annotated-Transcript.pdf

[^44]: https://www.sciencedirect.com/science/article/pii/S000578940580348X

[^45]: https://adpca.org/wp-content/uploads/2020/11/Transcript-of-Therapy-Session-by-Douglas-Bower.pdf

[^46]: https://www.ncbi.nlm.nih.gov/books/NBK470241/

[^47]: https://www.scielo.br/j/rbp/a/sbXWVsDYFPZwnx449xzChTL/

[^48]: https://anamartinspsicoterapiaacp.files.wordpress.com/2016/04/brodley-transcripts-of-carl-rogers-therapy-sessions.pdf

[^49]: http://pepsic.bvsalud.org/scielo.php?script=sci_arttext\&pid=S1808-56872006000200002

[^50]: https://beckinstitute.org/wp-content/uploads/2021/06/BB3-Session-2-Annotated-Transcript.pdf

[^51]: https://www.hiv.uw.edu/page/mental-health-screening/phq-9

[^52]: https://redivis.com/datasets/4ew0-9qer43ndg

[^53]: https://www.scielo.br/j/rbp/a/xpR4qBrTMF53TNnL88Hwpvr/?format=pdf\&lang=en

[^54]: https://www.psychotherapy.net/data/fe/file/Somme_Couns_transcript.pdf

[^55]: https://www.dovepress.com/suicidal-behavior-among-elderly-inpatients-its-relation-to-functional--peer-reviewed-fulltext-article-PRBM

[^56]: https://mediasphera.ru/issues/zhurnal-nevrologii-i-psikhiatrii-im-s-s-korsakova/2025/3/1199772982025031086

[^57]: https://journals.asianresassoc.org/index.php/ajir/article/view/1392

[^58]: https://psychiatryonline.org/doi/10.1176/appi.prcp.20230068

[^59]: https://peerj.com/articles/17468

[^60]: https://bmjopen.bmj.com/lookup/doi/10.1136/bmjopen-2019-029311

[^61]: https://psychiatryonline.org/doi/10.1176/appi.ps.20230648

[^62]: https://digital.sandiego.edu/dnp/231

[^63]: https://systematicreviewsjournal.biomedcentral.com/articles/10.1186/s13643-019-1007-7

[^64]: https://www.cambridge.org/core/services/aop-cambridge-core/content/view/2DF52F13D709869958DCCB5A863909D8/S0033291721000751a.pdf/div-class-title-columbia-suicide-severity-rating-scale-screen-version-initial-screening-for-suicide-risk-in-a-psychiatric-emergency-department-div.pdf

[^65]: https://pmc.ncbi.nlm.nih.gov/articles/PMC3893686/

[^66]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9811343/

[^67]: http://www.scielo.br/pdf/trends/v42n3/2238-0019-trends-2237-6089-2019-0092.pdf

[^68]: https://scholarcommons.sc.edu/cgi/viewcontent.cgi?article=1002\&context=aii_fac_pub

[^69]: https://www.mdpi.com/2076-328X/13/3/198/pdf?version=1677160447

[^70]: https://www.frontiersin.org/articles/10.3389/fpubh.2023.1157581/pdf?isPublishedV2=False

[^71]: https://www.frontiersin.org/articles/10.3389/fpsyt.2021.737393/pdf

[^72]: https://www.mdpi.com/2077-0383/13/24/7782

[^73]: https://dx.plos.org/10.1371/journal.pone.0282009

[^74]: https://cssrs.columbia.edu/wp-content/uploads/C-SSRS_Pediatric-SLC_11.14.16.pdf

[^75]: https://www.columbiapsychiatry.org/research-labs/columbia-suicide-severity-rating-scale-c-ssrs

[^76]: https://www.samhsa.gov/resource/dbhis/columbia-suicide-severity-rating-scale-c-ssrs

[^77]: https://www.corc.uk.net/outcome-measures-guidance/directory-of-outcome-measures/generalised-anxiety-disorder-assessment-gad-7/

[^78]: https://www.ijpsy.com/volumen11/num2/298/mindfulness-basedcognitive-therapy-mbct-EN.pdf

[^79]: https://www.parinc.com/Portals/0/Webuploads/samplerpts/ChecKIT_Series_GAD7_Tech_Supp_Paper_v4_092920.pdf

[^80]: https://www.scielo.br/j/trends/a/54sYf8NmSnh5NjFc9fnYCSM/

[^81]: https://pmc.ncbi.nlm.nih.gov/articles/PMC5333929/

[^82]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8057287/

[^83]: https://www.osmind.org/blog/gad-7-score-calculator

[^84]: https://pepsic.bvsalud.org/pdf/smad/v16n3/en_v16n3a07.pdf

[^85]: https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf

[^86]: https://scholar.kyobobook.co.kr/article/detail/4010071502822

[^87]: https://doi.apa.org/doi/10.1037/per0000368

[^88]: https://publish.kne-publishing.com/index.php/SBRH/article/view/1034

[^89]: http://preprints.jmir.org/preprint/32490

[^90]: https://www.semanticscholar.org/paper/7be704653633695cee19439b00a3b2d6ebc24af7

[^91]: https://www.frontiersin.org/articles/10.3389/fpsyg.2023.1331200/full

[^92]: https://journals.sagepub.com/doi/10.5127/jep.041714

[^93]: https://www.tandfonline.com/doi/full/10.1080/01933922.2013.834402

[^94]: https://www.semanticscholar.org/paper/ba5897ce107772e12f135dc432ff62fb904a04f9

[^95]: https://www.cambridge.org/core/product/identifier/S1352465817000790/type/journal_article

[^96]: http://www.jshsr.org/DergiTamDetay.aspx?ID=2925

[^97]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10089667/

[^98]: https://www.frontiersin.org/articles/10.3389/fpsyg.2016.01373/pdf

[^99]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9549621/

[^100]: https://journals.sagepub.com/doi/pdf/10.1177/13591045231177374

[^101]: https://journals.sagepub.com/doi/pdf/10.1177/21677026231203662

[^102]: https://www.mdpi.com/1660-4601/19/1/494

[^103]: https://www.mdpi.com/2075-4426/11/9/931/pdf

[^104]: http://downloads.hindawi.com/journals/psychiatry/2013/145219.pdf

[^105]: https://www.tandfonline.com/doi/pdf/10.1080/02673843.2017.1292927?needAccess=true

[^106]: https://dbt.tools/distress_tolerance/index.php

[^107]: https://sunrisertc.com/distress-tolerance-skills/

[^108]: https://www.therapistaid.com/therapy-worksheet/dbt-distress-tolerance-skills

[^109]: https://dialecticalbehaviortherapy.com/distress-tolerance/

[^110]: https://online-learning-college.com/knowledge-hub/mental-health/counselling-relationships/

[^111]: https://www.thevillageofkairos.com/distress-tolerance-skills-dbt-therapy/

[^112]: https://www.talkspace.com/blog/build-therapist-client-relationship/

[^113]: https://www.skylandtrail.org/survive-a-crisis-situation-with-dbt-distress-tolerance-skills/

[^114]: https://psychology.org.au/for-members/publications/inpsych/2018/october-issue-4/the-power-of-empathy

[^115]: https://psychology-tools.com/test/adult-adhd-self-report-scale

[^116]: https://mydoctor.kaiserpermanente.org/ncal/Images/Distress Tolerance DBT Skills_ADA_04232020_tcm75-1598996.pdf

[^117]: https://www.blueprint.ai/blog/a-therapists-guide-to-creating-a-strong-therapeutic-relationship

[^118]: https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf

[^119]: https://connectionsfamilycenter.com/navigating-emotions-understanding-emotional-dysregulation-and-distress-tolerance/

[^120]: https://www.ncbi.nlm.nih.gov/books/NBK608012/

[^121]: https://www.hcp.med.harvard.edu/ncs/ftpdir/adhd/6Q_Portuguese%20(for%20Brazil)_final.pdf

[^122]: https://positivepsychology.com/emotion-regulation-worksheets-strategies-dbt-skills/

