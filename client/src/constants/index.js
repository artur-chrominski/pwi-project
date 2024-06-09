import { facebook, linkedin, twitter } from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "home", 
  },
  {
    id: "contact",
    title: "contact", 
  },
  {
    id: "reviews",
    title: "reviews", 
  },

];

export const footerLinks = [
  {
    title: "Więcej linków", 
    links: [
      {
        name: "O nas", 
        link: "#home",
      },
      {
        name: "Opinie", 
        link: "#reviews",
      },
      {
        name: "Kontakt", 
        link: "#contact",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];
