import Link from "next/link";
import Icon from "@/components/Icon";
import ToggleTheme from "./ToggleTheme";

const navigations = [
  {
    title: "Privacy Policy",
    url: "/",
  },
  {
    title: "License",
    url: "/",
  },
  {
    title: "API",
    url: "/",
  },
];

type FooterProps = {};

const Footer = ({}: FooterProps) => <footer className=""></footer>;

export default Footer;
