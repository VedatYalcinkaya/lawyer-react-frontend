import { FiUsers, FiHome, FiBriefcase, FiClipboard, FiBookOpen, FiAlertCircle, FiShield, FiFileText, FiKey, FiDollarSign, FiFile } from 'react-icons/fi';

// Tüm uzmanlık alanları verilerini içeren obje
const workAreasData = {
  "aile": {
    id: "aile",
    title: "Aile Hukuku",
    description: "Türk Medeni Kanunu ve ilgili mevzuatlar çerçevesinde aile kurumunu ilgilendiren her türlü hukuki süreçte yanınızdayız. Aile hukuku, kişiler arasındaki aile ilişkilerinden doğan hakları ve yükümlülükleri düzenleyen hukuk dalıdır.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745325551/ChatGPT_Image_22_Nis_2025_15_38_56_sknkss.png",
    iconComponent: FiUsers,
    hizmetler: [
      {
        title: "Boşanma Davaları",
        description: "Anlaşmalı ve çekişmeli boşanma süreçlerinde hukuki danışmanlık ve dava takibi hizmeti sunuyoruz. Müvekkillerimizin haklarını en iyi şekilde savunarak, sürecin en az hasarla atlatılmasını sağlıyoruz.",
      },
      {
        title: "Velayet ve Kişisel İlişki Tesisi",
        description: "Çocuğun üstün yararını gözeterek velayet ve kişisel ilişki tesisi davalarında uzman hukuki destek sağlıyoruz. Çocukların sağlıklı gelişimini destekleyen adil çözümler üretiyoruz.",
      },
      {
        title: "Nafaka Davaları",
        description: "Tedbir, iştirak ve yoksulluk nafakası taleplerinde müvekkillerimizin haklarını koruyoruz. Adil ve hakkaniyete uygun nafaka miktarlarının belirlenmesi için mücadele ediyoruz.",
      },
      {
        title: "Mal Rejimi ve Mal Paylaşımı",
        description: "Edinilmiş mallara katılma rejimi kapsamında mal paylaşımı davalarında uzman hukuki destek sağlıyoruz. Müvekkillerimizin malvarlığı haklarını en üst düzeyde koruyoruz.",
      },
      {
        title: "Nişanın Bozulması",
        description: "Nişanın bozulması durumunda maddi ve manevi tazminat talepleri konusunda hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      },
      {
        title: "Evlat Edinme Süreçleri",
        description: "Evlat edinme süreçlerinde gerekli hukuki prosedürlerin takibi ve danışmanlık hizmeti veriyoruz. Yeni ailelerin kurulmasında güvenilir rehberlik sağlıyoruz.",
      }
    ],
    yaklasim: [
      "Aile ilişkilerinin hassasiyetini gözeten uzman yaklaşım",
      "Çocukların üstün yararını her zaman ön planda tutan çözümler",
      "Müvekkillerimizin maddi ve manevi haklarının korunması",
      "Süreçlerin psikolojik ve duygusal yönlerini dikkate alan empati"
    ],
    sikSorulanSorular: [
      {
        soru: "Anlaşmalı boşanma süreci ne kadar sürer?",
        cevap: "Anlaşmalı boşanma davaları, tarafların tüm konularda anlaşmış olması durumunda genellikle tek celsede sonuçlanır. Bu süreç, mahkemelerin iş yoğunluğuna bağlı olarak ortalama 1-3 ay içerisinde tamamlanabilir."
      },
      {
        soru: "Çekişmeli boşanma davası açmak için hangi belgelere ihtiyacım var?",
        cevap: "Çekişmeli boşanma davası açmak için evlilik cüzdanı fotokopisi, nüfus kayıt örneği, delillere ilişkin belgeler (varsa doktor raporları, tanık beyanları, mesaj içerikleri vb.) gerekmektedir."
      },
      {
        soru: "Velayet kararı daha sonra değiştirilebilir mi?",
        cevap: "Evet, çocuğun üstün yararının gerektirdiği durumlarda, velayetin değiştirilmesi mümkündür. Çocuğun yaşam koşullarında veya ebeveynlerin durumunda önemli değişiklikler olması halinde mahkeme kararıyla velayet değiştirilebilir."
      }
    ],
    avukatYorumu: "Aile hukuku alanında, müvekkillerimizin hassasiyetlerini göz önünde bulundurarak, onların haklarını en iyi şekilde korumayı hedefliyoruz."
  },

  "gayrimenkul": {
    id: "gayrimenkul",
    title: "Gayrimenkul Hukuku",
    description: "Gayrimenkul alım-satım, kira, imar, tapu ve kadastro işlemleri gibi gayrimenkul hukukunun tüm alanlarında uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    iconComponent: FiHome,
    hizmetler: [
      {
        title: "Gayrimenkul Alım-Satım İşlemleri",
        description: "Gayrimenkul alım-satım süreçlerinde hukuki danışmanlık ve sözleşme hazırlığı hizmetleri sağlıyoruz. Tapu devir işlemlerinin güvenli bir şekilde gerçekleştirilmesini temin ediyoruz.",
      },
      {
        title: "Kira Hukuku",
        description: "Kira sözleşmelerinin hazırlanması, kira uyuşmazlıkları, tahliye ve kira tespit davalarında uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "İmar Hukuku",
        description: "İmar planları, yapı ruhsatları, imar uygulamaları ve kamulaştırma süreçlerinde hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      },
      {
        title: "Kat Mülkiyeti Uyuşmazlıkları",
        description: "Kat mülkiyeti kanunu kapsamında ortak alanların kullanımı, gider paylaşımı, yönetim planı değişikliği gibi konularda hukuki danışmanlık ve dava takibi hizmetleri veriyoruz.",
      },
      {
        title: "Tapu İptal ve Tescil Davaları",
        description: "Tapuda hatalı veya hileli işlemlerin düzeltilmesi için tapu iptal ve tescil davalarında uzman hukuki destek sağlıyoruz.",
      }
    ],
    yaklasim: [
      "Gayrimenkul işlemlerinde detaylı inceleme ve risk analizi",
      "Müvekkillerimizin mülkiyet haklarının en üst düzeyde korunması",
      "İmar ve yapı mevzuatına uygun, güvenli yatırım stratejileri",
      "Gayrimenkul uyuşmazlıklarında alternatif çözüm yöntemlerinin değerlendirilmesi"
    ],
    sikSorulanSorular: [
      {
        soru: "Tapu devri sırasında nelere dikkat edilmelidir?",
        cevap: "Tapu devri öncesinde gayrimenkulün imar durumu, üzerindeki şerhler ve beyanlar, takyidatlar, vergi borçları, aidat borçları gibi konuların araştırılması gerekmektedir. Ayrıca, satış vaadi sözleşmesi ve tapu devir sözleşmesinin içeriği dikkatle incelenmelidir.",
      },
      {
        soru: "Kiracı tahliye edilebilir mi ve hangi durumlarda?",
        cevap: "Kiracı, kira bedelini ödememe, kiralananı kötü kullanma, tahliye taahhüdüne uygun davranmama gibi sebeplerle veya malikin ihtiyacı, yeniden inşa ve imar gibi sebeplerle tahliye edilebilir. Bu süreçler TBK'da belirtilen şartlara uygun olarak yürütülmelidir.",
      },
      {
        soru: "Kaçak yapı durumunda hangi hukuki yollar izlenebilir?",
        cevap: "Kaçak yapılar için öncelikle yapı kayıt belgesi alınıp alınamayacağı değerlendirilmelidir. Eğer mümkün değilse, imar barışı gibi uygulamalardan yararlanma imkanı araştırılabilir. Ayrıca, yıkım kararına karşı idari yargı yoluna başvurulabilir.",
      }
    ],
    avukatYorumu: "Gayrimenkul hukuku alanında, müvekkillerimizin yatırımlarını korumak ve uyuşmazlıkları en kısa sürede çözüme kavuşturmak için titizlikle çalışıyoruz."
  },

  "ticaret": {
    id: "ticaret",
    title: "Ticaret Hukuku",
    description: "Şirketler hukuku, ticari sözleşmeler, rekabet hukuku ve fikri mülkiyet haklarını kapsayan ticaret hukukunun tüm alanlarında profesyonel hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    iconComponent: FiBriefcase,
    hizmetler: [
      {
        title: "Şirket Kuruluşu ve Birleşmeleri",
        description: "Limited şirket, anonim şirket ve diğer ticari işletmelerin kuruluş işlemleri, şirket birleşmeleri, bölünmeleri ve tür değişikliklerinde hukuki danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Ticari Sözleşmeler",
        description: "Bayilik, distribütörlük, franchise, tedarik ve diğer ticari sözleşmelerin hazırlanması, müzakeresi ve uygulanması süreçlerinde uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Rekabet Hukuku",
        description: "Haksız rekabet, rekabeti sınırlayıcı anlaşmalar ve hakim durumun kötüye kullanılması gibi rekabet hukuku konularında danışmanlık ve dava takibi hizmetleri veriyoruz.",
      },
      {
        title: "Fikri Mülkiyet Hakları",
        description: "Marka, patent, tasarım ve telif hakları konularında tescil, lisanslama ve hak ihlallerine karşı koruma sağlıyoruz.",
      },
      {
        title: "Ticari Uyuşmazlıkların Çözümü",
        description: "Ticari ilişkilerden kaynaklanan uyuşmazlıkların çözümünde arabuluculuk, tahkim ve dava yollarıyla müvekkillerimizin hakları için mücadele ediyoruz.",
      }
    ],
    yaklasim: [
      "Ticari hayatın dinamiklerini gözeten pratik çözümler",
      "Risk yönetimi odaklı hukuki danışmanlık",
      "İş geliştirme ve büyüme stratejilerine uygun hukuki yapılandırma",
      "Uyuşmazlıkların işletme çıkarları doğrultusunda ve iş ilişkilerini koruyacak şekilde çözümlenmesi"
    ],
    sikSorulanSorular: [
      {
        soru: "Şirket kuruluşunda hangi şirket türü tercih edilmelidir?",
        cevap: "Şirket türü seçiminde sermaye yapısı, ortak sayısı, faaliyet alanı, vergi avantajları ve sorumluluk sınırları gibi faktörler değerlendirilmelidir. Limited şirket ve anonim şirket en yaygın tercih edilen türlerdir, ancak her işletmenin ihtiyacına göre farklı bir tür daha uygun olabilir.",
      },
      {
        soru: "Ticari sözleşmelerde nelere dikkat edilmelidir?",
        cevap: "Ticari sözleşmelerde tarafların hak ve yükümlülükleri, ödeme koşulları, teslimat şartları, süre, fesih koşulları, uyuşmazlık çözüm yöntemleri, gizlilik hükümleri ve mücbir sebep halleri gibi konuların açıkça düzenlenmesi gerekmektedir.",
      },
      {
        soru: "Haksız rekabet halinde hangi yaptırımlar uygulanır?",
        cevap: "Haksız rekabet halinde, haksız rekabetin tespiti, men'i, haksız rekabet neticesinde oluşan maddi durumun ortadan kaldırılması, maddi ve manevi tazminat ile kazanç devri gibi yaptırımlar talep edilebilir. Bazı hallerde cezai yaptırımlar da söz konusu olabilir.",
      }
    ],
    avukatYorumu: "Ticaret hukuku alanında, işletmelerin büyümesi ve ticari hedeflerine ulaşması için hukuki riskleri minimize eden stratejik danışmanlık sunuyoruz."
  },
  
  "is": {
    id: "is",
    title: "İş Hukuku",
    description: "İşçi-işveren ilişkilerinin tüm aşamalarında, iş sözleşmesi, işe iade, kıdem ve ihbar tazminatı, iş kazaları ve meslek hastalıkları gibi konularda uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    iconComponent: FiClipboard,
    hizmetler: [
      {
        title: "İş Sözleşmeleri",
        description: "Belirli/belirsiz süreli iş sözleşmeleri, rekabet yasağı sözleşmeleri, gizlilik sözleşmeleri ve yönetici sözleşmelerinin hazırlanması ve müzakeresinde uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "İşe İade Davaları",
        description: "Haksız fesih durumlarında işe iade davaları açılması ve takibi konusunda uzmanlaşmış hukuki hizmet sunuyoruz.",
      },
      {
        title: "Tazminat Davaları",
        description: "Kıdem tazminatı, ihbar tazminatı, kötüniyet tazminatı, ayrımcılık tazminatı ve diğer işçilik alacakları için hukuki danışmanlık ve dava takibi hizmetleri veriyoruz.",
      },
      {
        title: "İş Kazaları ve Meslek Hastalıkları",
        description: "İş kazaları ve meslek hastalıklarında işveren sorumluluğu, SGK rücu davaları ve maddi-manevi tazminat taleplerinde uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Toplu İş Hukuku",
        description: "Sendikalar, toplu iş sözleşmeleri, grev ve lokavt konularında işçi ve işveren taraflarına hukuki danışmanlık hizmetleri sunuyoruz.",
      }
    ],
    yaklasim: [
      "İş hukukunun işçi ve işveren dengesini gözeten uygulanması",
      "Uyuşmazlıkların uzlaşma yoluyla çözümüne öncelik veren yaklaşım",
      "İş ilişkilerinde hukuki riskleri önceden tespit eden önleyici danışmanlık",
      "İş hukuku mevzuatındaki güncel değişiklikleri takip eden dinamik hizmet"
    ],
    sikSorulanSorular: [
      {
        soru: "İşçi hangi durumlarda haklı fesih yapabilir?",
        cevap: "İşçi, sağlık sebepleri, ahlak ve iyiniyet kurallarına uymayan haller (ücretin ödenmemesi, taciz, mobbing vb.) ve zorlayıcı sebeplerle iş sözleşmesini haklı nedenle feshedebilir. Bu durumda kıdem tazminatına hak kazanır.",
      },
      {
        soru: "İşe iade davası açma süresi ne kadardır?",
        cevap: "İşçi, fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurmalıdır. Arabuluculuk sürecinden anlaşma sağlanamadan sonuçlanması halinde, son tutanağın düzenlendiği tarihten itibaren 2 hafta içinde işe iade davası açılmalıdır.",
      },
      {
        soru: "İş kazasında işverenin sorumluluğu nedir?",
        cevap: "İşveren, iş sağlığı ve güvenliği önlemlerini almak, çalışanları bilgilendirmek ve eğitmek, gerekli denetimleri yapmak ve riskleri ortadan kaldırmakla yükümlüdür. Bu yükümlülüklere aykırılık halinde, kazadan doğan maddi ve manevi zararlardan sorumlu tutulabilir.",
      }
    ],
    avukatYorumu: "İş hukuku alanında, hem işçilerimizin haklarını korumak hem de işverenlerimizin hukuki risklerini yönetmek için dengeli ve adil çözümler üretiyoruz."
  },

  "idare": {
    id: "idare",
    title: "İdare Hukuku",
    description: "Kamu kurum ve kuruluşlarıyla olan uyuşmazlıklar, idari işlem ve eylemlere karşı iptal ve tam yargı davaları, kamulaştırma ve imar hukuku alanlarında uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    iconComponent: FiBookOpen,
    hizmetler: [
      {
        title: "İdari İşlem ve Eylemler",
        description: "İdari işlemlerin iptali, idari eylemlerden kaynaklanan tam yargı davaları ve idari başvurular konusunda uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Kamulaştırma Davaları",
        description: "Kamulaştırma işlemlerine karşı iptal davaları, kamulaştırmasız el atma davaları ve kamulaştırma bedelinin artırılması davalarında müvekkillerimizin haklarını koruyoruz.",
      },
      {
        title: "İmar Hukuku Uyuşmazlıkları",
        description: "İmar planları, yapı ruhsatları, imar uygulamaları ve yapı kullanma izinleri ile ilgili uyuşmazlıklarda hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      },
      {
        title: "Kamu İhale Hukuku",
        description: "İhale süreçleri, şikayet ve itirazen şikayet başvuruları ile ihale işlemlerinin iptali davalarında uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Memur Hukuku",
        description: "Kamu görevlileri ile ilgili disiplin soruşturmaları, görevde yükselme, atama, nakil ve diğer özlük haklarına ilişkin uyuşmazlıklarda hukuki danışmanlık hizmetleri veriyoruz.",
      }
    ],
    yaklasim: [
      "İdari yargının teknik özelliklerini dikkate alan uzman yaklaşım",
      "İdarenin takdir yetkisinin hukuki sınırlar içinde kullanılmasını sağlayan denetim",
      "Vatandaş-idare ilişkilerinde hukuk devleti ilkesinin korunması",
      "İdari uyuşmazlıklarda alternatif çözüm yollarının değerlendirilmesi"
    ],
    sikSorulanSorular: [
      {
        soru: "İdari işlemlere karşı dava açma süresi ne kadardır?",
        cevap: "İdari işlemlere karşı dava açma süresi, yazılı bildirim yapılmışsa tebliğ tarihinden, yazılı bildirim yoksa öğrenme tarihinden itibaren 60 gündür. Bazı özel kanunlarda farklı süreler de öngörülebilir.",
      },
      {
        soru: "Kamulaştırmasız el atma durumunda hangi haklar talep edilebilir?",
        cevap: "Kamulaştırmasız el atma durumunda, taşınmazın bedelinin tahsili veya el atmanın önlenmesi davaları açılabilir. Bedel davası açılması halinde, taşınmazın gerçek değeri ve yasal faizi talep edilebilir.",
      },
      {
        soru: "İmar planı değişikliğine karşı nasıl itiraz edilir?",
        cevap: "İmar planı değişikliği askıya çıkarıldıktan sonra, 30 gün içinde ilgili belediyeye itiraz edilmelidir. İtirazın reddi veya zımnen reddi halinde, 60 gün içinde idare mahkemesinde iptal davası açılabilir.",
      }
    ],
    avukatYorumu: "İdare hukuku alanında, vatandaşların hak ve özgürlüklerini korumak, idarenin hukuka uygun davranmasını sağlamak için çaba gösteriyoruz."
  },

  "icra": {
    id: "icra",
    title: "İcra ve İflas Hukuku",
    description: "Alacak takibi, icra takipleri, iflas süreçleri, konkordato ve yeniden yapılandırma gibi konularda alacaklı ve borçlulara uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    iconComponent: FiAlertCircle,
    hizmetler: [
      {
        title: "İcra Takipleri",
        description: "Genel haciz yolu ile takip, kambiyo senetlerine özgü haciz yolu ile takip, kiralanan taşınmazların tahliyesi ve rehnin paraya çevrilmesi yoluyla takip süreçlerinde uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "İflas Takipleri",
        description: "İflas, iflasın ertelenmesi, iflas tasfiyesi ve konkordato süreçlerinde hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      },
      {
        title: "Borç Yapılandırma",
        description: "Konkordato, yeniden yapılandırma ve borç tasfiye süreçlerinde borçlu ve alacaklı taraflara hukuki danışmanlık hizmetleri veriyoruz.",
      },
      {
        title: "İtirazların İptali ve Menfi Tespit Davaları",
        description: "İcra takiplerine yapılan itirazların iptali, borçlu olunmadığının tespiti ve istirdat davaları konusunda uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Haciz İşlemleri",
        description: "Haciz işlemlerinin uygulanması, hacze itiraz ve haczedilmezlik iddialarının ileri sürülmesi konularında hukuki danışmanlık hizmetleri sunuyoruz.",
      }
    ],
    yaklasim: [
      "Alacakların en kısa sürede ve en az masrafla tahsilini sağlayan stratejik yaklaşım",
      "Borçluların haklarını koruyan ve ödeme güçlerini dikkate alan yapılandırma çözümleri",
      "İcra ve iflas süreçlerinin ekonomik ve sosyal etkilerini gözeten dengeli uygulamalar",
      "Alternatif uyuşmazlık çözüm yöntemlerini değerlendiren uzlaşmacı bakış açısı"
    ],
    sikSorulanSorular: [
      {
        soru: "İcra takibine itiraz süresi ne kadardır?",
        cevap: "İcra takibine itiraz süresi, ödeme emrinin tebliğinden itibaren 7 gündür. Bu süre içinde yapılmayan itirazlar geçersizdir ve takip kesinleşir.",
      },
      {
        soru: "Haczedilemeyecek mallar nelerdir?",
        cevap: "Borçlunun ve ailesinin yaşamı için gerekli giyim eşyaları, mutfak aletleri, borçlunun mesleğini sürdürebilmesi için gereken alet ve edevat, borçlunun son bir aylık maaşının belirli bir kısmı gibi mallar kural olarak haczedilemez.",
      },
      {
        soru: "Konkordato nedir ve hangi durumlarda başvurulabilir?",
        cevap: "Konkordato, borçlunun borçlarını yeniden yapılandırarak ödeyebilmesini sağlayan bir iyileştirme yöntemidir. Mali durumu bozulmuş ancak iyileşme ümidi olan borçlular, konkordato talep edebilir. Konkordato süreci, geçici mühlet, kesin mühlet ve konkordatonun tasdiki aşamalarından oluşur.",
      }
    ],
    avukatYorumu: "İcra ve iflas hukuku alanında, alacaklıların haklarının korunması ve borçluların ekonomik varlıklarını sürdürebilmeleri arasında adil bir denge kurmaya çalışıyoruz."
  },

  "ceza": {
    id: "ceza",
    title: "Ceza Hukuku",
    description: "Soruşturma ve kovuşturma aşamalarında, ağır ceza davalarında, müdafilik ve vekillik hizmetleri sunuyor, hukuki haklarınızı en iyi şekilde savunmak için yanınızda duruyoruz.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745326466/ceza-hukuku_jeasuw.png",
    iconComponent: FiShield,
    hizmetler: [
      {
        title: "Müdafilik Hizmeti",
        description: "Soruşturma ve kovuşturma aşamalarında şüpheli ve sanık müdafiliği hizmeti sunuyoruz. Her aşamada haklarınızı korumak için yanınızdayız.",
      },
      {
        title: "Mağdur Vekilliği",
        description: "Suç mağdurlarına hukuki süreçlerde destek olarak, haklarını aramalarını sağlıyor ve adaletin tecelli etmesi için çalışıyoruz.",
      },
      {
        title: "Ağır Ceza Davaları",
        description: "Ağır ceza davalarında uzman savunma hizmeti sunuyor, delillerin toplanması ve değerlendirilmesi süreçlerinde etkin hukuki destek sağlıyoruz.",
      },
      {
        title: "İtiraz ve Kanun Yolları",
        description: "Mahkeme kararlarına karşı itiraz, istinaf ve temyiz süreçlerinde deneyimli hukuki destek veriyor, hukuka aykırı kararların düzeltilmesi için çalışıyoruz.",
      },
      {
        title: "Ceza İndirimleri ve Özel Savunma",
        description: "Etkin pişmanlık, iyi hal, haksız tahrik gibi ceza indirimi sebeplerinin en etkili şekilde değerlendirilmesi için özel savunma stratejileri geliştiriyoruz.",
      }
    ],
    yaklasim: [
      "Masumiyet karinesini temel alan savunma anlayışı",
      "Kişisel bilgilerin gizliliğine ve müvekkil haklarına saygılı yaklaşım",
      "Delillerin titizlikle değerlendirilmesi ve etkili savunma stratejileri",
      "Adil yargılanma hakkının tesisi için etkin hukuki mücadele"
    ],
    sikSorulanSorular: [
      {
        soru: "Gözaltına alındığımda haklarım nelerdir?",
        cevap: "Gözaltına alındığınızda, susma hakkı, müdafi yardımından yararlanma hakkı, yakınlarınıza haber verilmesi hakkı, gözaltı nedenini ve hakkınızdaki iddiaları öğrenme hakkı gibi temel haklarınız bulunmaktadır. Bu haklar kullanılırken bir avukatın yardımı büyük önem taşır.",
      },
      {
        soru: "İfade vermeden önce avukat ile görüşebilir miyim?",
        cevap: "Evet, ifade vermeden önce mutlaka bir avukat ile görüşmelisiniz. Müdafi yardımından yararlanma hakkı, temel haklarınız arasındadır ve bu hakkı kullanmanız son derece önemlidir. Avukatınız, ifade sırasında yanınızda bulunarak haklarınızı korumanıza yardımcı olacaktır.",
      },
      {
        soru: "Tutukluluğa itiraz nasıl yapılır?",
        cevap: "Tutukluluğa itiraz, tutuklama kararının verildiği tarihten itibaren 7 gün içinde, tutuklamanın devamına karar verilmesi halinde ise bu kararın verildiği tarihten itibaren her 30 günde bir itiraz edilebilir. İtiraz, bir üst mahkemeye yazılı olarak yapılır ve tutuklama şartlarının ortadan kalktığı veya baştan beri oluşmadığı gerekçeleriyle tahliye talep edilir.",
      }
    ],
    avukatYorumu: "Ceza hukuku alanında, bireylerin temel hak ve özgürlüklerini korumak, adil yargılanma hakkını tesis etmek ve müvekkillerimizin masumiyet karinesine saygı gösterilmesini sağlamak temel amacımızdır."
  },

  "mal-rejimi": {
    id: "mal-rejimi",
    title: "Mal Rejimi Hukuku",
    description: "Evlilik birliği içinde edinilen malların paylaşımı, edinilmiş mallara katılma rejimi, mal ayrılığı ve diğer mal rejimi türleri konusunda uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745328188/mal-rejimi_ykqpfx.png",
    iconComponent: FiFileText,
    hizmetler: [
      {
        title: "Mal Rejimi Davası",
        description: "Boşanma veya evliliğin iptali durumlarında mal rejiminin tasfiyesi ve hakkaniyetli paylaşım için hukuki destek sağlıyoruz.",
      },
      {
        title: "Katılma Alacağı Hesaplaması",
        description: "Edinilmiş mallara katılma rejimi kapsamında katılma alacağının doğru hesaplanması için uzman mali analiz ve hukuki danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Katkı Payı Davaları",
        description: "Diğer eşin malvarlığına yapılan katkıların hesaplanması ve katkı payı alacağının tahsili için hukuki destek sağlıyoruz.",
      },
      {
        title: "Mal Rejimi Sözleşmeleri",
        description: "Evlilik öncesi veya evlilik sırasında mal rejimi sözleşmelerinin hazırlanması ve müzakeresi konularında uzman hukuki danışmanlık hizmetleri veriyoruz.",
      },
      {
        title: "Aile Malları Ortaklığı",
        description: "Aile malları ortaklığı rejiminin kurulması, işletilmesi ve tasfiyesi konularında hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      }
    ],
    yaklasim: [
      "Mal varlığı haklarının korunmasında hassas ve detaylı yaklaşım",
      "Mali değerlerin doğru tespiti için uzman bilirkişi desteği",
      "Adil paylaşım ilkesini gözeten hukuki danışmanlık",
      "Her aile yapısına özel çözümler sunan esnek stratejiler"
    ],
    sikSorulanSorular: [
      {
        soru: "Evlilik öncesi edinilen mallar boşanmada paylaşıma tabi midir?",
        cevap: "Yasal mal rejimi olan edinilmiş mallara katılma rejiminde, evlilik öncesi edinilen mallar kişisel mal sayılır ve kural olarak paylaşıma tabi değildir. Ancak bu malların evlilik süresince değer artışı edinilmiş mal sayılabilir.",
      },
      {
        soru: "Miras yoluyla edinilen mallar boşanmada paylaşılır mı?",
        cevap: "Miras yoluyla edinilen mallar kişisel mal kapsamında değerlendirilir ve edinilmiş mallara katılma rejiminde paylaşıma tabi değildir. Ancak bu malların evlilik süresince değer artışından kaynaklanan katkı payı talep edilebilir.",
      },
      {
        soru: "Mal rejimi sözleşmesi nasıl yapılır?",
        cevap: "Mal rejimi sözleşmesi, noterde düzenleme veya onaylama şeklinde yapılmalıdır. Evlenmeden önce veya evlilik süresince her zaman yapılabilir. Sözleşme ile yasal mal rejimi dışında mal ayrılığı, paylaşmalı mal ayrılığı veya mal ortaklığı rejimleri seçilebilir.",
      }
    ],
    avukatYorumu: "Mal rejimi hukuku alanında, müvekkillerimizin emeklerinin karşılığını almaları ve adil bir paylaşım sağlanması için titizlikle çalışıyoruz."
  },
  
  "kira": {
    id: "kira",
    title: "Kira Hukuku",
    description: "Konut ve işyeri kiraları, kira sözleşmeleri, kira tespit davaları, tahliye ve kiracı-kiraya veren uyuşmazlıkları konularında uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745330607/miras-hukuku_pazr2l.png",
    iconComponent: FiKey,
    hizmetler: [
      {
        title: "Kira Sözleşmeleri",
        description: "Konut ve işyeri kira sözleşmelerinin hazırlanması, müzakeresi ve değişiklik yapılması konularında uzman hukuki danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Tahliye Davaları",
        description: "Kira bedelinin ödenmemesi, kiralananın kötü kullanımı, tahliye taahhüdü, kiralananın ihtiyacı gibi sebeplerle tahliye davalarında hukuki destek sağlıyoruz.",
      },
      {
        title: "Kira Tespit Davaları",
        description: "Kira bedelinin tespiti, artış oranlarının belirlenmesi ve yeniden değerleme davalarında uzman hukuki danışmanlık ve dava takibi hizmetleri veriyoruz.",
      },
      {
        title: "Kiracı Hakları Danışmanlığı",
        description: "Kiracıların haklarının korunması, haksız uygulamalara karşı yasal yollar ve depozito iadeleri konularında hukuki danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Kiraya Veren Hakları Danışmanlığı",
        description: "Kiraya verenlerin haklarının korunması, kira alacaklarının tahsili ve kiralananın korunması konularında uzman hukuki destek sağlıyoruz.",
      }
    ],
    yaklasim: [
      "Kiracı ve kiraya veren arasında dengeli yaklaşım",
      "Kira mevzuatındaki güncel değişiklikleri takip eden uzman danışmanlık",
      "Uyuşmazlıkların sulh yoluyla çözümüne öncelik veren arabuluculuk odaklı yaklaşım",
      "Mülkiyet haklarını ve barınma hakkını gözeten sosyal sorumluluk bilinci"
    ],
    sikSorulanSorular: [
      {
        soru: "Kira artış oranı ne kadar olabilir?",
        cevap: "Kira artış oranı, kira sözleşmesinde belirtilmişse bu oran üzerinden (TÜFE'nin altında olmak kaydıyla), belirtilmemişse Türkiye İstatistik Kurumu tarafından açıklanan Tüketici Fiyat Endeksi (TÜFE) on iki aylık ortalamalara göre değişim oranını geçmeyecek şekilde uygulanır.",
      },
      {
        soru: "Ev sahibi hangi durumlarda tahliye davası açabilir?",
        cevap: "Ev sahibi, kira bedelinin ödenmemesi, kiralananın kötü kullanımı, yazılı tahliye taahhüdünün ihlali, kendisinin veya yakınlarının konut/işyeri ihtiyacı, esaslı onarım/yeniden inşa gerekliliği gibi durumlarda tahliye davası açabilir.",
      },
      {
        soru: "Depozito ne zaman ve nasıl geri alınabilir?",
        cevap: "Depozito, kiralananın sözleşmede belirtilen koşullarda teslim edilmesi ve kiracının kira, elektrik, su, doğalgaz gibi borçlarının bulunmaması halinde, kiralananın tesliminden sonra en geç birkaç gün içinde iade edilmelidir. İade edilmemesi durumunda alacak davası açılabilir.",
      }
    ],
    avukatYorumu: "Kira hukuku alanında, kiracı ve kiraya veren arasındaki hassas dengeyi gözeterek, her iki tarafın da haklarının korunmasını amaçlayan adil çözümler üretiyoruz."
  },
  
  "miras": {
    id: "miras",
    title: "Miras Hukuku",
    description: "Miras paylaşımı, vasiyetname hazırlanması, miras davalarında iptal ve tenkis, veraset ilamı çıkarılması gibi miras hukukunun tüm alanlarında uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745330602/kira-hukuku_pzqewn.png",
    iconComponent: FiFile,
    hizmetler: [
      {
        title: "Miras Paylaşımı",
        description: "Mirasbırakanın terekesinin mirasçılar arasında hukuka uygun ve adil şekilde paylaşılması konusunda uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
      },
      {
        title: "Vasiyetname ve Miras Sözleşmeleri",
        description: "Vasiyetname hazırlanması, miras sözleşmelerinin düzenlenmesi ve bu belgelerin hukuki geçerliliğinin sağlanması konularında danışmanlık hizmetleri veriyoruz.",
      },
      {
        title: "Tenkis ve İptal Davaları",
        description: "Saklı pay ihlallerinde tenkis davaları ve geçersiz vasiyetnameler için iptal davaları açılması ve takibi konularında uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Miras Reddi ve Mirasın Resmî Tasfiyesi",
        description: "Mirasın reddi işlemleri, mirasın resmî tasfiyesi talebi ve mirasçılık belgesi çıkarılması konularında hukuki danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Uluslararası Miras Davaları",
        description: "Yabancılık unsuru içeren miras uyuşmazlıklarında uygulanacak hukukun belirlenmesi ve sınır ötesi miras paylaşımı konularında uzman hukuki destek veriyoruz.",
      }
    ],
    yaklasim: [
      "Aile bağlarını koruyarak adil miras dağılımını sağlayan uzlaşmacı yaklaşım",
      "Mirasbırakanın son arzularına saygı gösteren vasiyete uygun çözümler",
      "Karmaşık miras paylaşımlarında sistematik ve analitik yöntemler",
      "Mirasçıların haklarını korumada titiz ve ayrıntılı hukuki inceleme"
    ],
    sikSorulanSorular: [
      {
        soru: "Yasal mirasçılık payları nelerdir?",
        cevap: "Eş ve çocukların birlikte mirasçı olması durumunda eş 1/4, çocuklar 3/4 pay alır. Eş ve ana-babanın mirasçı olması halinde eş 1/2, ana-baba 1/2 pay alır. Sadece eşin mirasçı olması durumunda eş 3/4, mirasbırakanın büyük anne-babası 1/4 pay alır. Hiç mirasçı olmaması durumunda tüm miras devlete kalır.",
      },
      {
        soru: "Vasiyetname nasıl hazırlanır ve hangi şartlarda geçerlidir?",
        cevap: "Vasiyetname el yazılı, resmi veya sözlü şekilde düzenlenebilir. El yazılı vasiyetname, mirasbırakanın tamamını el yazısıyla yazıp imzalaması ve tarih atması ile geçerlidir. Resmi vasiyetname, noter huzurunda iki tanıkla düzenlenir. Sözlü vasiyet ise ancak olağanüstü durumlarda geçerlidir.",
      },
      {
        soru: "Miras davalarında zamanaşımı süreleri nelerdir?",
        cevap: "Miras hakkının genel zamanaşımı süresi 10 yıldır. Tenkis davası açma süresi, mirasçıların mirasın açıldığını ve tenkise tabi kazandırmayı öğrenmelerinden itibaren 1 yıl, her halükarda mirasın açılmasından itibaren 10 yıldır. Vasiyetname iptal davası ise iptal sebebinin öğrenilmesinden itibaren 1 yıl, her halükarda mirasın açılmasından itibaren 10 yıl içinde açılabilir."
      }
    ],
    avukatYorumu: "Miras hukuku alanında, aile bağlarını koruyarak, mirasbırakanın son arzularına saygı gösteren ve mirasçıların haklarını adil şekilde savunan bütüncül bir yaklaşım benimsiyoruz."
  },
  
  "icra-iflas": {
    id: "icra-iflas",
    title: "İcra ve İflas Hukuku",
    description: "Alacak takibi, icra takipleri, iflas süreçleri, konkordato ve yeniden yapılandırma gibi konularda alacaklı ve borçlulara uzman hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz.",
    mainImage: "https://res.cloudinary.com/ddzh9sngl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745330595/icra-ve-iflas_bvi315.png",
    iconComponent: FiDollarSign,
    hizmetler: [
      {
        title: "Alacak Takibi",
        description: "Ticari ve bireysel alacakların takibi, icra takip dosyalarının açılması ve yürütülmesi konularında uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Haciz İşlemleri",
        description: "Borçlunun malvarlığı üzerine haciz konulması, haciz uygulaması ve hacizli malların satışı konularında hukuki danışmanlık ve takip hizmetleri veriyoruz.",
      },
      {
        title: "İflas Takibi ve Yönetimi",
        description: "İflas takiplerinin başlatılması, iflas masasının yönetimi ve alacaklılar toplantılarının düzenlenmesi konularında uzman hukuki destek sağlıyoruz.",
      },
      {
        title: "Konkordato ve Yeniden Yapılandırma",
        description: "Finansal zorluktaki şirketler için konkordato başvurusu, yeniden yapılandırma ve borç tasfiye süreçlerinde danışmanlık hizmetleri sunuyoruz.",
      },
      {
        title: "Borçtan Kurtulma Yolları",
        description: "Borçlular için hukuki haklarını koruma, borca itiraz ve borçtan kurtulma stratejileri konularında uzman hukuki danışmanlık hizmetleri veriyoruz.",
      }
    ],
    yaklasim: [
      "Alacaklı haklarını en etkin şekilde koruyan stratejik takip yönetimi",
      "Borçlu haklarına saygılı ve insani değerleri gözeten uygulama",
      "İcra süreçlerinde risk analizi ve maliyet-fayda değerlendirmesi",
      "Alternatif uyuşmazlık çözüm yöntemlerini aktif kullanan uzlaşma odaklı yaklaşım"
    ],
    sikSorulanSorular: [
      {
        soru: "İcra takibi nasıl başlatılır?",
        cevap: "İcra takibi, alacaklının icra dairesine başvurarak takip talebinde bulunması ile başlar. Takip talebinde alacaklı ve borçlunun kimlik bilgileri, alacağın miktarı ve dayanağı belirtilir. İcra dairesi, borçluya bir ödeme emri gönderir ve borçlu 7 gün içinde borcunu ödemez veya itiraz etmezse takip kesinleşir.",
      },
      {
        soru: "İcra takibine itiraz nasıl yapılır?",
        cevap: "Borçlu, ödeme emrinin tebliğinden itibaren 7 gün içinde borca kısmen veya tamamen itiraz edebilir. İtiraz yazılı veya sözlü olarak icra dairesine yapılır. İtiraz üzerine takip durur ve alacaklının takibe devam edebilmesi için itirazın kaldırılması veya iptali davası açması gerekir.",
      },
      {
        soru: "Konkordato nedir ve nasıl başvurulur?",
        cevap: "Konkordato, borçlarını ödeyemeyen veya ödeyememe tehlikesi altında olan borçluların, alacaklılarla anlaşarak borçlarını yeniden yapılandırmasını sağlayan bir iyileştirme yöntemidir. Konkordato için borçlu, bağlı olduğu asliye ticaret mahkemesine başvurur ve mahkeme geçici mühlet kararı verebilir. Bu süre içinde borçlu aleyhine icra takibi yapılamaz.",
      }
    ],
    avukatYorumu: "İcra ve iflas hukuku alanında, alacaklıların haklarını korurken borçluların da ekonomik varlıklarını sürdürebilmelerini sağlayacak dengeli ve etik çözümler üretiyoruz."
  }
};

export default workAreasData; 