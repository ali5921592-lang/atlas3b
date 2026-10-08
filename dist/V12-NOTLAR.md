# Anatomi Atlası v12 — görünüm ve kesit kapsamı

- Dört araç bölümü, mobil alt menü, açılır yapı bilgisi ve klavye ile sekme/arama kontrolü.
- Vücutta / Tek yapı / Bağlantılar görünümü; bağlantı verisi bulunmayan yapılar açıkça belirtilir.
- Kasları örten fasya varsayılan olarak gizli; Görünüm ve saydamlık altında açılabilir. Tensor fasciae latae kası gizlenmez.
- Yumuşak kamera odaklama ve azaltılmış hareket tercihi desteği.
- Geometri yönünden türetilmiş temsili kas lifleri ve doğal renkler. Yeni yüksek çözünürlüklü anatomi modeli eklenmedi.
- Dokunulan noktadan geçen düzlem; aksiyel, koronal, sagittal, eğik ve iki düzlem arası dilim.
- Model kesitindeki boşluklar kaynak geometriden korunur. Kemik kenarı, gözenekler ve kas lifleri temsili desenlerdir; ölçülmüş histoloji değildir.
- Gerçek fotoğraf hacminde serbest eğik kesit: fiziksel milimetre ölçeğinde üç doğrusal interpolasyon. Kaynak yalnızca erkek göğüs bölgesi, 384×228×160 voksel. Tüm vücut veya kadın hacmi değildir. GLB modeline kayıtlı/hizalı değildir.
- Kadın modeli ve bağlantı açıklamalarının mevcut kapsamı korunmuştur; eksiksiz insan anatomisi iddiası yoktur.

## Araştırma kaynakları
- NLM Visible Human Project: https://www.nlm.nih.gov/research/visible/visible_human.html
- OpenStax, Skeletal Muscle: https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle
- OpenStax, Bone Structure: https://openstax.org/books/anatomy-and-physiology-2e/pages/6-3-bone-structure

## Doğrulama
`work/qa/check-v12.mjs`: arama, tek yapı/bağlantı geçişi, kadın/erkek kapsamı, notlar, favoriler, kayıtlı görünüm, ders ve sekmeler.
`work/qa/check-v12-sections.mjs`: eğik hacim interpolasyonu, hacim dışı düzlem, lif yönü ve boşluk maskesi.
`work/qa/check-v12-geometry.mjs`: kesit alanı, iç boşluk, dönüşmüş geometri, 26 kas parçasının bağlantıları ve hareket dönüşümleri.

Çalıştırma: Node.js kurulu bilgisayarda BASLAT.cmd. HTML dosyasını doğrudan açmak yerine http://127.0.0.1:5173/ adresini kullanın.
