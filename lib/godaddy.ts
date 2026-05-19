import axios from "axios";

const godaddyBase =
  process.env.GODADDY_ENV === "production"
    ? "https://api.godaddy.com"
    : "https://api.ote-godaddy.com";

export const godaddyClient = axios.create({
  baseURL: godaddyBase,
  headers: {
    Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
  },
});
