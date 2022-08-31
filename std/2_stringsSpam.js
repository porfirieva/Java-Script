function checkSpam(str) {
  let x = str.toLowerCase()
  if (x.includes('xxx') || x.includes('viagra')) {
    return true
  } 
  return false
}