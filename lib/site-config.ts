export const siteConfig = {
    name: "Seth Makori",
    title: "CodeWithSeth - Full-Stack Developer & Digital Creator",
    description: "Full-stack developer specializing in web development, SEO optimization, graphic design, and digital marketing.",
    url: "https://codewithseth.co.ke",

    contact: {
        email: "bellarinseth@gmail.com",
        phone: {
            primary: "+254 114 627 400",
            secondary: "+254 759 433 906",
        },
        location: "Kenya",
    },

    social: {
        twitter: {
            url: "https://x.com/SethBellarin1",
            handle: "@SethBellarin1",
        },
        instagram: {
            url: "https://www.instagram.com/bellarinseth2020/",
            handle: "@bellarinseth2020",
        },
        facebook: {
            url: "https://www.facebook.com/seth.mose.37/",
            handle: "seth.mose.37",
        },
        linkedin: {
            url: "https://www.linkedin.com/in/seth-makori",
            handle: "seth-makori",
        },
        github: {
            url: "https://github.com/ondieki1237",
            handle: "@ondieki1237",
        },
        youtube: {
            url: "https://www.youtube.com/@sethbellarin9902",
            handle: "@sethbellarin9902",
        },
    },
} as const

export type SiteConfig = typeof siteConfig
