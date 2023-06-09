const  generateOTP=()=> {
  const length = 6;
  var result = "";
  var characters =
    "0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default generateOTP