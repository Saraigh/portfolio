const DEVELOPMENT = Object.freeze({
    ASSETS_URL: '/assets/',
    HOSTNAME:   'localhost',
})

const PRODUCTION = Object.freeze({
    ASSETS_URL: '/portfolio/assets/',
    HOSTNAME:   'saraigh.github.io',
})

let env = {...DEVELOPMENT}

window.location.hostname === PRODUCTION.HOSTNAME && (env = {...PRODUCTION})


export default env