# CLAUDE.md — Conformidade legal do site de vinho (França)

> Regras obrigatórias para qualquer código, texto ou conteúdo gerado neste projeto. Contexto: site francês de informação sobre vinho, com harmonização mets-vins, comparações e links de afiliados. Público: França. Idioma do site: francês. Base legal: loi Évin (Code de la santé publique art. L3323-1 e s.), Code de la consommation (art. L121-1, L122-1 a L122-7), RGPD/CNIL, LCEN. Sanção máxima: 75 000 € por infração. Prescrição: 6 anos.

---

## 0\. Regra fundadora

**A publicidade de vinho é legal na França. Ela é regulada, não proibida.** A internet é um suporte autorizado desde 2009 (lei HPST). Este site é lícito.

O que a presença de links de afiliados faz é **qualificar** o conteúdo como `publicité en faveur d'une boisson alcoolique`. Isso não é um problema — é um regime. O regime tem duas consequências, e só duas:

1. O texto fica restrito à lista fechada do art. L3323-4 (seção 2 deste documento).  
2. A mensagem sanitária e as condições de suporte tornam-se obrigatórias (seções 3 e 1).

Dentro desse regime você pode descrever, recomendar, comparar e monetizar vinhos. O que você não pode é escrever como uma marca escreveria: desejo, festa, prazer, ocasião social. A loi Évin funciona por **lista fechada** — o que não está expressamente autorizado no art. L3323-4 é infração.

A qualificação inversa existe e está na seção 9: conteúdo sobre terroir, região, história e patrimônio **não é publicidade** (art. L3323-3-1) e escreve-se com liberdade de tom — desde que a página não carregue link de afiliado. É uma escolha por página: liberdade editorial **ou** monetização, nunca as duas.

Ao gerar QUALQUER texto sobre um vinho — descrição, título, meta description, alt de imagem, CTA, post social, e-mail — aplique a lista da seção 2\. Sem exceção.

Em caso de dúvida sobre uma frase: **remova**. O custo de omitir é zero.

---

## 1\. Regras absolutas (NEVER)

Nunca gere, sugira ou aceite no código:

1. **NEVER** um texto sobre vinho que evoque convivialidade, festa, amigos, celebração, partilha, prazer, sedução, romance, relaxamento, evasão, férias, verão, praia, sucesso social, prestígio, sofisticação ou "momento perfeito".  
2. **NEVER** qualquer alegação de saúde ou nutricional (regulamento CE 1924/2006, proibição absoluta acima de 1,2 % vol.). Inclui: "digeste", "léger", "antioxydant", "resvératrol", "bon pour le cœur", "sans sulfites \= meilleur pour la santé".  
3. **NEVER** um convite explícito ao consumo: "ouvrez une bouteille", "à déguster ce soir", "masterclass", "leçon de dégustation", "laissez-vous tenter".  
4. **NEVER** conteúdo, link, seção, tag ou parceria ligada a esporte, clube, federação, competição ou evento esportivo.  
5. **NEVER** pessoas em imagens ou textos, salvo profissionais da cadeia do vinho identificados por nome, função e local de trabalho. Isso inclui mãos segurando taças.  
6. **NEVER** formato publicitário intrusivo ou intersticial: pop-up promocional, modal de vinho na entrada, interstitial antes do artigo, vídeo em autoplay, banner que cubra o conteúdo, sticky que force interação.  
7. **NEVER** sorteio, concurso ou jogo com garrafa de vinho como prêmio.  
8. **NEVER** comparação valorativa entre vinhos de denominações diferentes (ver seção 4).  
9. **NEVER** depositar cookie de afiliação, analytics ou marketing antes do consentimento.  
10. **NEVER** emoji festivo (🎉 🥂 🍾 🏖️ ☀️ ❤️ 🔥) em conteúdo que mencione vinho.  
11. **NEVER** publicar uma página de vinho sem a mensagem sanitária.  
12. **NEVER** usar imagem de garrafa, rótulo ou vinhedo sem licença explícita (usar apenas os assets fornecidos pelo programa de afiliação, ou próprios). Nunca gerar por IA imagens que reproduzam rótulos reais.

---

## 2\. Vocabulário autorizado (art. L3323-4)

Todo texto sobre um vinho deve se restringir a estes temas:

| Tema | Exemplos aceitos |
| :---- | :---- |
| Grau alcoólico | `13 % vol.` |
| Denominação e origem | `Chinon AOP`, `Vallée de la Loire`, `IGP Pays d'Oc` |
| Composição | cepas, assemblage, percentuais |
| Produtor | nome, endereço, agentes, depositários |
| Modo de elaboração | vinificação, fermentação, envelhecimento, barrica, filtragem |
| Modo de consumo | temperatura de serviço, decantação, carafe, **acordes com pratos** |
| Modalidades de venda | preço, formato, onde comprar |
| Cor, olfato, gosto — **objetivos** | `robe rubis`, `nez de fruits noirs`, `tanins fins`, `acidité marquée`, `finale longue` |
| Terroir | solo, clima, exposição, altitude, parcela |
| Distinções | medalhas, notas de concursos, com fonte e ano |
| Embalagem | descrição sóbria, sem valorização emocional |

**Teste de validação de qualquer frase:** ela informa um fato verificável sobre o produto, ou ela provoca desejo? Se provoca, reescreva como ficha técnica.

### Reescritas de referência

❌ "Un Chinon rond et séducteur, parfait pour une soirée entre amis."

✅ "Chinon AOP, 100 % cabernet franc, 13 % vol. Robe rubis sombre, nez de fruits

    noirs et poivron, tanins fins. Servir à 16 °C."

❌ "Le meilleur vin pour se détendre après une journée difficile."

✅ "Vin de structure légère, acidité moyenne. Servir frais. Accompagne les plats

    peu épicés."

❌ "Notre sélection été : les 10 rosés qui vont sauver votre plage."

✅ "Dix rosés de Provence AOP entre 8 € et 15 € : cépages, degré, profil

    aromatique et accords."

---

## 3\. Mensagem sanitária — implementação obrigatória

Texto exato, sem variação:

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

Requisitos de apresentação:

- Horizontal, **negrito**, cor contrastante com o fundo.  
- Tamanho mínimo \= 1/100 da soma (altura \+ largura) do bloco publicitário.  
- Presente em **cada** página, card, ficha, post e story que mencione um vinho. Não basta uma vez no rodapé do site.

### Implementação exigida

Criar `components/MessageSanitaire.tsx` e torná-lo obrigatório em todo layout que renderize um vinho. Nenhuma página de vinho pode ser mergeada sem ele.

// components/MessageSanitaire.tsx

export const MESSAGE\_SANITAIRE \=

  "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.";

export function MessageSanitaire({ variant \= "inline" }: { variant?: "inline" | "footer" }) {

  return (

    \<p

      role="note"

      className={

        variant \=== "footer"

          ? "font-bold text-sm text-neutral-900 dark:text-neutral-100"

          : "font-bold text-sm mt-4 border-t border-neutral-300 pt-3"

      }

    \>

      {MESSAGE\_SANITAIRE}

    \</p\>

  );

}

Regra de arquitetura: a mensagem é injetada pelo **layout da rota** (`app/vins/layout.tsx`, `app/accords/layout.tsx`), nunca colada manualmente página a página.

O rodapé global (`app/layout.tsx`) deve conter, adicionalmente:

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

La vente d'alcool aux mineurs de moins de 18 ans est interdite.

---

## 4\. Comparações — restrição estrutural

`Code de la consommation, art. L122-3` :

> « Pour les produits bénéficiant d'une appellation d'origine protégée ou d'une indication géographique protégée, la comparaison n'est autorisée qu'entre produits bénéficiant chacun de la même appellation ou indication. »

### Consequências para o modelo de dados e as rotas

**PROIBIDO:** comparar valorativamente Sancerre AOP × Pouilly-Fumé AOP, ou Bordeaux AOP × IGP Pays d'Oc. Denominações diferentes \= comparação ilícita.

**PERMITIDO — implementar apenas estes três padrões:**

1. **Comparação intra-denominação.** O comparador só aceita vinhos com a mesma `appellation`. Validar em runtime:

export function assertComparable(wines: Wine\[\]): void {

  const appellations \= new Set(wines.map((w) \=\> w.appellation));

  if (appellations.size \> 1\) {

    throw new Error(

      \`Comparaison illicite (art. L122-3) : ${\[...appellations\].join(", ")}\`

    );

  }

}

2. **Comparação de preço do mesmo vinho entre lojas.** Mesmo produtor, mesma cuvée, mesma safra, ofertas diferentes. É o formato mais seguro e o melhor para afiliação. Deve ser o formato padrão do comparador.  
     
3. **Fichas lado a lado sem arbitragem.** Tabela de dados objetivos, sem eleger vencedor, sem "melhor que". Ordenação permitida apenas por critério objetivo declarado na interface (`Trié par prix au litre`).

Toda comparação deve ainda respeitar a seção 2: nenhum adjetivo hedônico pode justificar um resultado.

---

## 5\. Geração de texto por IA

Se descrições, harmonizações ou títulos forem gerados por LLM:

1. O prompt de sistema deve conter a lista fechada da seção 2 como restrição dura, e as proibições da seção 1 como interdições explícitas.  
2. **Toda saída passa por um filtro de bloqueio antes de ser persistida.** Um LLM produz por padrão exatamente o vocabulário que a lei proíbe.  
3. Nenhum texto gerado vai direto ao banco sem passar pelo validador.

// lib/compliance/blocklist.ts

export const BLOCKED\_TERMS \= \[

  // convivialité / hédonisme

  "convivial", "convivialité", "partage", "partager", "entre amis", "amis",

  "fête", "festif", "célébrer", "célébration", "trinquer", "apéro",

  "plaisir", "délice", "gourmand", "séduisant", "séduction", "sensuel",

  "envoûtant", "envoûtement", "romantique", "moment parfait", "soirée",

  "détente", "se détendre", "relaxer", "réconfort", "évasion", "voyage sensoriel",

  // vacances / saison / sport

  "vacances", "été", "plage", "soleil", "terrasse", "sport", "match",

  "victoire", "champion", "stade",

  // statut

  "succès", "prestige", "luxe", "raffinement", "sophistiqué", "élégance de vivre",

  // invitation à consommer

  "ouvrez une bouteille", "laissez-vous tenter", "à déguster ce soir",

  "masterclass", "leçon de dégustation", "il faut goûter",

  // santé (interdiction absolue)

  "santé", "bienfaits", "digeste", "léger pour l'organisme", "antioxydant",

  "resvératrol", "bon pour le cœur", "vertus",

\];

export const BLOCKED\_EMOJI \= \["🎉", "🥂", "🍾", "🏖️", "☀️", "❤️", "🔥", "😍", "🤩"\];

export type ComplianceResult \= { ok: boolean; hits: string\[\] };

export function checkCompliance(text: string): ComplianceResult {

  const haystack \= text.toLowerCase();

  const hits \= \[

    ...BLOCKED\_TERMS.filter((t) \=\> haystack.includes(t)),

    ...BLOCKED\_EMOJI.filter((e) \=\> text.includes(e)),

  \];

  return { ok: hits.length \=== 0, hits };

}

Uso obrigatório em toda rota de escrita:

const result \= checkCompliance(generated);

if (\!result.ok) {

  // não persistir, não publicar — regenerar ou rejeitar

  throw new Error(\`Contenu non conforme (loi Évin) : ${result.hits.join(", ")}\`);

}

O filtro é uma rede de segurança, não uma garantia. Um texto que passa no filtro ainda pode ser não conforme — a lista fechada continua sendo a referência.

---

## 6\. Afiliação — transparência

O caráter comercial deve ser **imediatamente identificável** (art. L121-1 e L121-3 Code de la consommation; loi nº 2023-451 de 09/06/2023). Sanção: até 2 anos de prisão e 300 000 € de multa.

Regras de implementação:

- Bloco de divulgação **no topo** da página, antes do primeiro link, nunca só no rodapé.  
- Em francês, na mesma língua do conteúdo.  
- Menção curta `Lien affilié` ao lado de cada link individual.  
- Componente obrigatório, injetado pelo layout, não colado à mão.

// components/DisclosureAffiliation.tsx

export function DisclosureAffiliation() {

  return (

    \<aside className="border border-neutral-300 p-4 text-sm"\>

      \<strong\>Publicité\</strong\> — Cette page contient des liens affiliés. Si vous

      achetez via ces liens, nous percevons une commission. Cela ne modifie pas le

      prix que vous payez ni la sélection présentée.

    \</aside\>

  );

}

Atributos exigidos em todo link de afiliado:

\<a href={url} rel="sponsored nofollow noopener" target="\_blank"\>

  {label} \<span className="text-xs uppercase tracking-wide"\>Lien affilié\</span\>

\</a\>

Para posts sociais gerados pelo projeto, o template deve conter:

\#Publicité — L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

E a segmentação \+18 deve estar ativa na plataforma. Snapchat: não usar.

---

## 7\. Cookies e RGPD

**Cookies de afiliação NÃO são isentos de consentimento** (Conseil d'État, abril de 2022). Apenas rastreadores de cashback/recompensa, onde o usuário se inscreveu para isso, são isentos.

Implicações obrigatórias no código:

1. Nenhum script de rede de afiliação, analytics ou pixel é carregado antes do consentimento. Carregamento condicional, nunca em `<head>` estático.  
2. Banner de cookies com botão **Refuser** tão visível quanto **Accepter** (mesmo tamanho, mesmo nível visual). Banner enviesado \= infração autônoma, multas simplificadas de 3 000 a 20 000 €.  
3. Link permanente `Gérer mes cookies` no rodapé, reabrindo as preferências.  
4. Prova do consentimento conservada.  
5. Preferir deep links parametrizados no destino e rastreio server-side quando o programa permitir — a perda de atribuição por recusa é estrutural e deve entrar nas projeções de receita.

`politique-de-confidentialite` deve cobrir os nove itens do RGPD: identidade do responsável, finalidades, base legal, destinatários, duração de conservação, direitos do usuário, direito de reclamação à CNIL, transferências fora da UE, DPO se houver.

---

## 8\. Páginas legais obrigatórias

Rotas que devem existir e estar linkadas no rodapé de todas as páginas:

- `/mentions-legales`  
- `/politique-de-confidentialite`  
- `/gestion-des-cookies`  
- `/cgu` (apenas se houver contas, comentários ou favoritos)

Conteúdo mínimo de `/mentions-legales`:

Éditeur du site

\[Prénom Nom\], entrepreneur individuel

\[Adresse\] — \[Email\] — \[Téléphone\]

SIRET : \[numéro\] — Code APE : \[code\]

TVA : non applicable, art. 293 B du CGI

Directeur de la publication : \[Prénom Nom\]

Hébergeur

\[Raison sociale\] — \[Adresse complète\] — \[Téléphone\]

Nature du site

Ce site est un site d'information et de comparaison sur le vin.

Il ne vend aucune boisson alcoolique. Il contient des liens affiliés

signalés comme tels.

Omissão das mentions légales: até 75 000 € (pessoa física), 375 000 € (pessoa jurídica).

Não há CGV nem direito de retratação enquanto o site não vender. Se algum dia vender diretamente, o regime muda por completo (declaração, verificação de idade na compra, transporte) — não implementar carrinho sem revisão jurídica prévia.

---

## 9\. Separação editorial / comercial

O art. L3323-3-1 retira da qualificação de publicidade os conteúdos sobre região de produção, toponímia, indicação geográfica, terroir, itinerário, savoir-faire, história e patrimônio cultural, gastronômico ou paisagístico de bebidas com denominação protegida.

Para preservar essa defesa, a separação deve ser **estrutural, não cosmética**:

app/

  (editorial)/          → SEM link de afiliado, SEM CTA de compra

    regions/\[slug\]/     → terroir, história, paisagem, savoir-faire

    apprendre/\[slug\]/   → técnica, vinificação, denominações

  (commercial)/         → COM afiliação, COM MessageSanitaire e DisclosureAffiliation

    vins/\[slug\]/

    accords/\[slug\]/

    comparatifs/\[slug\]/

Regra dura: **nenhum componente de afiliação pode ser importado dentro de `(editorial)`.** Se possível, garantir isso por lint rule ou por revisão no PR.

---

## 10\. Definition of done — checklist de PR

Nenhuma página de vinho é considerada pronta sem:

- [ ] `MessageSanitaire` renderizado, injetado pelo layout  
- [ ] Todo texto validado contra a lista fechada da seção 2  
- [ ] `checkCompliance()` executado sobre qualquer texto gerado por IA  
- [ ] `DisclosureAffiliation` no topo, se houver link de afiliado  
- [ ] `rel="sponsored nofollow noopener"` em todos os links de afiliado  
- [ ] Nenhum cookie depositado antes do consentimento  
- [ ] Comparações restritas a mesma denominação, ou a preço do mesmo vinho  
- [ ] Nenhum formato intrusivo (pop-up, interstitial, autoplay, sticky forçado)  
- [ ] Nenhuma menção a esporte, saúde, festa, férias ou contexto social  
- [ ] Imagens com licença verificada  
- [ ] Rodapé com mensagem sanitária \+ menção sobre menores de 18 anos

---

## 11\. Notas fiscais (fora do código, para o dono do projeto)

- Comissões de afiliação: normalmente **BNC** (abatimento 34 %), podendo ser BIC (abatimento 50 %) se integradas a prestação comercial mais ampla. Confirmar com o SIE.  
- URSSAF 2026: 23,2 % em BNC, 21,2 % em BIC serviços. Com ACRE: 11,6 % / 10,6 %.  
- Teto do regime micro (serviços): 83 600 €. Franquia de TVA: 37 500 € / 41 250 €.  
- **Awin fatura da Alemanha, Amazon do Luxemburgo, Tradedoubler da Suécia.** Isso obriga a: pedir um `numéro de TVA intracommunautaire` ao SIE, faturar HT com a menção `Autoliquidation par le preneur — art. 283-2 du CGI`, e enviar a **DES** até o 10.º dia útil do mês seguinte, todo mês com comissão. É declarativo, não custa imposto, mas a omissão é sancionável.

---

## 12\. Limites deste documento

Isto é pesquisa jurídica pública organizada como especificação técnica, não parecer de advogado. Três decisões merecem consulta profissional antes de escalar: o desenho do comparador (art. L122-3), a formalização da fronteira editorial/comercial (art. L3323-3-1), e a geração de texto por IA em escala (cada página é uma infração potencial, com prescrição de seis anos).

A ARPP emite pareceres consultivos sobre conformidade publicitária — não vinculantes, mas úteis como prova de diligência.  
