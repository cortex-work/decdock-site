import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const TEMPLATE = resolve(ROOT, 'public/demo-canli/index.html')
const DATAJS = resolve(ROOT, 'scripts/proof/en-data.js')
const OUT = resolve(ROOT, 'public/enron-proof/index.html')

let html = readFileSync(TEMPLATE, 'utf8')
const dataJs = readFileSync(DATAJS, 'utf8').trim()

function replaceOrThrow(from, to) {
  if (!html.includes(from)) throw new Error(`replace anchor not found: ${from.slice(0, 90)}`)
  html = html.replace(from, to)
}

function replaceAll(from, to) {
  if (!html.includes(from)) return
  html = html.split(from).join(to)
}

function replaceRegexOrThrow(pattern, to) {
  if (!pattern.test(html)) throw new Error(`regex anchor not found: ${pattern}`)
  html = html.replace(pattern, to)
}

const dataStart = html.indexOf('const SOURCES = {')
const dataEnd = html.indexOf('const ESC=')
if (dataStart < 0 || dataEnd < 0 || dataEnd < dataStart) {
  throw new Error('data anchors not found')
}
html = html.slice(0, dataStart) + dataJs + '\n\n' + html.slice(dataEnd)

replaceOrThrow(`<html lang="tr">`, `<html lang="en">`)
replaceOrThrow(
  `<title>Karar Sicili — canlı demo | Decdock</title>`,
  `<title>A real run on Enron's public archive | Decdock</title>`,
)
replaceOrThrow(
  `<meta name="description" content="Decdock karar sicilini canlı deneyin: ara, filtrele, bir karara tıkla → onu gerçek e-postanın içinde vurgulu gör, karar zincirini izle. Temsili örnek veri." />`,
  `<meta name="description" content="The Decdock engine run over Enron's public email archive: 2 conflicts, 2 supersede chains, and 20 source-linked records. Real-run proof." />`,
)
replaceOrThrow(
  `<link rel="canonical" href="https://decdock.com/demo-canli/" />`,
  `<link rel="canonical" href="https://decdock.com/enron-proof/" />
<link rel="alternate" hreflang="tr" href="https://decdock.com/enron-kanit/" />
<link rel="alternate" hreflang="en" href="https://decdock.com/enron-proof/" />
<link rel="alternate" hreflang="x-default" href="https://decdock.com/enron-proof/" />`,
)
replaceOrThrow(
  `<meta property="og:title" content="Karar Sicili — canlı demo | Decdock" />`,
  `<meta property="og:title" content="A real run on Enron's archive — Decdock" />`,
)
replaceOrThrow(
  `<meta property="og:description" content="Çalışan bir karar sicilini gezin: kararı kaynağında vurgulu görün, zinciri izleyin. Temsili veri." />`,
  `<meta property="og:description" content="The Decdock engine on Enron's public archive: 2 conflicts, 2 supersede chains, 20 source-linked records — every row tied to a real email." />`,
)
replaceOrThrow(
  `<meta property="og:url" content="https://decdock.com/demo-canli/" />`,
  `<meta property="og:url" content="https://decdock.com/enron-proof/" />`,
)

replaceOrThrow(
  `.dek{max-width:64ch;color:var(--body);font-size:14.5px;margin-bottom:18px;} .dek b{color:var(--ink);}`,
  `.dek{max-width:64ch;color:var(--body);font-size:14.5px;margin-bottom:14px;} .dek b{color:var(--ink);}
  .proof-strip{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;gap:10px;align-items:stretch;margin:0 0 18px;padding:10px;border:1px solid rgba(156,110,68,.28);border-radius:12px;background:linear-gradient(135deg,rgba(255,250,243,.86),rgba(156,110,68,.07));}
  .proof-strip .claim{font-size:12.5px;line-height:1.5;color:var(--body);padding:5px 6px;}
  .proof-strip .claim b{color:var(--ink);}
  .proof-metric{min-width:86px;border:1px solid var(--line);border-radius:9px;background:var(--pane);padding:8px 10px;text-align:center;}
  .proof-metric b{display:block;font-family:'Newsreader',serif;font-size:20px;color:var(--ink);line-height:1;}
  .proof-metric span{display:block;margin-top:4px;font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}
  @media (max-width:720px){.proof-strip{grid-template-columns:1fr 1fr}.proof-strip .claim{grid-column:1/-1}.proof-metric{min-width:0}}`,
)

replaceOrThrow(
  `<a class="demo-tag" href="/karar-grafi/">Tüm kararların ağı →</a>`,
  `<a class="demo-tag" href="/enron-graph/">Graph view: Enron →</a>`,
)
replaceOrThrow(
  `<h1>Karar Sicili — gezin, kaynağına inin, zinciri izleyin</h1>`,
  `<h1>A real run — Enron's public archive</h1>`,
)
replaceOrThrow(
  `<p class="dek">Kanonik karar grafındaki <b>temsili</b> şirket dünyasından çıkarılmış küçük bir sicil. Bir kayda tıklayın → <b>"Kaynağı aç"</b> ile karar ya da politikayı <b>e-postanın içinde birebir vurgulu</b> görün. Bazı kararlar <b>bir politikayı ihlal eder</b>; bazıları da eski kararı zincirde geçersiz kılar.</p>`,
  `<p class="dek">This is <b>not representative</b>. The Decdock engine was run over Enron's public email archive (FERC release) — every record below is tied to <b>a real sentence in a real email</b>. Click a record → use <b>"Open source"</b> to see the real quote. Not a verdict; a <b>candidate signal</b> for a human to confirm.</p>
  <div class="proof-strip" aria-label="Enron proof summary">
    <div class="claim"><b>What happened?</b> In public Enron/FERC emails, Decdock surfaced source-linked decision/rule records and signals where later records update or conflict with earlier ones.</div>
    <div class="proof-metric"><b>2</b><span>Conflicts</span></div>
    <div class="proof-metric"><b>2</b><span>Supersedes</span></div>
    <div class="proof-metric"><b>20</b><span>Sourced records</span></div>
  </div>`,
)
replaceOrThrow(
  `placeholder="Ara… (örn. iade, CFO, deploy, 500₺, ihlal)"`,
  `placeholder="Search… (e.g. VaR, DPR, DASH, $1M, MSA)"`,
)
replaceOrThrow(
  `    Gördüğünüz her satır <b>kaynağına bağlı</b> — uydurma yok, e-postadaki cümleye iner. Politikalar duran kural olarak ayrılır; ihlaller kırmızı görünür. Kendi <b>bitmiş bir projenizden ücretsiz örnek rapor</b> için: <b>pilot@decdock.com</b> · <a href="/">decdock.com</a>`,
  `    <b>So what?</b> This page does not claim Decdock declares truth. It shows that, on a public archive, the engine can produce <b>sourced candidate memory</b> and <b>drift signals</b> for a human to verify. The same engine, with only a <b>JSON tenant profile</b>, was pointed at a different domain: energy trading. Scale note: this run consolidated 37 raw records into 28 records; this page shows the strongest 20. For your own public/sanitized archive: <b>pilot@decdock.com</b> · <a href="/enron-graph/">open the Enron graph view</a>`,
)
replaceOrThrow(
  `<p class="foot">Temsili/örnek veridir; gerçek bir şirketin verisi değildir. © 2026 Decdock</p>`,
  `<p class="foot">Enron public FERC email archive · Decdock engine + tenant profile · candidate signal, not a verdict · © 2026 Decdock</p>`,
)
replaceOrThrow(
  `<div class="src-head">Kaynak e-posta</div>`,
  `<div class="src-head">Source — Enron / FERC archive</div>`,
)
replaceOrThrow(
  `const FILTERS=[['all','Tümü'],['onayli','Onaylı karar'],['aday','İnceleme adayı'],['politika','Politika'],['violation','⚠ İhlal'],['chain','⛓ Zincirli']];`,
  `const FILTERS=[['all','All'],['chain','Drift / chain'],['onayli','Approved record'],['aday','Candidate signal'],['politika','Rule / policy']];`,
)

replaceRegexOrThrow(
  /function renderStats\(\)\{[\s\S]*?\n\}/,
  `function renderStats(){
  const onayli=DATA.filter(x=>x.st==='onayli'&&x.kind!=='politika').length, aday=DATA.filter(x=>x.st==='aday').length;
  const drift=DATA.filter(x=>x.chainTo!==undefined).length, politika=DATA.filter(x=>x.kind==='politika').length;
  document.getElementById('stats').innerHTML=
    \`<div class="stat s"><div class="n">\${onayli}</div><div class="l">Approved records</div></div>\`+
    \`<div class="stat a"><div class="n">\${aday}</div><div class="l">Candidate signals</div></div>\`+
    \`<div class="stat v"><div class="n">\${drift}</div><div class="l">Drift / chains</div></div>\`+
    \`<div class="stat p"><div class="n">\${politika}</div><div class="l">Rules / policies</div></div>\`+
    \`<div class="stat k"><div class="n">\${Object.keys(SOURCES).length}</div><div class="l">Source threads</div></div>\`+
    \`<div class="stat k"><div class="n">100%</div><div class="l">Source-linked</div></div>\`;
}`,
)

replaceRegexOrThrow(
  /function dateKey\(date\)\{[\s\S]*?\n\}/,
  `function dateKey(date){
  const s=String(date||'').trim();
  const iso=s.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
  if(iso) return Number(iso[1])*372+Number(iso[2])*31+Number(iso[3]);
  const parts=s.split(/\\s+/);
  const day=Number(parts[0])||1;
  const month=MONTHS[parts[1]]||1;
  return month*31+day;
}`,
)

for (const [from, to] of [
  ['Kaynağı aç — e-postada vurgulu gör', 'Open source — see it highlighted'],
  ['Karar, kaynaktaki cümleye birebir bağlıdır — ', 'Each record maps verbatim to the source sentence — '],
  ['Uydurma değil; gösterilen, e-postanın içinde geçen ifadedir.', 'No fabrication; what you see is the phrase as it appears in the email.'],
  ['Neden sicile girmedi (aday):', 'Why it is a candidate signal:'],
  ['Bağlantılar · zaman çizgisi', 'Relations · timeline'],
  ['Kaynak — Enron / FERC arşivi', 'Source — Enron / FERC archive'],
  ['Kaynağa bağlı', 'Source-linked'],
  ['Duran kural / politika', 'Standing rule / policy'],
  ['Karar kaydı', 'Decision record'],
  ['⛓ zincirli', '⛓ chained'],
  ['⚠ politika ihlali', '⚠ policy violation'],
  ['Onaylı karar', 'Approved record'],
  ['İnceleme adayı', 'Candidate signal'],
  ['Politika', 'Policy'],
  ['(çıkarım sinyali)', '(inference signal)'],
  ['← Karara dön', '← Back to record'],
  ['↩ geldiğin:', '↩ from:'],
  ['sarı ile vurgulandı', 'highlighted in yellow'],
  ['alıntı yukarıda', 'quote shown above'],
  ['Eşleşen kayıt yok.', 'No matching records.'],
  ['aria-label="Kapat"', 'aria-label="Close"'],
  ['Sahipsiz', 'Unowned'],
  ["?'Sahip':'Onaylayan'", "?'Owner':'Ratified by'"],
  ['>Tarih</div>', '>Date</div>'],
  ['>Tür</div>', '>Type</div>'],
  ['>Güven</div>', '>Confidence</div>'],
  ['>Kaynak</div>', '>Source</div>'],
  [' güven</span>', ' confidence</span>'],
  ['Politika ihlali:', 'Policy violation:'],
  ['politikasını ihlal ediyor', 'violates this policy'],
  ['“${it.violationLabel}” politikasını ihlal ediyor', 'violates policy: “${it.violationLabel}”'],
  ['“${it.d}” politikasını ihlal ediyor', 'violates policy: “${it.d}”'],
  ["'bu karar'", "'this record'"],
  ["'Sahipsiz'", "'Unowned'"],
  [" ay '+(diff>0?'sonra':'önce')", " mo '+(diff>0?'later':'earlier')"],
]) {
  replaceAll(from, to)
}

html = html
  .replace("const confTr=c=>({high:'yüksek',medium:'orta',low:'düşük'}[c]||c);", "const confTr=c=>({high:'high',medium:'medium',low:'low'}[c]||c);")
  .replace("const MONTHS={Oca:1,Şub:2,Mar:3,Nis:4,May:5,Haz:6,Tem:7,Ağu:8,Eyl:9,Eki:10,Kas:11,Ara:12};", "const MONTHS={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};")
  .replace("depends_on:{out:['→','dayanıyor',''],in:['←','dayanak oldu','']},", "depends_on:{out:['→','depends on',''],in:['←','basis for','']},")
  .replace("references:{out:['→','atıf veriyor',''],in:['←','atıf alıyor','']},", "references:{out:['→','references',''],in:['←','referenced by','']},")
  .replace("supersedes:{out:['→','geri aldı',''],in:['←','geri alındı','']},", "supersedes:{out:['→','supersedes',''],in:['←','superseded by','']},")
  .replace("conflicts:{out:['↔','çelişiyor','danger'],in:['↔','çelişiyor','danger']},", "conflicts:{out:['↔','conflicts','danger'],in:['↔','conflicts','danger']},")
  .replace("complies_with:{out:['✓','uyuyor','ok'],in:['←','uyan karar','ok']},", "complies_with:{out:['✓','complies','ok'],in:['←','complying record','ok']},")
  .replace("violates:{out:['⚠','ihlal ediyor','danger'],in:['⚠','ihlal eden','danger fill']},", "violates:{out:['⚠','violates','danger'],in:['⚠','violated by','danger fill']},")

writeFileSync(OUT, html, 'utf8')
console.log(`written ${OUT}`)
