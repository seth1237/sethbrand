export const siteConfig = {
  name: "Seth Makori",
  handle: "codewithseth",
  title: "Seth Makori | Web Developer & SEO in Nairobi",
  description:
    "Websites that get found, and businesses that get customers. Web development, SEO, graphic design, and digital marketing in Nairobi, Kenya.",
  url: "https://codewithseth.co.ke",
  moreDesigns: "https://drive.google.com/drive/folders/1j4-c0WQn9YyJMFPLAIhJrah7pJ_us8Xy?usp=drive_link",

  contact: {
    email: "info@elevatehub.co.ke",
    phone: {
      primary: "+254 114 627 400",
      tel: "+254114627400",
    },
    whatsapp: {
      number: "254114627400",
      url: "https://wa.me/254114627400?text=Hi%20Seth%2C%20I%27d%20like%20to%20talk%20about%20a%20project",
    },
    booking: "https://cal.com/seth-makori",
    location: "Nairobi, Kenya",
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
