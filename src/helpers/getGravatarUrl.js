import md5 from "md5";

export default function getGravatarUrl(email, size) {
  const url =
    `https://www.gravatar.com/avatar/${md5(email)}/?d=wavatar` + (size && `&s=${size}`);
 // console.log('url=', url, email, !!email);

  if (email) {
		return url;
  } else { throw new Error("DEV-ERR: userData must contain email") };
}
