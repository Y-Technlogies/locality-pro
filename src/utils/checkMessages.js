function telephoneCheck(str) {
  let isPhone =
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm.test(
      str
    );
  if (isPhone) {
    alert(
      "You cannot send the any contact details. This is against Locality's rules. "
    );
  } else return str;
}
export default telephoneCheck;
