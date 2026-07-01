// Real Decdock run — Enron public email archive (FERC release).
// Source: decdock-enron-moat.json (consolidate + drift). Quotes are verbatim.
const SOURCES = {
  'var': { sub:"Risk Policy & VaR Limits — August 2001", body:`ENRON — public email archive (FERC release)
Subject: "Policy and other items" / "RE: Policy and other items" / "FW: New product approvals"
File: ENR-DEC-001, ENR-DEC-002, ENR-EDGE-001 · 9 May / 16–17 August 2001

I believe the Bod approved a policy that had discretionary var in it even if the one presented did not. We need to modify the policy to include dis. var and have it be $50MM.

The BOD approved an aggregate of $150MM, with $50MM of discretionary VaR, plus the new policy which doesn't recognise the concept of discretionary VaR.

Pug's 'Big Buckets' are now as follows: US Gas $100MM US Elec $100MM Europe Gas & Elec $35MM

Europe are able to aggregate their positions, calculate VaR appropriately and report to Houston... committed to do it by May 10th` },

  'dpr': { sub:"Daily Position Report (DPR) — Signing Authority", body:`ENRON — public email archive (FERC release)
Subject: "Global Risk Management"
File: ENR-DEC-004 · 8 May 2000

Rick Buy and Jeff Skillling signed a memo designating John Lavorato (Western Hemishere) and John Sherriff (Eastern Hemisphere) as the responsible parties for signing the Daily Positiion Report

Please obtain Greg Whalley's approval for all DPR's prior to that date

Going forward, please coordinate with each as to their preferred method of designating approval.` },

  'dash': { sub:"DASH Deal Classification — RAC", body:`ENRON — public email archive (FERC release)
Subject: RE: DASH Classification - "Proceed - See Other RAC Comments"
File: ENR-DEC-006, ENR-DEC-023, ENR-DEC-025, ENR-DEC-026 · 13 September 2001

three categories are sufficient--if the issues are substantive, they should either result in an increase in the capital price and a 'Return below Capital Price' or a 'Do Not Proceed' recommendation.

Are you saying that you just want three DASH categories, i.e. 1) Proceed, 2) Do not Proceed and 3) Returns Below Capital Price with no category for Issues, RAC Comments, etc.

we will remove "See Other RAC Comments" from the DASH template and library as an ongoing classification option

in our review of our DASH recommendation vs. actual performance we found 36 DASHes that have been approved since late 1999` },

  'payment': { sub:"Payment Approval Thresholds", body:`ENRON — public email archive (FERC release)
Subject: "Updated - Approval Authorizations"
File: ENR-DEC-018 · 8 December 2000

If a payment is $1 million or greater and is supported by a contract, we only require an Accounting Director's signature.` },

  'hr': { sub:"HR Policy Scope — Severance / Vacation / Sick Pay", body:`ENRON — public email archive (FERC release)
Subject: RE: REVISED - Policy Changes
File: ENR-DEC-009 · 28 November 2001

the severance plan has not been adopted by all Enron entities domestically. Similarly, some Enron-owned companies have adopted their own vacation, sick pay, etc. So, we should be careful about the audience for these communications. I suggest getting with Rick Johnson on that issue.` },

  'msa': { sub:"IT & Back Office MSA — NETCO Assignment", body:`ENRON — public email archive (FERC release)
Subject: RE: IT & Back Office Service Agreements
File: ENR-DEC-011 · 2 January 2002

we will not be able to assign the M=SA's to NETCO without the customer's approval. To date, this has not occurred.` },

  'eogil': { sub:"EOGIL Sale — Board Action Item?", body:`ENRON — public email archive (FERC release)
Subject: RE: EOGIL sale to BG
File: ENR-DEC-012 · 24 January 2002

in October it was decided by Rick Buy and Pug Winokur that this was not a board action item` },

  'nyiso': { sub:"NYISO Stage 2 ICAP Manual", body:`ENRON — public email archive (FERC release)
Subject: Stage 2 Manual Add'l changes
File: ENR-DEC-015 · 17 July 2001

Attached are a few changed pages of the Stage 2 ICAP Manual, to be approved at the July 19 BIC meeting.` },

  'liquidity': { sub:"Liquidity Ratio — Thresholds and Definitions", body:`ENRON — public email archive (FERC release)
Subject: RE: Liquidity Ratio Calculation and Definitions in Policy
File: ENR-DEC-016 · 2 August 2001

CEO but leave 3.0 and 1.5 thresholds - if we need to change we'll change and then BOD can ratify as with other policy changes

Numerator from Global Finance, not Accounting. FAC and BC as previously defined

I think the PFCR definition is adequate If our position liquidity horizon is about 10 days it should be revised week` },

  'redrock': { sub:"Red Rock Expansion Station 4 — EPA Permit / Turbine", body:`ENRON — public email archive (FERC release)
Subject: RE: FW: Red Rock Expansion Station 4
File: ENR-DEC-017 · 21 November 2001

I have spoken to Roger Kohn, EPA permit engineer, about the possibility of not doing the turbine installation at station 4 only due to what you described as not enough market commitment. My plans are to hold off on making any decisions and have the EPA issue the station 4 permit.` },
};

const DATA = [
  {id:'var-policy',kind:'politika',st:'onayli',d:"Policy update: discretionary VaR = $50MM",o:"Rick Buy (CRO)",os:"policy",c:"high",date:'2001-08-17',sk:'var',hl:"I believe the Bod approved a policy that had discretionary var in it even if the one presented did not. We need to modify the policy to include dis. var and have it be $50MM.",chainTo:'var-agg',relType:'supersedes',chainLabel:"adds $50MM discretionary VaR, updating the prior-day definition"},
  {id:'var-agg',kind:'politika',st:'onayli',d:"Board limit $150MM — but the new policy doesn't recognize discretionary VaR",o:"BOD / Rick Buy",os:"policy",c:"high",date:'2001-08-16',sk:'var',hl:"The BOD approved an aggregate of $150MM, with $50MM of discretionary VaR, plus the new policy which doesn't recognise the concept of discretionary VaR.",chainTo:'var-buckets',relType:'conflicts',chainLabel:"$50MM discretionary VaR is approved, yet the policy doesn't recognize it — internal contradiction"},
  {id:'var-buckets',kind:'politika',st:'onayli',d:"Business-line VaR limits: US Gas/Elec $100MM, Europe $35MM",o:"Pug Winokur (RAC)",os:"policy",c:"high",date:'2001-08-16',sk:'var',hl:"Pug's 'Big Buckets' are now as follows: US Gas $100MM US Elec $100MM Europe Gas & Elec $35MM"},
  {id:'dpr-assign',kind:'karar',st:'onayli',d:"DPR signing authority: Lavorato (West) & Sherriff (East)",o:"Rick Buy & Jeff Skilling",os:"ratifier",c:"high",date:'2000-05-08',sk:'dpr',hl:"Rick Buy and Jeff Skillling signed a memo designating John Lavorato (Western Hemishere) and John Sherriff (Eastern Hemisphere) as the responsible parties for signing the Daily Positiion Report"},
  {id:'dpr-process',kind:'karar',st:'aday',d:"DPR approval method: to be coordinated with each executive",o:"Risk management",os:"extraction",c:"medium",date:'2000-05-08',sk:'dpr',hl:"Going forward, please coordinate with each as to their preferred method of designating approval.",r:"Method not yet finalized; each executive will state their preferred approval form — candidate signal.",chainTo:'dpr-before',relType:'supersedes',chainLabel:"replaces the old Whalley-approval procedure for the post-5-May period"},
  {id:'dpr-before',kind:'politika',st:'onayli',d:"DPRs before 5 May 2000: Greg Whalley approval required",o:"Greg Whalley (approver)",os:"policy",c:"high",date:'2000-05-08',sk:'dpr',hl:"Please obtain Greg Whalley's approval for all DPR's prior to that date"},
  {id:'dash-3cat',kind:'politika',st:'onayli',d:"DASH: 3 categories (Proceed / Return below Capital Price / Do Not Proceed)",o:"RAC",os:"policy",c:"high",date:'2001-09-13',sk:'dash',hl:"three categories are sufficient--if the issues are substantive, they should either result in an increase in the capital price and a 'Return below Capital Price' or a 'Do Not Proceed' recommendation."},
  {id:'dash-q',kind:'karar',st:'aday',d:"DASH categories questioned (naming/order differ)",o:"RAC (discussion)",os:"extraction",c:"medium",date:'2001-09-13',sk:'dash',hl:"Are you saying that you just want three DASH categories, i.e. 1) Proceed, 2) Do not Proceed and 3) Returns Below Capital Price with no category for Issues, RAC Comments, etc.",r:"Category names and ordering unsettled; open debate on a separate RAC Comments category.",chainTo:'dash-3cat',relType:'conflicts',chainLabel:"conflicts on category definition and ordering"},
  {id:'dash-remove',kind:'karar',st:'onayli',d:"'See Other RAC Comments' to be removed from the DASH template",o:"RAC",os:"ratifier",c:"high",date:'2001-09-13',sk:'dash',hl:"we will remove \"See Other RAC Comments\" from the DASH template and library as an ongoing classification option"},
  {id:'dash-review',kind:'karar',st:'aday',d:"DASH: 36 approved deals showed recommendation/performance mismatch",o:"RAC review",os:"extraction",c:"medium",date:'2001-09-13',sk:'dash',hl:"in our review of our DASH recommendation vs. actual performance we found 36 DASHes that have been approved since late 1999",r:"This is a risk/performance review signal, not by itself a new policy decision.",chainTo:'dash-3cat',relType:'references',chainLabel:"shows why the DASH classification policy was being reviewed"},
  {id:'pay-1m',kind:'politika',st:'onayli',d:"$1M+ payment + contract → only Accounting Director's signature",o:"Approval authorities (RAC)",os:"policy",c:"high",date:'2000-12-08',sk:'payment',hl:"If a payment is $1 million or greater and is supported by a contract, we only require an Accounting Director's signature."},
  {id:'hr-severance',kind:'politika',st:'onayli',d:"Severance/vacation/sick pay policies are not uniform across entities",o:"HR / Rick Johnson",os:"policy",c:"high",date:'2001-11-28',sk:'hr',hl:"the severance plan has not been adopted by all Enron entities domestically. Similarly, some Enron-owned companies have adopted their own vacation, sick pay, etc. So, we should be careful about the audience for these communications. I suggest getting with Rick Johnson on that issue."},
  {id:'msa-netco',kind:'politika',st:'onayli',d:"MSAs cannot be assigned to NETCO without customer approval",o:"IT & Back Office",os:"policy",c:"high",date:'2002-01-02',sk:'msa',hl:"we will not be able to assign the M=SA's to NETCO without the customer's approval. To date, this has not occurred."},
  {id:'eogil-board',kind:'karar',st:'onayli',d:"EOGIL sale was not a board action item",o:"Rick Buy & Pug Winokur",os:"ratifier",c:"high",date:'2002-01-24',sk:'eogil',hl:"in October it was decided by Rick Buy and Pug Winokur that this was not a board action item"},
  {id:'nyiso-icap',kind:'karar',st:'onayli',d:"NYISO Stage 2 ICAP Manual to go to July 19 BIC approval",o:"BIC",os:"ratifier",c:"high",date:'2001-07-17',sk:'nyiso',hl:"Attached are a few changed pages of the Stage 2 ICAP Manual, to be approved at the July 19 BIC meeting."},
  {id:'liq-threshold',kind:'politika',st:'onayli',d:"Liquidity Ratio thresholds remain 3.0 and 1.5; BOD can ratify changes",o:"CEO / BOD",os:"policy",c:"high",date:'2001-08-02',sk:'liquidity',hl:"CEO but leave 3.0 and 1.5 thresholds - if we need to change we'll change and then BOD can ratify as with other policy changes"},
  {id:'liq-numerator',kind:'politika',st:'onayli',d:"Liquidity numerator source is Global Finance, not Accounting",o:"Global Finance",os:"policy",c:"high",date:'2001-08-02',sk:'liquidity',hl:"Numerator from Global Finance, not Accounting. FAC and BC as previously defined"},
  {id:'liq-pfcr',kind:'karar',st:'aday',d:"PFCR definition adequate; 10-day horizon may require weekly revision",o:"Risk policy review",os:"extraction",c:"medium",date:'2001-08-02',sk:'liquidity',hl:"I think the PFCR definition is adequate If our position liquidity horizon is about 10 days it should be revised week",r:"This points to a policy-revision need; kept as candidate signal rather than finalized change."},
  {id:'redrock-permit',kind:'karar',st:'onayli',d:"Red Rock: obtain permit, hold turbine decision until market commitment",o:"Larry Campbell / Roger Kohn",os:"ratifier",c:"high",date:'2001-11-21',sk:'redrock',hl:"I have spoken to Roger Kohn, EPA permit engineer, about the possibility of not doing the turbine installation at station 4 only due to what you described as not enough market commitment. My plans are to hold off on making any decisions and have the EPA issue the station 4 permit."},
  {id:'var-europe',kind:'karar',st:'onayli',d:"Europe to aggregate positions and report VaR to Houston (May 10)",o:"Europe desk",os:"ratifier",c:"high",date:'2001-05-09',sk:'var',hl:"Europe are able to aggregate their positions, calculate VaR appropriately and report to Houston... committed to do it by May 10th"},
];
