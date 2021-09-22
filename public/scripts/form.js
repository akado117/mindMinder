const regForm = document.querySelector("#preRegForm");

const submitBtn = regForm.submitBtn;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = regForm.name.value;
  const email = regForm.email.value;
  const country = regForm.country.value;
  const month = regForm.month.value;
  const day = regForm.day.value;
  const year = regForm.year.value;
  const twitter = regForm.twitter.value;
  const instagram = regForm.instagram.value;
  const onlyfans = regForm.onlyfans.value;
  const consent = regForm.consent;
  console.log("clicked");

  const isValidated = validate({
    name,
    email,
    country,
    month,
    day,
    year,
    consent,
  });
  if (isValidated) {
    regForm.submit();
  }
});

function validate(values) {
  const mapping = {
    name: (value, area) => checkEmpty(value, area),
    email: (value) => checkEmail(value),
    country: (value, area) => checkSelect(value, area),
    year: (value, area) => checkSelect(value, area),
    month: (value, area) => checkSelect(value, area),
    day: (value, area) => checkSelect(value, area),
    instagram: (value, area) => checkEmpty(value, area),
    twitter: (value, area) => checkEmpty(value, area),
    onlyfans: (value, area) => checkEmpty(value, area),
    consent: (value, area) => checkTicked(value, area),
  };

  let validated = [];

  for (let i in values) {
    const [success, msg] = mapping[i](values[i], i);
    if (!success) {
      document.querySelector(".errorMsg").style.display = "block";
      document.querySelector(".errorMsg").textContent = msg;

      validated.push(false);
      console.log("not validated");
      break;
    } else {
      validated.push(true);
      console.log("is validated");
    }
  }
  if (validated.includes(false)) {
    return false;
  } else {
    document.querySelector(".errorMsg").style.display = "none";
    return true;
  }
}

function checkEmpty(value, area) {
  if (value === "") {
    console.log("An error Occurred");
    return [false, `Please insert your ${area}`];
  } else {
    console.log("success");
    return [true, ""];
  }
}

function checkEmail(value) {
  if (!value) {
    return [false, "Please insert your email address"];
  } else {
    if (!value.includes("@")) {
      return [false, "Please insert a valid email address"];
    } else {
      return [true, ""];
    }
  }
}

function checkSelect(value, area) {
  if (value == 0 || value == "") {
    return [false, `Please choose a ${area}`];
  } else {
    return [true, ""];
  }
}

function checkTicked(radio) {
  if (radio.checked) {
    return [true, ""];
  } else {
    return [false, "Please check the box"];
  }
}
