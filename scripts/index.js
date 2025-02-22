const languages = {
    es: {},
    en: {},
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

const initData = () => {
    Promise.all(Object.keys(languages).map(lang => fetch(`/const/${lang}.json`)))
        .then(data => {
            return new Promise(async (resolve) => {
                let response = []

                for (const langFile of data) {
                    const file = await langFile.json()
                    response = [...response, file]
                }

                resolve(response)
            })
        })
        .then(langs => {
            Object.keys(languages).forEach((key, index) => {
                languages[key] = langs[index]
            })

            updatePageLang()
        })
        .catch((e) => console.error('ERR LOAD TRANSLATE'))
}

const translateButton = document.querySelector('button#translate-button')

translateButton && translateButton.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es'
    updatePageLang()
})


initData()