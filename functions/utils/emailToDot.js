const emailToDot = (email) => email.replace(/\./g, "DOT");
const emailFromDot = (email) => email.replace(/DOT/g, ".");

exports.emailToDot = emailToDot;
exports.emailFromDot = emailFromDot;
