export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    // console.log(formData.get("name"), "FormData");

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
      },
    };
    // console.log(registerData);
    const newFormData = new FormData();
    // console.log(newFormData);
    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      "http://localhost:5000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      },
    ).then((res) => res.json());
    console.log(res, "Response");
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};
