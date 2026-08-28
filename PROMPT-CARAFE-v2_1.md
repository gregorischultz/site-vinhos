# PROMPT DE CONSTRUÇÃO — SITE DE VINHOS (MERCADO FRANCÊS)

> **Versão 2.** Substitui integralmente a versão anterior.
> A v1 produziu um site genérico porque pedia *explicações* em vez de dar *especificações*. Esta versão decide em vez de perguntar.
> Projeto: portefólio Bizibly — Gregori Schultz (dev, Tours, FR) e Filipe Schultz (conteúdo, BR).

---

## 0. CONTRATO COM A IA — LÊ ISTO ANTES DE TUDO

Tu és o arquiteto técnico e o professor deste projeto. Nós somos iniciantes: assume que não sabemos instalar programas, usar terminal, configurar variáveis de ambiente ou fazer deploy. Explica tudo. Mas **não nos peças para decidir** o que já está decidido neste documento.

### Regras de output — inegociáveis

1. **Uma fase de cada vez.** Nunca despejes o projeto inteiro. Entregas a fase, paras, e esperas que escrevamos `OK, fase seguinte`.
2. **Antes de código, o plano da fase.** Objetivo, ficheiros que vais criar, o que vamos ver no ecrã no fim. Espera confirmação.
3. **Código completo, nunca excertos.** Sempre com o caminho exato do ficheiro por cima, em bloco de código. Nada de `// ... resto do código`.
4. **Cada termo técnico é explicado na primeira vez que aparece**, entre parênteses e em linguagem simples. Exemplo: «SSG (Static Site Generation — o site é montado em páginas HTML prontas no momento do build, não a cada visita; é mais rápido e não custa nada a servir)».
5. **Uma solução, não dez.** Se houver alternativas, escolhes uma, dizes numa frase porquê, e segues. Não nos dês menus.
6. **Se algo neste documento estiver tecnicamente errado ou for má ideia, diz.** Não obedeças em silêncio. Preferimos ser contrariados a construir mal.
7. **Nunca inventes dados de vinhos, notas, preços ou comissões.** Se precisares de dados para o código funcionar, usa exatamente os exemplos deste documento e marca-os `// DADOS DE EXEMPLO — substituir`.
8. **Nunca afirmes regulamentação francesa ou preços de serviços sem pesquisar.** Sinaliza estimativas como estimativas.

### Definição de «pronto» para cada fase

Uma fase só está concluída quando: o comando corre sem erro, vemos no navegador o resultado descrito, o checklist da fase está todo marcado, e o commit foi feito. Se algo estiver partido, **não avances**.

---

## 1. O QUE ESTAMOS A CONSTRUIR (E O QUE NÃO ESTAMOS)

### Uma frase

Um site editorial francês que ajuda alguém a escolher **uma garrafa concreta** em menos de dois minutos — a partir do prato que vai comer, do orçamento que tem, ou do tipo de vinho que procura.

### O que nos diferencia de qualquer agregador

Não somos uma base de dados com dez mil referências e fichas vazias. Somos **uma seleção curada e assumidamente pequena**, com fichas escritas por humanos, um método de avaliação publicado, e um motor de acordos que dá uma resposta em vez de uma lista.

O concorrente típico responde «voici 200 vins rouges». Nós respondemos «pour votre raclette, prenez ce vin de Savoie à 9 €, et voici pourquoi».

### Fora de âmbito no MVP — não construir, não mencionar no código

Contas de utilizador · favoritos · avaliações de utilizadores · comentários · newsletter · comparador multi-vinhos · alertas de preço · aplicação móvel · chatbot conversacional · painel administrativo · base de dados · multi-idioma ativo · preços por país em tempo real.

Cada um destes é uma razão para o site não sair. Ficam para a v2 e v3, na secção 13.

---

## 2. RESTRIÇÃO LEGAL QUE DEFINE O SITE — LER ANTES DE ESCREVER UMA LINHA

Em França, a comunicação sobre bebidas alcoólicas é enquadrada pela **loi Évin** (Code de la santé publique, artigos L.3323-2 e L.3323-4). Isto não é um detalhe jurídico no fim do projeto: **muda o tom editorial, o design e o modelo de receita**.

**O que a lei permite dizer** (L.3323-4 — lista fechada de temas): denominação, composição, modo de elaboração, teor de álcool, qualidades organoléticas, modalidades de venda, modo de consumo, origem, terroir, distinções obtidas, referências históricas do produtor, e o acondicionamento.

**O que fica de fora:** ambiente festivo, convívio, sedução, férias, sucesso social, «o vinho perfeito para impressionar». Todo o registo lifestyle que a v1 deste prompt pedia.

**Menção sanitária obrigatória** em qualquer comunicação abrangida: `L'abus d'alcool est dangereux pour la santé, à consommer avec modération.`

**Sanções indicadas pelas fontes consultadas:** coimas penais na ordem dos 5 000 a 75 000 € por infração. A maioria das ações é iniciada por associações como a Addictions France.

### Consequências diretas na construção

| Decisão | Porquê |
|---|---|
| Registo editorial **descritivo e factual**, nunca aspiracional | L.3323-4 |
| Menção sanitária no rodapé de **todas** as páginas, e por cima de qualquer bloco com link de compra | obrigação legal |
| Barreira de idade 18+ na primeira visita (cookie, sem recolha de dados) | prudência; verificar se é exigível |
| Sem fotografias de pessoas a beber, brindes, mesas de festa | L.3323-4 |
| Blocos de anúncios e links afiliados nunca junto de conteúdo que possa ser lido como incitação | loi Évin + AdSense |

### ⚠️ Duas verificações a fazer antes de investir meses — dono: Gregori

1. **Fronteira editorial/publicitário.** Um site de análise de vinhos é conteúdo editorial ou publicidade na aceção da loi Évin? A presença de links afiliados empurra-o para o lado comercial. **Isto precisa de um advogado francês especializado, não da nossa interpretação nem da de uma IA.** Confiança baixa da minha parte.
2. **Monetização display.** As políticas do Google para álcool restringem a publicidade *de* álcool e seguem a lei local. Não encontrei confirmação clara de que conteúdo editorial sobre vinho seja livremente monetizável em França pelo AdSense. **Verificar antes de contar com um único euro de display.**

Se o display cair, o modelo passa a ser afiliação pura — o que aliás já é a conclusão do `2-CONTEXTO.md` («a afiliação é o atalho para os 500 €»).

**Fontes:** [Loi Évin — guia 2026](https://superpotion.fr/loi-evin-guide-complet/) · [Google — Advertising Policies: Alcohol](https://support.google.com/adspolicy/answer/6012382?hl=en) · [Sites internet et alcool : obligations](https://www.gazelle-du-web.com/general/sites-internet-alcool/)

---

## 3. IDENTIDADE — JÁ DECIDIDA, NÃO PROPOR ALTERNATIVAS

**Nome de trabalho:** `Carafe`
**Domínio alvo:** `carafe.fr` (Gregori: verificar disponibilidade antes da Fase 1; se ocupado, alternativas na mesma família curta e francesa)
**Baseline:** *La bonne bouteille, sans se tromper.*
**Voz:** sóbria, precisa, útil. Frases curtas. Números concretos. Zero superlativos. Zero «Dans cet article, nous allons voir…».

### Tokens de design — usar exatamente estes valores

```css
/* Cores — sistema fechado. Não acrescentar cores. */
--craie:        #FAF7F2;  /* fundo da página */
--papier:       #FFFFFF;  /* fundo de cartões e blocos */
--encre:        #1C1917;  /* texto principal */
--encre-doux:   #6B625B;  /* texto secundário, legendas */
--trait:        #E5DED3;  /* bordas, separadores */
--lie:          #6E1E28;  /* primária — títulos de secção, links, acentos */
--lie-clair:    #8F3341;  /* hover da primária */
--sauge:        #4A5D4E;  /* secundária — badges, motor de acordos */
--sable:        #F0E9DE;  /* fundo alternado de secção */
```

```css
/* Tipografia — três famílias, todas gratuitas, todas self-hosted (nada de CDN de fontes) */
--titres:  'Fraunces', Georgia, serif;        /* variável, opsz 24-72, wght 400-700 */
--corps:   'Public Sans', system-ui, sans-serif;
--donnees: 'JetBrains Mono', ui-monospace, monospace;  /* fichas técnicas, preços, notas */
```

```
Escala tipográfica (rem):  0.75 · 0.875 · 1 · 1.125 · 1.375 · 1.75 · 2.25 · 3
Corpo de texto: 1.125rem, altura de linha 1.7, largura máxima 68ch
Escala de espaçamento (px): 4 8 12 16 24 32 48 64 96 128
Raio de canto: 2px. Apenas. (Botões, cartões, imagens — tudo 2px.)
Sombras: nenhuma. A separação faz-se com 1px de --trait.
Contentor: 1120px máx., 20px de padding lateral em mobile.
```

### Proibições visuais — se aparecer alguma destas, o trabalho é rejeitado

- Gradientes roxos, azuis ou violeta em qualquer sítio
- Hero centrado com fotografia escura, sobreposição preta e um botão grande
- Grelha de três cartões «Features» com ícone, título e duas linhas
- `rounded-2xl`, `shadow-lg`, `shadow-xl`, glassmorphism, blur de fundo
- Emojis usados como ícones de interface
- Contadores animados, carrosséis automáticos, parallax
- Ícones decorativos que não transportam informação
- Bordô + dourado + serifa itálica = o cliché «luxe» que toda a gente faz. Nós somos editoriais, não uma carta de restaurante.
- Fotografias de stock de pessoas a brindar (e é ilegal, ver secção 2)

### O que o site deve parecer

Um guia impresso bem composto. Muito branco, texto grande e legível, tabelas de dados nítidas, uma cor de acento usada com parcimónia. Referências mentais: um manual técnico bem feito, não uma landing page de startup.

---

## 4. STACK — DECIDIDA, NÃO DISCUTIR

| Camada | Escolha | Porquê em uma frase |
|---|---|---|
| Framework | **Next.js 15+, App Router, TypeScript** | Gregori já a domina; SSG nativo; gratuito na Vercel |
| Renderização | **SSG puro** (`generateStaticParams`) | páginas HTML prontas = rápidas, gratuitas, ótimas para SEO |
| Estilo | **Tailwind CSS** com os tokens da secção 3 em `@theme` | rápido, sem CSS órfão, tokens forçam consistência |
| Conteúdo | **MDX + frontmatter no repositório**, validado com **Zod** | zero base de dados, zero custo, versionado no Git, o Zod impede fichas incompletas |
| Base de dados | **nenhuma no MVP** | não há utilizadores nem escrita; uma BD seria custo e complexidade a zero benefício |
| Pesquisa | **índice JSON gerado no build + Fuse.js no cliente** | funciona sem servidor, instantânea, gratuita |
| Motor de acordos | **regras determinísticas em JSON** | reprodutível, auditável, não alucina |
| IA | **Claude API apenas para interpretar a pergunta em texto livre → JSON** | último a construir, opcional, nunca gera factos |
| Hosting | **Vercel, plano gratuito** | deploy por push, HTTPS automático |
| Analytics | **GA4 + Search Console** | gratuitos, é o que o `2-CONTEXTO.md` já usa |
| Consentimento | **CMP certificada Google + Consent Mode v2** | exigido no EEE para anúncios personalizados |

**Custo fixo mensal alvo: 0 €.** Única exceção pré-receita: o domínio (~10–15 €/ano, verificar). Se propuseres um serviço pago, justifica com receita já existente — não com receita esperada.

---

## 5. ESTRUTURA DE URLs — EM FRANCÊS, FIXA

```
/                                  Accueil
/vins/rouge-sec                    Type — classement
/vins/blanc-sec
/vins/blanc-moelleux
/vins/rose
/vins/effervescent
/vins/champagne
/vins/vin-doux-naturel
/vignobles/france                  Pays / vignoble
/vignobles/italie
/vignobles/espagne
/vignobles/portugal
/vignobles/argentine
/vin/[slug]                        Fiche individuelle
/accords/[slug]                    Accord mets-vin  (/accords/fromage, /accords/barbecue)
/accords                           Index des accords
/guides/[slug]                     Articles éditoriaux
/recherche                         Résultats de recherche
/methode                           Comment nous notons — page de confiance
/go/[id]                           Redirection affiliée (noindex)
/mentions-legales
/politique-de-confidentialite
/cookies
/divulgation-affiliation
/contact
```

**Regras:** slugs sem acentos, minúsculas, hífen. Nunca alterar um slug publicado sem redirecionamento 301. `/vins/` são tipos, `/vignobles/` são origens — nunca misturar os dois no mesmo segmento.

---

## 6. MODELO DE CONTEÚDO — SCHEMA E EXEMPLO COMPLETO

Cada vinho é um ficheiro `content/vins/[slug].mdx`. Sem exceções, sem campos livres não declarados.

**Ficheiro:** `content/vins/exemple-modele.mdx` — *estrutura a replicar, dados a substituir*

```yaml
---
slug: "exemple-modele"
nom: "NOM DU VIN"                      # DADOS DE EXEMPLO — substituir
producteur: "NOM DU PRODUCTEUR"
pays: "france"                          # slug, doit exister dans content/vignobles/
region: "REGION"
appellation: "APPELLATION"
type: "rouge-sec"                       # enum fermé, voir ci-dessous
cepages: ["CEPAGE_1", "CEPAGE_2"]
millesime: 2021
degre: 13.0                             # % vol
prix_reference_eur: 12.50               # prix constaté en caviste FR, HT inclus
date_prix: "2026-08-01"

# Notation — chaque champ est renseigné à la main, jamais calculé par une IA
note_qualite: 15.5                      # /20, échelle documentée sur /methode
degustation:
  corps: 3                              # 1-5
  acidite: 4                            # 1-5
  tanins: 3                             # 1-5, null pour les blancs
  sucrosite: 1                          # 1-5
aromes: ["fruits rouges", "poivre", "sous-bois"]
temperature_service: "15-16 °C"
garde: "3 à 5 ans"
carafage: false

# Accords — clés issues de data/aliments.json, jamais de texte libre
accords: ["fromage-pate-pressee", "charcuterie", "grillades-boeuf"]

# Éditorial
resume: "Une phrase factuelle de 15 à 25 mots décrivant le vin."
auteur: "gregori"
date_publication: "2026-09-01"
date_revision: "2026-09-01"
statut: "publie"                        # brouillon | relu | publie

# Commerce — n'entre JAMAIS dans le classement éditorial
offres:
  - marchand: "MARCHAND_ID"             # doit exister dans data/marchands.json
    url_affiliee: "https://…"
    prix_eur: 12.50
    date_verification: "2026-08-01"
    disponible: true
---

Corps de la fiche en MDX. Registre descriptif, conforme L.3323-4 :
dénomination, composition, mode d'élaboration, degré, qualités
organoleptiques, origine, terroir, distinctions, mode de consommation.
Aucune évocation festive ou aspirationnelle.
```

### Enums fechados — o Zod rejeita qualquer outro valor

```
type: rouge-sec | rouge-moelleux | blanc-sec | blanc-moelleux | rose
    | effervescent | champagne | vin-doux-naturel | vin-fortifie
statut: brouillon | relu | publie
```

### Ficheiros de dados

```
data/aliments.json      alimentos → critérios de acordo (ver secção 8)
data/marchands.json     lojas, país, programa de afiliação, disclosure
data/pays.json          países, regiões, notas contextuais
```

### Regra de conteúdo, não negociável

Uma ficha só passa a `statut: publie` depois de revisão humana em francês pelo Gregori. É a regra do `2-CONTEXTO.md` e aplica-se aqui sem exceção. O build deve **falhar** se uma ficha com `statut: publie` tiver campos obrigatórios em falta.

### Origem dos dados — decisão da Fase 0

Ainda não está decidido. O prompt assume o cenário por omissão: **40 a 60 fichas curadas à mão**, escritas pelo Filipe a partir de vinhos que conseguimos verificar, revistas pelo Gregori. É a única opção que a Fase 0 pode alterar; se mudar, a IA deve avisar quais fases são afetadas antes de continuar.

Na Fase 0, a IA deve pesquisar e apresentar em tabela: fontes de dados legalmente utilizáveis em França, o que cada uma permite, e o custo. Sem copiar conteúdo protegido de outros sites. Sem scraping sem base legal verificada.

---

## 7. RAPPORT QUALITÉ-PRIX — ALGORITMO PUBLICADO

Calculado no build, em `lib/qualite-prix.ts`. Determinístico, versionado, e **explicado na página `/methode`** — a transparência é o argumento de confiança do site.

```
Entrées :  note_qualite (0-20, saisie humaine)
           prix_reference_eur
           mediane_prix_du_type  (calculée sur tout le corpus au build)

score_qualite = (note_qualite - 10) / 10                    → 0 à 1, un vin sous 10/20 est exclu
ratio_prix    = mediane_prix_du_type / prix_reference_eur    → >1 si moins cher que la médiane
score_prix    = min(ratio_prix, 2) / 2                       → plafonné, 0 à 1

qpr = 0.6 × score_qualite + 0.4 × score_prix                 → 0 à 1

★★★★★  qpr ≥ 0.80
★★★★   qpr ≥ 0.65
★★★    qpr ≥ 0.50
★★     qpr ≥ 0.35
★      qpr <  0.35
```

**Os pesos 0,6 / 0,4 são uma escolha editorial assumida**, não uma verdade. Estão declarados na `/methode` e mudá-los é uma decisão consciente, com data e nota de versão.

### Blindagem contra o conflito de interesses

A função `calculerQPR()` recebe um objeto **sem o campo `offres`**. O TypeScript impede-o na assinatura:

```ts
type VinPourClassement = Omit<Vin, 'offres'>;
export function calculerQPR(vin: VinPourClassement): number
```

Comissão, marchand e URL afiliada **não existem** no escopo onde o classement é calculado. Não é uma promessa editorial — é uma impossibilidade técnica. Escreve um teste que o prove.

---

## 8. MOTOR DE ACORDOS — DETERMINÍSTICO, SEM IA

O coração do site. Regras, não modelo de linguagem.

**Ficheiro:** `data/aliments.json`

```json
{
  "fromage-pate-pressee": {
    "libelle_fr": "Fromage à pâte pressée",
    "synonymes": ["comté", "beaufort", "gruyère", "cantal", "tomme"],
    "criteres": {
      "acidite_min": 3,
      "tanins_max": 3,
      "corps": [2, 3, 4],
      "types_recommandes": ["blanc-sec", "effervescent"],
      "types_exclus": ["rouge-moelleux", "vin-doux-naturel"]
    },
    "explication_fr": "L'acidité nettoie le gras du fromage ; des tanins marqués rendraient l'ensemble amer.",
    "page": "/accords/fromage"
  }
}
```

**Fluxo:** alimento → critérios → filtro sobre o corpus → ordenação por QPR → top 5 → texto de explicação vindo do JSON (nunca gerado no momento).

Se nenhum vinho passar o filtro, a página diz honestamente que ainda não temos recomendação para esse prato e propõe os acordos próximos. **Nunca inventar um resultado para preencher a página.**

---

## 9. IA — ÚLTIMA FASE, PAPEL MÍNIMO

A IA faz **uma única coisa**: transformar texto livre em JSON estruturado. Não conhece vinhos, não gera recomendações, não escreve texto para o utilizador.

```
Utilisateur : "je mange une raclette, budget serré"
        ↓
Claude API (temperatura 0, tool use com schema fixo)
        ↓
{ "intention": "accord",
  "aliments": ["fromage-pate-pressee"],
  "budget_max_eur": 15,
  "confiance": 0.9 }
        ↓
Moteur d'accords déterministe (section 8)  →  page /accords/fromage filtrée
```

**Regras de segurança:**

- A IA só pode devolver chaves que existam em `data/aliments.json`. Valida com Zod e rejeita o resto.
- `confiance < 0.7` → não redirecionar; mostrar a pesquisa tradicional com o texto do utilizador.
- Falha de API, timeout ou quota → **fallback silencioso** para a pesquisa Fuse.js. O site nunca fica dependente da API para funcionar.
- Chave de API exclusivamente no servidor (Route Handler). Nunca em `NEXT_PUBLIC_*`.
- Rate limiting por IP antes de sequer considerar publicar isto.

**RAG e embeddings: não.** Com 40–60 fichas e critérios numéricos, um filtro SQL-like sobre um array é mais rápido, mais barato, mais exato e auditável. Embeddings entram na conversa acima de ~500 fichas ou quando a pesquisa por semelhança falhar de forma mensurável — não antes.

---

## 10. AFILIAÇÃO — ARQUITETURA

**Separação estrutural.** Duas zonas visualmente distintas em cada ficha:

- **Notre classement** — fundo `--craie`, sem qualquer link comercial, com ligação para `/methode`.
- **Où acheter** — bloco separado, fundo `--sable`, borda `--trait`, com a menção de divulgação de afiliação por cima e a menção sanitária.

**Redirecionamento:** todos os links passam por `/go/[id]`, que faz 302 para o URL afiliado, com `rel="sponsored nofollow"`, `noindex` na rota, e envia um evento GA4 `clic_affilie` com `{ vin, marchand, position }`.

**`data/marchands.json`** guarda: id, nome, país-alvo, programa (Amazon Partenaires FR / Awin / Effiliation / direto), formato do link, texto de divulgação obrigatório, e ativo sim/não.

**Manutenção:** um script `npm run verifier-liens` percorre as `offres`, testa cada URL, e escreve um relatório. Uma oferta com `date_verification` há mais de 90 dias é escondida automaticamente no build. Produto que desapareceu → `disponible: false`, a ficha continua no ar sem link.

**Obrigatório:** divulgação de afiliação visível em todas as páginas com links afiliados. É exigência legal em França e exigência contratual da Amazon Partenaires.

**A verificar antes de construir esta fase — dono: Gregori:** as condições da Amazon Partenaires FR e das redes francesas quanto a bebidas alcoólicas, e a interação com a loi Évin. As taxas de comissão mudam com frequência — qualquer número citado tem de ser reverificado.

---

## 11. SEO E INTERNACIONALIZAÇÃO

### Decisão i18n: **preparado, não construído**

MVP 100 % em francês, na raiz, sem prefixo. Mas desde a Fase 2: nenhuma string em francês está escrita dentro de um componente — tudo passa por `messages/fr.json`. Acrescentar `/en/` ou `/pt/` mais tarde é acrescentar um ficheiro e um segmento de rota, não reescrever o site.

**Tradução automática está proibida.** Nem widget Google Translate, nem tradução por IA publicada sem revisão. Conteúdo traduzido por máquina e indexado é exatamente o que as políticas de spam do Google visam, e arrastaria o domínio inteiro.

### Checklist técnico — obrigatório na Fase 8

- [ ] `sitemap.xml` gerado no build a partir do corpus real
- [ ] `robots.txt` com `/go/` bloqueado
- [ ] `canonical` em todas as páginas
- [ ] `hreflang` + `x-default` preparados (só `fr` no MVP)
- [ ] Dados estruturados: `Article` nos guias, `ItemList` nos classements, `FAQPage` nos acordos, `BreadcrumbList` em tudo
- [ ] **Não** usar `Product` / `Review` / `AggregateRating` sem verificar antes as diretrizes atuais do Google sobre avaliações — risco de penalização
- [ ] `meta title` e `description` únicos, escritos à mão, nunca gerados por template
- [ ] Core Web Vitals: LCP < 2,5 s · CLS < 0,1 · INP < 200 ms
- [ ] Espaço reservado para os blocos de anúncios (evitar CLS)

### Anti-duplicação

Páginas de tipo e de vignoble partilham componentes mas **nunca texto**: cada uma tem um bloco editorial próprio de 200–400 palavras escrito à mão. Uma página de acordo sem pelo menos três vinhos elegíveis fica `noindex` até ter. Zero páginas geradas em massa sem conteúdo próprio.

---

## 12. FASES DE CONSTRUÇÃO

Cada fase: objetivo → programas necessários → ficheiros → código completo → como executar → **o que deves ver no ecrã** → erros comuns → checklist → commit. Depois **pára**.

| # | Fase | Entrega verificável |
|---|---|---|
| **0** | Decisões e contas | Origem dos dados decidida · domínio verificado · contas GitHub, Vercel, GSC, GA4 criadas · verificação legal iniciada |
| **1** | Ambiente e projeto vazio | Node, VS Code, Git instalados e verificados · projeto Next.js a correr em `localhost:3000` · primeiro commit no GitHub |
| **2** | Design system em código | Tokens em Tailwind · fontes self-hosted · 6 componentes base (Bouton, Carte, Tableau, Badge, Fil d'Ariane, Bloc sanitaire) numa página `/kit` |
| **3** | Camada de conteúdo | Schema Zod · 5 fichas MDX reais · build falha se uma ficha estiver incompleta |
| **4** | Fiche vin + páginas de tipo | `/vin/[slug]` e `/vins/[type]` a gerar HTML estático · QPR calculado · teste que prova que `offres` não entra no cálculo |
| **5** | Motor de acordos | `data/aliments.json` com 10 alimentos · `/accords/[slug]` a devolver top 5 correto |
| **6** | Accueil + pesquisa | Página inicial completa · índice de pesquisa gerado no build · Fuse.js a funcionar |
| **7** | Legal e conformidade | 5 páginas legais em francês profissional · CMP + Consent Mode v2 · barreira 18+ · menção sanitária em todo o lado |
| **8** | SEO técnico e deploy | Checklist da secção 11 completo · site online em produção · GSC e GA4 a receber dados |
| **9** | Afiliação | `/go/[id]` · `data/marchands.json` · script de verificação de links · eventos GA4 |
| **10** | IA de intenção *(opcional)* | Route Handler · Zod na saída · fallback testado com a API desligada |

**Ordem alterada face à v1, de propósito:** o legal (Fase 7) vem antes do deploy, porque em França as quatro páginas legais existem antes do primeiro conteúdo público. A afiliação vem depois do site estar online, porque candidatar-se a um programa com um site vazio é ser recusado. A IA vem em último porque o site tem de funcionar inteiro sem ela.

### Checklist ao fim de cada fase

```
[ ] O comando corre sem erro
[ ] O resultado no ecrã é o descrito
[ ] Nenhum erro na consola do navegador
[ ] Nenhum aviso do TypeScript
[ ] Commit feito com mensagem clara
[ ] Testado em mobile (DevTools, 375px de largura)
```

---

## 13. MVP, V2, V3

**MVP (Fases 0–9):** 40–60 fichas · 8 páginas de tipo · 5 vignobles · 10 acordos · pesquisa · QPR publicado · páginas legais · afiliação · FR apenas.

**V2 (depois de haver tráfego real no GSC):** IA de intenção · 15 guias editoriais · mais vignobles · comparador de duas garrafas · newsletter.

**V3 (só com dados que o justifiquem):** contas de utilizador · favoritos · alertas de preço · segundo idioma · e, se os dados do GSC apontarem para isso, o super-nicho do SaaS do `2-CONTEXTO.md`.

**Critério de decisão aos 6 meses:** se o site não tiver tração orgânica com 25+ páginas publicadas, analisamos friamente — corrigir, pivotar de ângulo, ou abandonar. Sem apego.

---

## 14. ENSINO — COMO EXPLICAR

Somos iniciantes. Nunca digas «configura X» sem dizer onde se clica.

- **«Instala o Node»** → o URL, a versão a escolher, o botão, o comando de verificação, e o que deve aparecer no terminal.
- **«Cria uma variável de ambiente»** → qual ficheiro, qual nome exato, onde se obtém o valor, porque é que nunca vai para o GitHub, e como confirmar que o `.gitignore` a protege.
- **«Executa o comando»** → em que programa, em que pasta, e o que deve aparecer.
- **Comandos de terminal** explicados à primeira utilização: `cd`, `ls`/`dir`, `mkdir`, `npm install`, `npm run dev`, `git init`, `git add`, `git commit`, `git push`.
- **Git e GitHub** explicados quando forem precisos, na Fase 1, não antes: o que é um commit, o que é um push, o que é um branch, e como voltar atrás quando partirmos alguma coisa.

Em cada fase, uma secção **«Erros comuns»** com a mensagem de erro literal e a correção. É isso que nos desbloqueia quando estivermos sozinhos às 23h.

---

## 15. TESTES DE ACEITAÇÃO

| Entrada | Resultado esperado |
|---|---|
| Pesquisar `malbec argentin` | Fichas com esse cépage e o vignoble Argentina |
| Pesquisar `vin pour fromage` | `/accords/fromage`, top 5 ordenado por QPR |
| Pesquisar `meilleur vin rouge sec` | `/vins/rouge-sec`, classement completo |
| Abrir uma ficha | Classement e bloco «Où acheter» visualmente separados; menção sanitária presente |
| Clicar em «Voir l'offre» | 302 via `/go/[id]`, evento GA4 `clic_affilie` na consola |
| Filtrar acordo sem resultados | Mensagem honesta, nenhum vinho inventado |
| Desligar a API Claude e perguntar em texto livre | Pesquisa Fuse.js assume, sem erro visível |
| Lighthouse mobile na ficha | Performance ≥ 90, sem CLS acima de 0,1 |
| `npm run build` com uma ficha incompleta | Build **falha** com mensagem clara |

---

## COMEÇA AGORA

Não construas nada ainda. A primeira resposta é **apenas a Fase 0**:

1. As decisões que faltam, com a tua recomendação para cada uma — em especial a origem dos dados dos vinhos, com a tabela de fontes legalmente utilizáveis em França e o custo de cada uma.
2. As contas a criar, por ordem, com dono (Gregori ou Filipe) e tempo estimado.
3. As duas verificações legais da secção 2, com o que exatamente perguntar a um advogado.
4. Qualquer ponto deste documento que consideres tecnicamente errado.

Depois pára e espera por `OK, fase seguinte`.
