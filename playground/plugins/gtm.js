const gtm = defineNuxtPlugin(async (nuxtApp) => {

    const gtag = `
         window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W95M37CTNW');
    `

    useHead({
        script: [
            {src: 'https://www.googletagmanager.com/gtag/js?id=G-W95M37CTNW', async: true},
            {
                innerHTML: gtag
            }
        ]
    })
})

export default gtm



