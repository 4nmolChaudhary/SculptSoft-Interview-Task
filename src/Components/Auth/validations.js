const passwordValidation = password => {
  if (password.length === 0) return { error: true, message: 'Password is required !' }
  if (password.length < 6) {
    return { error: true, message: 'Password must be 6 characters long !' }
  } else return { error: false, message: 'Password is valid' }
}

const nameValidation = name => {
  if (name.length === 0) return { error: true, message: 'User Name is required !' }
  else return { error: false, message: 'Name is valid' }
}

export { passwordValidation, nameValidation }
