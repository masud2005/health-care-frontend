"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
import z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res, "Response");
    // console.log(res, "Res");
    const result = await res.json();
    // console.log(result, "Result");

    const setCookieHeaders = res.headers.getSetCookie();
    // console.log(setCookieHeaders, "Set Cookie Headers");

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        // console.log(cookie);
        const parsedCookie = parse(cookie);
        // console.log(parsedCookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie["accessToken"];
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie["refreshToken"];
        }
      });
    } else {
      //   console.log("No Set-Cookie headers found");
      throw new Error("No Set-Cookie headers found");
    }
    // console.log(accessTokenObject, refreshTokenObject);

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieStore = await cookies();
    // console.log(cookieStore, "Cookie Store");

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    return result;
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
};