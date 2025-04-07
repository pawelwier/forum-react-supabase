export function isAuthor(post, user) {
  const { profiles: { email } } = post

  return user.email == email
}