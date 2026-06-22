# Decdock Pilot Console v0

Bu dokuman, Decdock ana urununden bagimsiz gelistirilebilecek ilk "pilot baslatma ve rapor yonetimi" sistemini tarif eder.

Amac bugun AWS/GCP/on-prem entegrasyonu kurmak degil; ileride bu seceneklere baglanabilecek dogru veri modeli, akisi ve maliyet frenlerini simdiden kurmaktir.

## 1. Neyi Cozuyoruz?

Site uzerindeki "Karar Denetimi isteyin" aksiyonu sadece e-posta atmak yerine kontrollu bir pilot akisi baslatir.

Hedef:

- Sirket hesabi acilir.
- Admin e-posta dogrulamasindan gecer.
- Tek seferlik deneme kuponu tanimlanir.
- Kullanici dosya yukler.
- Sistem dosya boyutu, format, tahmini token ve tahmini LLM maliyetini hesaplar.
- Varsayilan maliyet siniri asilmiyorsa job admin onayina duser.
- Admin "baslat" demeden LLM/API cagrisi calismaz.
- Rapor hazir oldugunda kullanici panelden gorur veya indirir.

## 2. Temel Ilkeler

- Ilk mod `Managed Pilot` olur. Musteri kendi API key'ini girmez; LLM cagrilari server tarafinda Decdock secret'lari ile yapilir.
- AWS/GCP/customer-cloud/on-prem secenekleri simdilik calismaz; sadece musteri tercihi ve satis sinyali olarak kaydedilir.
- Otomatik rapor baslatma yoktur. Her rapor job'u admin onayindan gecer.
- Varsayilan ucretsiz deneme maliyet ust limiti: tahmini LLM maliyeti `1.50 USD`.
- Ozel kupon bu limiti artirabilir; sinirsiz kupon verilmez.
- Ham musteri verisi model egitimi veya genel urun kalibrasyonu icin kullanilmaz.
- Hata ayiklama veya kalite calismasi icin icerik incelemesi gerekirse acik izin, sure siniri ve audit log gerekir.

## 3. Kullanici Rolleri

`Account Owner`

- Sirket hesabini acar.
- Ilk pilot talebini baslatir.
- Dosya yukler.
- Veri hassasiyetini ve saklama tercihini secer.
- Rapor hazir olunca gorur/indirir.

`Company Admin`

- Kullanici davet eder.
- Kaynak kapsamlarini yonetir.
- Saklama suresi, gorunurluk ve deployment tercihini belirler.
- Rapor ve dosya silme aksiyonlarini gorebilir.

`Team Lead`

- Kendi alanindaki yeni karar adaylarini gorur.
- Sahipsiz karari kisiye veya role atayabilir.
- Celiskiyi cozer: hangi karar gecerli, hangisi superseded, hangisi review bekliyor.
- Birinden dogrulama isteyebilir.

`Decdock Admin`

- Yeni pilot taleplerini inceler.
- Tahmini maliyet, dosya boyutu, kupon ve hassasiyet durumunu gorur.
- Job'u baslatir, reddeder, ek bilgi ister veya dosyayi siler.
- Ozel kupon/limit override yapabilir.
- Kendi panelinden tek kullanimlik ozel kupon uretebilir.
- Ozel kupon icin harcama limiti, son kullanma tarihi ve kullanim amaci notu girer.

## 4. Pilot Akisi

1. Kullanici site uzerinden pilot baslatir.
2. Email dogrulama tamamlanir.
3. Sirket hesabi olusur.
4. Sistem hesaba tek kullanimlik deneme kuponu tanimlar.
5. Kullanici paket secmeden once veri kapsamini anlatir.
6. Kullanici dosya yukler.
7. Sistem preflight yapar:
   - Dosya formati uygun mu?
   - Toplam MB siniri asildi mi?
   - Dosya sayisi siniri asildi mi?
   - Zip icindeki dosya sayisi siniri asildi mi?
   - Tahmini karakter/token siniri asildi mi?
   - Tahmini LLM maliyeti `1.50 USD` ustunde mi?
8. Limit icindeyse job `awaiting_admin_approval` durumuna gecer.
9. Limit disindaysa job `requires_special_approval` durumuna gecer.
10. Decdock admin job'u onaylar.
11. Onaydan sonra rapor uretimi otomatik baslar.
12. Rapor uretilir.
13. Rapor musteri panelinden erisilebilir olur.
14. `rapor@decdock.com` dogrulanmis kullanici e-postasina rapor hazir bildirimini gonderir.
15. Varsayilan teslim e-postasi raporu ham ek olarak tasimaz; guvenli HTML/PDF indirme linki gonderir.
16. Ham veri secilen retention politikasina gore silinir.

## 5. Maliyet Kontrolu

Maliyet kontrolu MB siniri ile sinirli kalmaz. Her rapor icin tahmini LLM maliyeti hesaplanir.

Varsayilan kurallar:

- Model varsayimi: `claude-haiku-4-5`.
- Baz fiyat varsayimi: `1M input token = 1.00 USD`, `1M output token = 5.00 USD`.
- `hardMaxEstimatedCostUsd = 1.50`
- `defaultApprovalThresholdUsd = 1.20`
- Kalan `0.30 USD` sapma, tokenizasyon ve retry tamponu olarak ayrilir.
- Normal kupon bu siniri asamaz.
- Ozel kuponlarda `maxEstimatedCostUsd` ayrica tanimlanir.
- Admin override olmadan limit ustu job calismaz.
- Job basladiktan sonra da runtime cost guard bulunur; planlanan sinir asiliyorsa is durdurulur veya parcali calisma beklemeye alinir.
- Ilk pilotlarda ek dosyalari islenmez; sadece metin govdesi ve karar baglami alinir.
- 20-50 e-posta icin pratik baslangic limiti: `50 email`, `5 MB text-only upload` veya `1,000,000 estimated input token`, hangisi once dolarsa.
- HTML, quoted thread ve export overhead'i nedeniyle dosya MB'i ile token sayisi birebir ayni sayilmaz; nihai karar preflight token tahminiyle verilir.

Kavramsal alanlar:

```text
coupon.maxEstimatedCostUsd
coupon.hardMaxEstimatedCostUsd
coupon.defaultApprovalThresholdUsd
account.defaultMaxEstimatedCostUsd
job.estimatedCostUsd
job.approvedCostLimitUsd
job.actualCostUsd
job.estimatedInputTokens
job.estimatedOutputTokens
job.requiresAdminApproval
job.requiresSpecialApproval
```

Job durumlari:

```text
draft
uploaded
estimated
awaiting_admin_approval
requires_special_approval
approved
processing
report_ready
failed
cancelled
deleted
```

## 6. Kupon Modeli

Hesap acan kisiye tek seferlik deneme kuponu tanimlanabilir.

Decdock admin panelinde ayrica ozel kupon uretilebilir. Admin harcama limitini yazar; sistem tek kullanimlik, tahmin edilebilir ve audit log'a yazilan bir kod olusturur.

Kavramsal alanlar:

```text
coupon.code
coupon.kind
coupon.discountPercent
coupon.maxUses
coupon.maxUsesPerAccount
coupon.maxMb
coupon.maxEmails
coupon.maxFiles
coupon.maxEstimatedTokens
coupon.maxEstimatedCostUsd
coupon.generatedByAdminId
coupon.generationReason
coupon.allowedPlan
coupon.expiresAt
coupon.status
```

Kurallar:

- Kupon hesap basina bir kez kullanilir.
- Ayni e-posta/domain uzerinden abuse kontrolu yapilir.
- Ucretsiz kupon bile dosya/token/maliyet limitlerine tabidir.
- Ozel kupon admin panelinden uretilir ve varsayilan olarak tek kullanimliktir.
- Ozel kupon kodu ham sekilde log'lanmaz; sadece son 4 karakteri veya hash'i audit log'a yazilir.

## 6.1 Rapor Teslimi

Ilk teslim modeli:

- Rapor hem HTML hem PDF olarak uretilir.
- Rapor musteri panelinde gorulebilir.
- `rapor@decdock.com` dogrulanmis hesap e-postasina bildirim gonderir.
- E-postada varsayilan olarak guvenli rapor linki bulunur.
- Link sureli olur ve yetkili kullanici oturumu ister.
- Hassas veri riski nedeniyle PDF'i e-postaya eklemek varsayilan davranis olmaz.
- Uretimden once domain icin SPF, DKIM ve DMARC kayitlari hazirlanir.

## 7. Veri Guvenligi ve Kullanim Politikasi

Varsayilan vaat:

> Ham musteri verisini model egitimi veya genel urun kalibrasyonu icin kullanmayiz. Hata ayiklama veya kalite calismasi icin icerik incelemesi gerekirse, bunu yalniz acik izinle, sinirli sureyle ve kayit altina alarak yapariz.

Veri kategorileri:

`Ham musteri verisi`

- E-posta icerigi, toplanti notu, dosya metni, kaynak alintisi.
- Rapor uretimi disinda kullanilmaz.
- Retention politikasina gore silinir.

`Operasyonel metadata`

- Dosya boyutu, format, job suresi, hata tipi, token tahmini, parse basari/orani.
- Icerik icermiyorsa urun iyilestirme icin kullanilabilir.

`Kalite sinyali`

- Yanlis pozitif, eksik alan, belirsiz karar, owner attribution hatasi gibi etiketsel bilgi.
- Ham metin olmadan tutulabilir.

`Izinli debug/kalibrasyon ornegi`

- Varsayilan kapali.
- Musteri acik izin verirse kullanilir.
- Redakte/anonimlestirme tercih edilir.
- Sure sonunda silinir.
- Admin erisimi audit log'a duser.

## 8. Dosya ve Retention Kurallari

Ilk MVP icin desteklenebilecek formatlar:

```text
.txt
.md
.pdf
.docx
.eml
.mbox
.zip
```

Preflight kontrolleri:

- MIME/type ve uzanti uyumu.
- Toplam MB limiti.
- Dosya sayisi limiti.
- Zip icindeki dosya sayisi limiti.
- Tahmini metin uzunlugu.
- Tahmini token ve maliyet.
- Bos veya parse edilemeyen dosya kontrolu.

Retention secenekleri:

- `delete_after_report`
- `delete_after_7_days`
- `delete_after_30_days`
- `manual_review_required`

Her silme aksiyonu audit log'a yazilir.

## 9. Deployment Tercihi

Bugun calisan tek mod:

`managed_pilot`

- Decdock tarafinda calisir.
- Kisa sureli pilot rapor icindir.
- Admin onayli job modeli ile maliyet kontrolu saglanir.

Gelecek modlar:

`customer_cloud`

- Musterinin kendi cloud hesabi.
- Simdilik sadece tercih olarak kaydedilir.
- Ileride Terraform/CloudFormation/Kubernetes paketi ile gerceklesebilir.

`private_on_prem`

- Musterinin kendi sunucusu veya private cluster'i.
- Buyuk/hassas musteri sinyali icin opsiyon olarak tutulur.

## 10. Decdock ile Sonradan Birlesme Noktalari

Bu sistem Decdock motorundan bagimsiz gelisir; baglanti katmani sonra eklenir.

Kavramsal mapping:

```text
pilot_request -> tenant/workspace
upload -> raw source / import batch
report_job -> extraction run / processing job
report -> digest/report artifact
team_lead_action.assign_owner -> claim owner update
team_lead_action.resolve_conflict -> review item resolution / supersession
team_lead_action.request_confirmation -> confirmation question
audit_log -> governance/audit event
```

Baslangicta bu mapping mock data ile calisabilir. Decdock motoru hazir oldugunda her action icin API veya job adapter eklenir.

## 11. MVP Scope

V0 icinde:

- Email dogrulama.
- Sirket hesabi.
- Tek seferlik kupon.
- Admin panelinden tek kullanimlik ozel kupon uretimi.
- Dosya yukleme.
- Preflight maliyet/dosya kontrolu.
- Admin onay ekrani.
- Admin onayindan sonra otomatik rapor uretimi.
- Rapor status ekrani.
- HTML ve PDF rapor uretimi.
- `rapor@decdock.com` ile dogrulanmis e-postaya guvenli rapor linki gonderimi.
- Security/usage consent metni.
- Audit log temeli.

## 12. Prototype Implementation

Panel ayrimi:

```text
Internal ops panel:
/ops/
/ops/login
/ops/recover

Customer app:
/app/login
/app/register
/app/recover
/app/o/:orgId
/app/o/:orgId/reports/:reportId
/app/o/:orgId/uploads/:uploadId
/app/o/:orgId/settings
/app/o/:orgId/access
```

`/ops/` musterinin gorecegi alan degildir. Decdock tarafinda operasyon, destek, kupon, maliyet, job, rapor teslimi, veri silme ve audit isleri icin ayrilir.

`/app/o/:orgId/...` musteri panelidir. Musteri once workspace paneline girer; rapor, yukleme, ayar ve erisim kaynaklari bu panelin icinden acilir. Org scope icinde opaque ID'lerle calisir. Ornek:

```text
/app/o/demo-org
/app/o/demo-org/reports/rep_demo_001
```

Route prensibi:

- Marketing site ve app route'lari birbirine karismaz.
- Internal route `ops` namespace'inde kalir.
- Customer route org/workspace scope ile baslar.
- Kaynaklar resource type + opaque ID ile acilir.
- Numeric sirali ID yerine `org_`, `rep_`, `job_`, `cpn_`, `upl_` gibi prefix'li ID'ler kullanilir.

Bu route'lar gercek backend veya LLM cagrisi yapmaz. Simdilik front-end state ile su davranislari gosterir:

- Ops panelinde tek kullanimlik ozel kupon uretilir.
- Ops kullanicisi harcama limiti ve kullanim notu girer.
- Pilot preflight email sayisi, text MB, estimated input/output token ve tahmini Haiku maliyetini hesaplar.
- Default onay esigi `1.20 USD`, hard deneme limiti `1.50 USD` olarak gosterilir.
- Admin onayi verilince rapor job'unun otomatik basladigi ve `rapor@decdock.com` ile guvenli HTML/PDF linki gonderilecegi simule edilir.
- Customer paneli genel bakis, raporlar, yuklemeler, ayarlar, erisim tokeni ve HTML/PDF indirme aksiyonlarini simule eder.
- Internal ve customer prototype sayfalari `noindex, nofollow` olarak prerender edilir.

## 13. Auth ve Erişim Modeli

Temel ayrim:

- Decdock ops kullanicisi ile musteri kullanicisi ayni giris kapisini kullanmaz.
- Ops tarafi internal control plane'dir.
- Customer tarafi workspace/app'tir.

Ops girisi:

```text
/ops/login
```

V0 ops girisi:

- E-posta.
- Sifre.
- Ops token / ikinci anahtar.
- Kurtarma: `/ops/recover`.
- 2FA/passkey zorunlulugu post-MVP ama tasarimda yer tutar.

Customer kayit:

```text
/app/register
```

V0 customer kaydi:

- Musteri sadece e-posta ile pilot hesabi baslatir.
- E-posta dogrulanmadan workspace veya rapor acilmaz.
- E-posta dogrulamasindan sonra rapor erisim tokeni uretilir.
- Erisim tokeni e-posta tek basina ele gecerse rapora girilemesin diye ikinci anahtar gibi davranir.
- Hassas pilotlarda token ayni e-postada gonderilmez; ops panelinden uretilip ayri kanaldan paylasilir veya sirket adminine tek seferlik gosterilir.

Customer girisi:

```text
/app/login
```

V0 customer girisi:

- E-posta.
- Workspace erisim tokeni.
- Sifre yoktur.
- "Sifremi unuttum" yerine "Tokenimi kaybettim" akisi vardir.
- Basarili giris kullaniciyi rapor detayina degil, `/app/o/:orgId` musteri paneline goturur.

Token kurtarma:

```text
/app/recover
```

Kurallar:

- Ekran hesap var/yok bilgisini soylemez.
- Token yenileme istegi eski tokeni iptal edecek sekilde tasarlanir.
- Hassas raporlar icin token yenileme ops onayina dusebilir.
- Token ham hali veritabaninda tutulmaz; hash'i tutulur.
- Her token uretimi, iptali ve kullanimi audit log'a yazilir.
- Login, register ve recover cevaplari generic olur; hesap varligi disari sizdirilmaz.

V0 disinda:

- Gercek odeme entegrasyonu.
- Customer-cloud otomatik kurulum.
- On-prem paket.
- Canli Slack/Teams connector.
- Tam self-serve LLM processing.
- Sinirsiz ucretsiz deneme.
- Admin 2FA zorunlulugu.
- PDF raporun e-postaya attachment olarak eklenmesi.

## 14. Karara Baglananlar

- Ucretsiz kupon ilk etapta `claude-haiku-4-5` maliyet varsayimina gore hesaplanir.
- Ucretsiz pilot icin pratik limit `50 email`, `5 MB text-only upload`, `1,000,000 estimated input token` veya `1.20 USD estimated cost`, hangisi once dolarsa.
- Hard maliyet siniri `1.50 USD`; `0.30 USD` tampon olarak ayrilir.
- Rapor hem HTML hem PDF uretilir.
- Ilk e-posta dogrulamasi basit tutulur; magic-link veya tek kullanimlik kod yeterlidir.
- 2FA ilk gunde zorunlu degildir; admin 2FA post-MVP guvenlik adimi olarak planlanir.
- Rapor uretimi admin onayindan sonra otomatik baslar.
- Rapor bildirimi `rapor@decdock.com` uzerinden dogrulanmis hesap e-postasina gider.
- Musteri kaydi sifresiz baslar; e-posta dogrulama + ayri erisim tokeni kullanilir.
- Ops girisi customer girisinden ayridir; ops icin sifre + ikinci anahtar tasarlanir.

## 15. Acik Kararlar

- Magic-link mi, tek kullanimlik kod mu daha hizli uygulanacak?
- HTML rapor web view olarak mi sunulacak, yoksa statik HTML artifact olarak mi indirilecek?
- Ozel kupon icin maksimum manuel limit ilk versiyonda kac USD olacak?
- Rapor linki kac gun gecerli olacak?
- Duyarli veri secen kullanici icin e-posta bildirim metni ne kadar detay gosterecek?
- Musteri tokeni ilk pilotta hangi ayri kanaldan verilecek?
- Ops ikinci anahtari ilk etapta TOTP mi, passkey mi, manuel recovery token mi olacak?
