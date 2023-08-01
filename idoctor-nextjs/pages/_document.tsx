import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    content="Neo brutalism inspired UI kit with 362 Pages and 463 symbols"
                    name="Bruddle - Neo brutalism Coded UI kit for SaaS Dashboards"
                />
                <meta
                    content="Bruddle - Neo brutalism Coded UI kit for SaaS Dashboards"
                    property="og:title"
                />
                <meta
                    content="Neo brutalism inspired UI kit with 362 Pages and 463 symbols"
                    property="og:description"
                />
                <meta
                    content="%PUBLIC_URL%/fb-og-image.jpg"
                    property="og:image"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/whiteuistore/products/bruddle-coded-ui-kit"
                />
                <meta
                    property="og:site_name"
                    content="Bruddle - Neo brutalism Coded UI kit for SaaS Dashboards"
                />
                <meta
                    content="Bruddle - Neo brutalism Coded UI kit for SaaS Dashboards"
                    property="twitter:title"
                />
                <meta
                    content="Neo brutalism inspired UI kit with 362 Pages and 463 symbols"
                    property="twitter:description"
                />
                <meta
                    content="%PUBLIC_URL%/twitter-card.jpg"
                    property="twitter:image"
                />
                <meta property="og:type" content="Article" />
                <meta content="summary" name="twitter:card" />
                <meta name="twitter:site" content="@ui8" />
                <meta name="twitter:creator" content="@ui8" />
                <meta property="fb:admins" content="132951670226590" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
