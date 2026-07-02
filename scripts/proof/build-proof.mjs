import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const TEMPLATE = resolve(ROOT, 'public/demo-canli/index.html')
const DATAJS = resolve(ROOT, 'scripts/proof/enron-data.js')
const OUT = resolve(ROOT, 'public/enron-kanit/index.html')

let html = readFileSync(TEMPLATE, 'utf8')
const dataJs = readFileSync(DATAJS, 'utf8').trim()
const bundle = vm.runInNewContext(`${dataJs}\n;({ META, DATA, SOURCES })`, {})
const meta = bundle.META ?? {}
const data = bundle.DATA ?? []
const sourceCount = Object.keys(bundle.SOURCES ?? {}).length
const recordCount = data.length
const conflictCount = meta.keptConflicts ?? data.filter((record) => record.relType === 'conflicts').length
const supersedeCount = meta.keptSupersedes ?? data.filter((record) => record.relType === 'supersedes').length
const driftCount = meta.driftEdges ?? data.filter((record) => record.chainTo !== undefined).length
const rawSupersedes = meta.rawSupersedes ?? supersedeCount
const rawRecords = meta.rawRecords ?? recordCount
const rawConflicts = meta.rawConflicts ?? conflictCount

function replaceOrThrow(from, to) {
  if (!html.includes(from)) throw new Error(`replace anchor not found: ${from.slice(0, 90)}`)
  html = html.replace(from, to)
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

replaceOrThrow(
  `<title>Karar Sicili — canlı demo | Decdock</title>`,
  `<title>Gerçek çalıştırma: Enron kamuya açık arşivi | Decdock</title>`,
)
replaceOrThrow(
  `<meta name="description" content="Decdock karar sicilini canlı deneyin: ara, filtrele, bir karara tıkla → onu gerçek e-postanın içinde vurgulu gör, karar zincirini izle. Temsili örnek veri." />`,
  `<meta name="description" content="Decdock motoru Enron'un kamuya açık e-posta arşivi üzerinde çalıştırıldı: ${conflictCount} çelişki, ${supersedeCount} gerçek supersede ve ${recordCount} kaynaklı kayıt. Gerçek çalıştırma kanıtı." />`,
)
replaceOrThrow(
  `<link rel="canonical" href="https://decdock.com/demo-canli/" />`,
  `<link rel="canonical" href="https://decdock.com/enron-kanit/" />
<link rel="alternate" hreflang="tr" href="https://decdock.com/enron-kanit/" />
<link rel="alternate" hreflang="en" href="https://decdock.com/enron-proof/" />
<link rel="alternate" hreflang="x-default" href="https://decdock.com/enron-proof/" />`,
)
replaceOrThrow(
  `<meta property="og:title" content="Karar Sicili — canlı demo | Decdock" />`,
  `<meta property="og:title" content="Gerçek çalıştırma: Enron arşivi — Decdock" />`,
)
replaceOrThrow(
  `<meta property="og:description" content="Çalışan bir karar sicilini gezin: kararı kaynağında vurgulu görün, zinciri izleyin. Temsili veri." />`,
  `<meta property="og:description" content="Decdock motoru Enron'un kamuya açık arşivinde: ${conflictCount} çelişki, ${supersedeCount} gerçek supersede, ${recordCount} kaynaklı kayıt — her satır gerçek bir e-postaya bağlı." />`,
)
replaceOrThrow(
  `<meta property="og:url" content="https://decdock.com/demo-canli/" />`,
  `<meta property="og:url" content="https://decdock.com/enron-kanit/" />`,
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
  `<a class="demo-tag" href="/enron-grafi/">Ağ görünümü: Enron →</a>`,
)
replaceOrThrow(
  `<h1>Karar Sicili — gezin, kaynağına inin, zinciri izleyin</h1>`,
  `<h1>Gerçek çalıştırma — Enron'un kamuya açık arşivi</h1>`,
)
replaceOrThrow(
  `<p class="dek">Kanonik karar grafındaki <b>temsili</b> şirket dünyasından çıkarılmış küçük bir sicil. Bir kayda tıklayın → <b>"Kaynağı aç"</b> ile karar ya da politikayı <b>e-postanın içinde birebir vurgulu</b> görün. Bazı kararlar <b>bir politikayı ihlal eder</b>; bazıları da eski kararı zincirde geçersiz kılar.</p>`,
  `<p class="dek">Bu <b>temsili değil</b>. Decdock motoru, Enron'un kamuya açık e-posta arşivi (FERC yayını) üzerinde çalıştırıldı — aşağıdaki her kayıt <b>gerçek bir e-postadaki cümleye</b> bağlı. Bir kayda tıklayın → <b>"Kaynağı aç"</b> ile gerçek alıntıyı görün. Hüküm değil; insanın doğrulayacağı <b>aday sinyal</b>.</p>
  <div class="proof-strip" aria-label="Enron proof summary">
    <div class="claim"><b>Ne oldu?</b> ${rawRecords} konsolide Enron kaydı içinden ${recordCount} kaynaklı kayıt gösteriliyor. ${rawSupersedes} aday supersede'den yalnız ${supersedeCount}'si gerçek tarih-farkı testini geçti; gerisi aynı-tarihli/sistem-işaretli eşleşmelerdi — sahte edge göstermiyoruz.</div>
    <div class="proof-metric"><b>${conflictCount}</b><span>Çelişki</span></div>
    <div class="proof-metric"><b>${supersedeCount}</b><span>Supersede</span></div>
    <div class="proof-metric"><b>${recordCount}</b><span>Kaynaklı kayıt</span></div>
  </div>`,
)
replaceOrThrow(
  `placeholder="Ara… (örn. iade, CFO, deploy, 500₺, ihlal)"`,
  `placeholder="Ara… (örn. VaR, DPR, DASH, $1M, MSA)"`,
)
replaceOrThrow(
  `    Gördüğünüz her satır <b>kaynağına bağlı</b> — uydurma yok, e-postadaki cümleye iner. Politikalar duran kural olarak ayrılır; ihlaller kırmızı görünür. Kendi <b>bitmiş bir projenizden ücretsiz örnek rapor</b> için: <b>pilot@decdock.com</b> · <a href="/">decdock.com</a>`,
  `    <b>Neden önemli?</b> Bu sayfa Decdock'un "doğruyu ilan ettiğini" değil, kamuya açık bir arşivde <b>kaynaklı aday hafıza</b> ve <b>dürüst drift sinyali</b> üretebildiğini gösterir; son kararı insan doğrular. Aynı motor, yalnızca bir <b>JSON tenant profili</b> ile enerji ticareti gibi farklı bir sektöre uygulandı. Ölçek notu: 250 mailden ${rawRecords} konsolide kayıt çıktı; burada ${sourceCount} kaynak thread'e bağlı ${recordCount} kayıt ve ${driftCount} sağlam drift edge gösteriliyor (${conflictCount}/${rawConflicts} conflict, ${supersedeCount}/${rawSupersedes} supersede). Kendi public/sanitized arşivinizle benzer bir pilot için: <b>pilot@decdock.com</b> · <a href="/enron-grafi/">Enron ağ görünümünü açın</a>`,
)
replaceOrThrow(
  `<p class="foot">Temsili/örnek veridir; gerçek bir şirketin verisi değildir. © 2026 Decdock</p>`,
  `<p class="foot">Enron kamuya açık FERC e-posta arşivi · Decdock motoru + tenant profili · aday sinyal, hüküm değil · © 2026 Decdock</p>`,
)
replaceOrThrow(
  `<div class="src-head">Kaynak e-posta</div>`,
  `<div class="src-head">Kaynak — Enron / FERC arşivi</div>`,
)
replaceOrThrow(
  `const FILTERS=[['all','Tümü'],['onayli','Onaylı karar'],['aday','İnceleme adayı'],['politika','Politika'],['violation','⚠ İhlal'],['chain','⛓ Zincirli']];`,
  `const FILTERS=[['all','Tümü'],['chain','Drift / zincir'],['onayli','Onaylı kayıt'],['aday','Aday sinyal'],['politika','Kural / politika']];`,
)

replaceRegexOrThrow(
  /function renderStats\(\)\{[\s\S]*?\n\}/,
  `function renderStats(){
  const onayli=DATA.filter(x=>x.st==='onayli'&&x.kind!=='politika').length, aday=DATA.filter(x=>x.st==='aday').length;
  const drift=DATA.filter(x=>x.chainTo!==undefined).length, politika=DATA.filter(x=>x.kind==='politika').length;
  document.getElementById('stats').innerHTML=
    \`<div class="stat s"><div class="n">\${onayli}</div><div class="l">Onaylı kayıt</div></div>\`+
    \`<div class="stat a"><div class="n">\${aday}</div><div class="l">Aday sinyal</div></div>\`+
    \`<div class="stat v"><div class="n">\${drift}</div><div class="l">Drift / zincir</div></div>\`+
    \`<div class="stat p"><div class="n">\${politika}</div><div class="l">Kural / politika</div></div>\`+
    \`<div class="stat k"><div class="n">\${Object.keys(SOURCES).length}</div><div class="l">Kaynak thread</div></div>\`+
    \`<div class="stat k"><div class="n">%100</div><div class="l">Kaynağa bağlı</div></div>\`;
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

writeFileSync(OUT, html, 'utf8')
console.log(`written ${OUT}`)
