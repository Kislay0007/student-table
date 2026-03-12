export function validateStudent({ name, email, age }) {
  const errors = {};
  if (!name || name.trim() === "") errors.name = "Name is required";
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!age || isNaN(Number(age))) {
    errors.age = "Age must be a number";
  }
  return errors;
}
