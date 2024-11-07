# Kedi Galerisi

## Proje Özellikleri

- Nuxt 3 ile geliştirildi.
- Kullanıcı girişi ve çıkışı.
- The Cat API kullanılarak rastgele kedi görsellerinin gösterimi.
- Görsel geçişlerinde rastgele efektler.

## Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin (.env dosyası proje içerisinde bulunuyor.)
CAT_API_KEY=your_api_key_here
CAT_API_URL=https://api.thecatapi.com/v1

# Projeyi başlatın
npm run dev
```

## Kullanıcı Girişi

Demo hesap bilgileri:
- Kullanıcı adı: `admin`
- Şifre: `password`

## Kullanılan Paketler

- @pinia/nuxt
- bootstrap
- bootstrap-icons
- vue-progressive-image
- sass

## Proje Yapısı

Repository pattern kullanılarak API istekler yönetildi. Nuxt proxy özelliği ile API key güvenliği sağlandı. State management için Pinia kullanıldı.
