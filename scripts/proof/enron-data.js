// Gerçek Decdock koşusu — Enron kamuya açık e-posta arşivi (FERC yayını).
// Kaynak: decdock-enron-moat.json (consolidate + drift). Alıntılar birebir gerçektir.
const SOURCES = {
  'var': { sub:"Risk Politikası & VaR Limitleri — Ağustos 2001", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: "Policy and other items" / "RE: Policy and other items" / "FW: New product approvals"
Dosya: ENR-DEC-001, ENR-DEC-002, ENR-EDGE-001 · 9 Mayıs / 16–17 Ağustos 2001

I believe the Bod approved a policy that had discretionary var in it even if the one presented did not. We need to modify the policy to include dis. var and have it be $50MM.

The BOD approved an aggregate of $150MM, with $50MM of discretionary VaR, plus the new policy which doesn't recognise the concept of discretionary VaR.

Pug's 'Big Buckets' are now as follows: US Gas $100MM US Elec $100MM Europe Gas & Elec $35MM

Europe are able to aggregate their positions, calculate VaR appropriately and report to Houston... committed to do it by May 10th` },

  'dpr': { sub:"Günlük Pozisyon Raporu (DPR) — İmza Yetkisi", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: "Global Risk Management"
Dosya: ENR-DEC-004 · 8 Mayıs 2000

Rick Buy and Jeff Skillling signed a memo designating John Lavorato (Western Hemishere) and John Sherriff (Eastern Hemisphere) as the responsible parties for signing the Daily Positiion Report

Please obtain Greg Whalley's approval for all DPR's prior to that date

Going forward, please coordinate with each as to their preferred method of designating approval.` },

  'dash': { sub:"DASH Deal Sınıflandırması — RAC", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: DASH Classification - "Proceed - See Other RAC Comments"
Dosya: ENR-DEC-006, ENR-DEC-023, ENR-DEC-025, ENR-DEC-026 · 13 Eylül 2001

three categories are sufficient--if the issues are substantive, they should either result in an increase in the capital price and a 'Return below Capital Price' or a 'Do Not Proceed' recommendation.

Are you saying that you just want three DASH categories, i.e. 1) Proceed, 2) Do not Proceed and 3) Returns Below Capital Price with no category for Issues, RAC Comments, etc.

we will remove "See Other RAC Comments" from the DASH template and library as an ongoing classification option

in our review of our DASH recommendation vs. actual performance we found 36 DASHes that have been approved since late 1999` },

  'payment': { sub:"Ödeme Onay Eşikleri", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: "Updated - Approval Authorizations"
Dosya: ENR-DEC-018 · 8 Aralık 2000

If a payment is $1 million or greater and is supported by a contract, we only require an Accounting Director's signature.` },

  'hr': { sub:"HR Politika Kapsamı — Severance / Vacation / Sick Pay", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: REVISED - Policy Changes
Dosya: ENR-DEC-009 · 28 Kasım 2001

the severance plan has not been adopted by all Enron entities domestically. Similarly, some Enron-owned companies have adopted their own vacation, sick pay, etc. So, we should be careful about the audience for these communications. I suggest getting with Rick Johnson on that issue.` },

  'msa': { sub:"IT & Back Office MSA — NETCO Devri", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: IT & Back Office Service Agreements
Dosya: ENR-DEC-011 · 2 Ocak 2002

we will not be able to assign the M=SA's to NETCO without the customer's approval. To date, this has not occurred.` },

  'eogil': { sub:"EOGIL Satışı — Board Action Item mı?", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: EOGIL sale to BG
Dosya: ENR-DEC-012 · 24 Ocak 2002

in October it was decided by Rick Buy and Pug Winokur that this was not a board action item` },

  'nyiso': { sub:"NYISO Stage 2 ICAP Manual", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: Stage 2 Manual Add'l changes
Dosya: ENR-DEC-015 · 17 Temmuz 2001

Attached are a few changed pages of the Stage 2 ICAP Manual, to be approved at the July 19 BIC meeting.` },

  'liquidity': { sub:"Liquidity Ratio — Eşikler ve Tanımlar", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: Liquidity Ratio Calculation and Definitions in Policy
Dosya: ENR-DEC-016 · 2 Ağustos 2001

CEO but leave 3.0 and 1.5 thresholds - if we need to change we'll change and then BOD can ratify as with other policy changes

Numerator from Global Finance, not Accounting. FAC and BC as previously defined

I think the PFCR definition is adequate If our position liquidity horizon is about 10 days it should be revised week` },

  'redrock': { sub:"Red Rock Expansion Station 4 — EPA Permit / Turbine", body:`ENRON — kamuya açık e-posta arşivi (FERC yayını)
Konu: RE: FW: Red Rock Expansion Station 4
Dosya: ENR-DEC-017 · 21 Kasım 2001

I have spoken to Roger Kohn, EPA permit engineer, about the possibility of not doing the turbine installation at station 4 only due to what you described as not enough market commitment. My plans are to hold off on making any decisions and have the EPA issue the station 4 permit.` },
};

const DATA = [
  {id:'var-policy',kind:'politika',st:'onayli',d:"Politika güncellemesi: discretionary VaR = $50MM",o:"Rick Buy (CRO)",os:"policy",c:"high",date:'2001-08-17',sk:'var',hl:"I believe the Bod approved a policy that had discretionary var in it even if the one presented did not. We need to modify the policy to include dis. var and have it be $50MM.",chainTo:'var-agg',relType:'supersedes',chainLabel:"$50MM discretionary VaR ekleyerek bir gün önceki tanımı günceller"},
  {id:'var-agg',kind:'politika',st:'onayli',d:"BOD limiti $150MM — ama yeni politika discretionary VaR tanımıyor",o:"BOD / Rick Buy",os:"policy",c:"high",date:'2001-08-16',sk:'var',hl:"The BOD approved an aggregate of $150MM, with $50MM of discretionary VaR, plus the new policy which doesn't recognise the concept of discretionary VaR.",chainTo:'var-buckets',relType:'conflicts',chainLabel:"$50MM discretionary VaR onaylı, ama politika kavramı tanımıyor — kendi içinde çelişki"},
  {id:'var-buckets',kind:'politika',st:'onayli',d:"İş kolu VaR limitleri: US Gas/Elec $100MM, Avrupa $35MM",o:"Pug Winokur (RAC)",os:"policy",c:"high",date:'2001-08-16',sk:'var',hl:"Pug's 'Big Buckets' are now as follows: US Gas $100MM US Elec $100MM Europe Gas & Elec $35MM"},
  {id:'dpr-assign',kind:'karar',st:'onayli',d:"DPR imza yetkisi: Lavorato (Batı) & Sherriff (Doğu)",o:"Rick Buy & Jeff Skilling",os:"ratifier",c:"high",date:'2000-05-08',sk:'dpr',hl:"Rick Buy and Jeff Skillling signed a memo designating John Lavorato (Western Hemishere) and John Sherriff (Eastern Hemisphere) as the responsible parties for signing the Daily Positiion Report"},
  {id:'dpr-process',kind:'karar',st:'aday',d:"DPR onay yöntemi: her iki yöneticiyle koordine edilecek",o:"Risk yönetimi",os:"extraction",c:"medium",date:'2000-05-08',sk:'dpr',hl:"Going forward, please coordinate with each as to their preferred method of designating approval.",r:"Yöntem henüz kesinleşmemiş; her yönetici tercih edeceği onay biçimini belirtecek — aday sinyal.",chainTo:'dpr-before',relType:'supersedes',chainLabel:"5 Mayıs sonrası için eski Whalley-onay prosedürünün yerini alır"},
  {id:'dpr-before',kind:'politika',st:'onayli',d:"5 Mayıs 2000 öncesi DPR'ler: Greg Whalley onayı şart",o:"Greg Whalley (onay mercii)",os:"policy",c:"high",date:'2000-05-08',sk:'dpr',hl:"Please obtain Greg Whalley's approval for all DPR's prior to that date"},
  {id:'dash-3cat',kind:'politika',st:'onayli',d:"DASH: 3 kategori (Proceed / Return below Capital Price / Do Not Proceed)",o:"RAC",os:"policy",c:"high",date:'2001-09-13',sk:'dash',hl:"three categories are sufficient--if the issues are substantive, they should either result in an increase in the capital price and a 'Return below Capital Price' or a 'Do Not Proceed' recommendation."},
  {id:'dash-q',kind:'karar',st:'aday',d:"DASH kategorileri sorgulanıyor (isim/sıra farkı)",o:"RAC (tartışma)",os:"extraction",c:"medium",date:'2001-09-13',sk:'dash',hl:"Are you saying that you just want three DASH categories, i.e. 1) Proceed, 2) Do not Proceed and 3) Returns Below Capital Price with no category for Issues, RAC Comments, etc.",r:"Kategori isim ve sıralaması netleşmemiş; RAC Comments için ayrı kategori tartışması açık.",chainTo:'dash-3cat',relType:'conflicts',chainLabel:"kategori tanım/sıralamasında çelişiyor"},
  {id:'dash-remove',kind:'karar',st:'onayli',d:"'See Other RAC Comments' DASH şablonundan kaldırılacak",o:"RAC",os:"ratifier",c:"high",date:'2001-09-13',sk:'dash',hl:"we will remove \"See Other RAC Comments\" from the DASH template and library as an ongoing classification option"},
  {id:'dash-review',kind:'karar',st:'aday',d:"DASH: 36 onaylı işlemde öneri-performans uyumsuzluğu bulundu",o:"RAC review",os:"extraction",c:"medium",date:'2001-09-13',sk:'dash',hl:"in our review of our DASH recommendation vs. actual performance we found 36 DASHes that have been approved since late 1999",r:"Bu bir risk/performans inceleme sinyali; tek başına yeni politika kararı değil.",chainTo:'dash-3cat',relType:'references',chainLabel:"DASH sınıflandırma politikasının neden gözden geçirildiğini gösterir"},
  {id:'pay-1m',kind:'politika',st:'onayli',d:"$1M+ ödeme + sözleşme → yalnız Muhasebe Müdürü imzası",o:"Onay yetkileri (RAC)",os:"policy",c:"high",date:'2000-12-08',sk:'payment',hl:"If a payment is $1 million or greater and is supported by a contract, we only require an Accounting Director's signature."},
  {id:'hr-severance',kind:'politika',st:'onayli',d:"Severance/vacation/sick pay politikaları tüm entity'lerde aynı değil",o:"HR / Rick Johnson",os:"policy",c:"high",date:'2001-11-28',sk:'hr',hl:"the severance plan has not been adopted by all Enron entities domestically. Similarly, some Enron-owned companies have adopted their own vacation, sick pay, etc. So, we should be careful about the audience for these communications. I suggest getting with Rick Johnson on that issue."},
  {id:'msa-netco',kind:'politika',st:'onayli',d:"MSA'lar müşteri onayı olmadan NETCO'ya devredilemez",o:"IT & Back Office",os:"policy",c:"high",date:'2002-01-02',sk:'msa',hl:"we will not be able to assign the M=SA's to NETCO without the customer's approval. To date, this has not occurred."},
  {id:'eogil-board',kind:'karar',st:'onayli',d:"EOGIL satışı board action item değil",o:"Rick Buy & Pug Winokur",os:"ratifier",c:"high",date:'2002-01-24',sk:'eogil',hl:"in October it was decided by Rick Buy and Pug Winokur that this was not a board action item"},
  {id:'nyiso-icap',kind:'karar',st:'onayli',d:"NYISO Stage 2 ICAP Manual 19 Temmuz BIC onayına gidecek",o:"BIC",os:"ratifier",c:"high",date:'2001-07-17',sk:'nyiso',hl:"Attached are a few changed pages of the Stage 2 ICAP Manual, to be approved at the July 19 BIC meeting."},
  {id:'liq-threshold',kind:'politika',st:'onayli',d:"Liquidity Ratio eşikleri 3.0 ve 1.5; değişirse BOD ratify eder",o:"CEO / BOD",os:"policy",c:"high",date:'2001-08-02',sk:'liquidity',hl:"CEO but leave 3.0 and 1.5 thresholds - if we need to change we'll change and then BOD can ratify as with other policy changes"},
  {id:'liq-numerator',kind:'politika',st:'onayli',d:"Liquidity numerator kaynağı Global Finance, Accounting değil",o:"Global Finance",os:"policy",c:"high",date:'2001-08-02',sk:'liquidity',hl:"Numerator from Global Finance, not Accounting. FAC and BC as previously defined"},
  {id:'liq-pfcr',kind:'karar',st:'aday',d:"PFCR tanımı yeterli; 10 günlük horizon varsa haftalık revizyon gerekebilir",o:"Risk policy review",os:"extraction",c:"medium",date:'2001-08-02',sk:'liquidity',hl:"I think the PFCR definition is adequate If our position liquidity horizon is about 10 days it should be revised week",r:"Bu ifade politika revizyon ihtiyacına işaret ediyor; kesinleşmiş değişiklik olarak değil aday sinyal olarak tutuldu."},
  {id:'redrock-permit',kind:'karar',st:'onayli',d:"Red Rock: permit alınsın, turbine kararı pazar taahhüdüne kadar beklesin",o:"Larry Campbell / Roger Kohn",os:"ratifier",c:"high",date:'2001-11-21',sk:'redrock',hl:"I have spoken to Roger Kohn, EPA permit engineer, about the possibility of not doing the turbine installation at station 4 only due to what you described as not enough market commitment. My plans are to hold off on making any decisions and have the EPA issue the station 4 permit."},
  {id:'var-europe',kind:'karar',st:'onayli',d:"Avrupa: pozisyonları toplayıp VaR'ı Houston'a raporlayacak (10 Mayıs)",o:"Avrupa masası",os:"ratifier",c:"high",date:'2001-05-09',sk:'var',hl:"Europe are able to aggregate their positions, calculate VaR appropriately and report to Houston... committed to do it by May 10th"},
];
