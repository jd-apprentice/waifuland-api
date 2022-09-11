# 🎲 WAIFULAND-API

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

![WaifuLand](https://user-images.githubusercontent.com/68082746/155921172-311bb682-cfed-494f-89c5-371e22ac25a6.gif)

## 🗒 About the project

- The project is a API-REST which gives random waifu images, they are uploaded to cloudinary and their public url is stored in mongodb
- Learning throught documentation and breaking things

## 🚧 Routes

- `GET` Grab a random image `api/images`
- `GET` Grab an array of random images `api/images?size=<Size>`

## 📖 Status

- Want to see how the project is going? check this -> [Issue](https://github.com/jd-apprentice/waifuland-api/issues/3)

## 🌐 Can I use the api?

- Yes! is currently being hosted in Render -> [Get waifu](https://waifuland-api.onrender.com/api/images/random)

## 📚 Stack

- Nodejs
- Express
- Typescript
- Multer
- Cloudinary
- Render
- Mongodb
- Mongoose

## 🏗️ Build the project locally

```
Install yarn if you dont have it already

>> npm install --global yarn

Fill the fields in the .env.example

# App port
PORT=

# Your mongodb uri
DB_HOST=

# Your secret hash for signing petitions
TOKEN=

# Your cloudinary information
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_SECRET=
CLOUDINARY_URL=

>> cp .env.example .env.development

>> yarn install

>> yarn dev
```

## 🧱 Structure

- User enters the page
  ![Login](https://user-images.githubusercontent.com/68082746/164032923-64c5d286-e232-478f-b121-39d28b71b416.png)
- Once user is logged into the page
  ![Token](https://user-images.githubusercontent.com/68082746/164033037-6191489e-3561-46b3-a0c4-7324faf9abb7.png)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://portfolio-jd.vercel.app/"><img src="https://avatars.githubusercontent.com/u/68082746?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan Dyallo</b></sub></a><br /><a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Code">💻</a> <a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Tests">⚠️</a> <a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Documentation">📖</a> <a href="#maintenance-jd-apprentice" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
