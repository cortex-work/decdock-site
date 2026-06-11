export default function PilotCTA() {
  return (
    <section id="contact" className="section-band py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="page-panel-dark relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.14),transparent_72%)]" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(161,118,78,0.1)] blur-3xl" />

          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
            Nasıl başlıyoruz
          </div>

          <h2 className="mx-auto mb-5 max-w-[16ch] font-display text-[40px] font-[600] leading-[1.08] tracking-[-0.03em] text-white">
            İlk adım kurulum değil: Karar Denetimi raporu.
          </h2>

          <p className="mx-auto mb-10 max-w-[42rem] text-[17px] leading-[1.8] text-[rgba(239,230,220,0.84)]">
            Bitmiş bir projenizin yazışma dilimini paylaşın; bir hafta içinde o projenin
            karar sicilini rapor olarak teslim edelim. Rapor işinize yaramazsa orada
            biter — yararsa sürekli halini konuşuruz.
          </p>

          <div className="mx-auto mb-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Girdi
              </div>
              <div className="text-[15px] font-semibold text-white">
                Bitmiş bir projenin 20–50 e-postası
              </div>
            </div>

            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Çıktı
              </div>
              <div className="text-[15px] font-semibold text-white">
                Karar sicili: karar, onaylayan, tarih, alıntı
              </div>
            </div>

            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Süre
              </div>
              <div className="text-[15px] font-semibold text-white">
                1 hafta — kurulum ve entegrasyon yok
              </div>
            </div>
          </div>

          <a
            href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
            className="inline-flex items-center justify-center rounded-[0.9rem] border border-[rgba(255,247,240,0.18)] bg-[rgba(250,244,237,0.96)] px-8 py-3.5 text-[14px] font-semibold text-[var(--brand)] shadow-[0_16px_30px_rgba(33,26,21,0.16)] transition hover:-translate-y-[1px] hover:bg-[rgba(252,246,240,1)]"
          >
            Karar Denetimi isteyin — pilot@decdock.com
          </a>

          <p className="mt-7 text-[13px] text-[rgba(210,195,180,0.74)]">
            Veriniz yalnız rapor üretimi için kullanılır, teslim sonrası imha edilir ve
            yazılı olarak teyit edilir. Decdock izleme yapmaz; yalnız sizin seçtiğiniz
            dilimi görür.
          </p>
        </div>
      </div>
    </section>
  )
}
