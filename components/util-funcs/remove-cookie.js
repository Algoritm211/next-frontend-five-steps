export function deleteCookie(name) {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c.replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
