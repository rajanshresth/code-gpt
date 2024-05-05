import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/login");
    return Response.redirect(url);
  }
});
