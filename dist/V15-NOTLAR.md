# Anatomi Atlas v15

- Yakınlaştırdıktan sonra tek parmak/fare ile kaydırma modu, başa ve ayağa kaydırma düğmeleri. Kamera ile hedef birlikte taşınır; yakınlaştırma mesafesi korunur.
- Katman ayırmada yapı, taraf ve doku katmanına göre kararlı farklı yönler; iç içe merkez parçaları aynı yöne yığılmaz. Bu görsel ayırmadır, anatomik diseksiyon ölçümü değildir.
- Bağırsakları örten omentum/mezokolon varsayılan olarak gizlenir; Organ örtülerini göster kontrolüyle açılır. Örtüyü arayıp seçmek onu görünür kılar.
- Seçili yapı belirgin turkuaz renk ve ışıldayan materyalle vurgulanır. Sinir/damar/kemik bağlantılarının ayrı renkleri korunur.
- Türkçe, İngilizce, Almanca, İspanyolca ve Arapça arayüz, isimler ve açıklama sözlükleri paketle birlikte çevrimdışı gelir. Arapça sağdan sola düzen, Latin adında soldan sağa yön. Dil seçimi cihazda saklanır. Yerel ve Latince isimler aynı kaydı arar. Çevrilmemiş isimler özgün İngilizce adla, eksik yabancı açıklamalar İngilizce sözlükle gösterilir.
- Dil değişimi kişisel not taslağını değiştirmez; kullanıcı notu çeviri servisine gönderilmez. Çeviri hizmeti sadece geliştirme sırasında kamuya açık atlas metinlerini işlemek için kullanılmıştır. Klinik çeviriler uzman onayı bekler.
- Android/iOS Capacitor 8 projeleri, paket ikonları, tekrarlanabilir kurulum/derleme betikleri ve CI iş akışı.

## İçerik sınırları

3.370 model kaydı; 2.731 Latince eşleşme, 639 bekleyen kayıt. Klinik içerik: 353 özel, 123 ana yapı, 26 grup, 2.868 genel doku/sistem kaydı. Her parçaya özgü klinik açıklama ve bütün Latin eşleşmeleri tamamlanmış değildir. Yanlış Latin terim veya doğrulanmamış parçaya özel kayıp sonucu uydurulmaz.

Kadın üst gövde kasları ve kafatası gibi bazı bölgeler kaynakta eksiktir; 76 ek alt ekstremite kasının yerleşimi yaklaşık uyarlamadır. Gerçek fotoğraf hacmi sadece erkek göğüs bölgesindeki 160 kaynak düzlemini kapsar. Model yüzeyleriyle anatomik kayıt veya mikroskobik iç hacim değildir. Daha önceki kaynak, lisans ve klinik kapsam notları geçerlidir.

## Doğrulama

`npm test`: kamera kaydırma/zoom mesafesi, dokunma/fare modu, ayırma yönleri, örtü filtresi, beş dil/RTL/arama, kişisel notun korunması, İngilizce klinik geri dönüş kapsamı ve atlasın önceki seçim/kesit/öğrenme/kayıt/bağlantı akışları. Tarayıcıda telefon boyutu kontrolü fiziksel cihaz testi yerine geçmez. APK, AAB ve iOS imza durumları MOBILE-BUILD.md içinde açıklanır.

Marjinal arter düzeltmesi: erkek modelindeki abdominal damar koroner dolaşımdan ayrıldı. Kadın kaynağındaki aynı adlı kalp damarı için kolona ait Latin eşleşmesi kaldırıldı; kesin damar dalı doğrulanana kadar Latin adı bekleyen kayıt olarak gösterilir.
