import env from './env.js'

const { ASSETS_URL } = env
const languages = {
    es: { },
    en: { },
}

let lang = 'es'

const updatePageLang = () => {
    const translated = [...document.querySelectorAll('[translated]')]

    for (const element of translated) {
        const message = element.getAttribute('langMessage')

        element.innerText = !!languages[lang][message]
            ? languages[lang][message]
            : message
    }
}

const parseJSON = files => new Promise(resolve => {
    let langs = []

    files.forEach((file, index) => file.json().then((translate) => {
        langs.push(translate)
        index === files.length - 1 && resolve(langs)
    }))
})

const setLanguages = langs => {
    Object.keys(languages).forEach((key, index) => languages[key] = langs[index])
    updatePageLang()   
}

const initData = () => {
    const promises = Object.keys(languages).map(lang => fetch(`${ASSETS_URL}/i18n/${lang}.json`))

    Promise.all(promises)
        .then(files => parseJSON(files))
        .then(langs => setLanguages(langs))
        .catch(e => console.error('ERR LOAD TRANSLATE'))
}

const translateButton = document.querySelector('button#translate-button')

translateButton && translateButton.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es'
    updatePageLang()
})


initData()