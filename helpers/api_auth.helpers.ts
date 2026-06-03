import { expect, APIRequestContext } from "@playwright/test";

// ==================================================
// LOGIN FUNCTION
// ==================================================

export async function login(request: APIRequestContext): Promise<LoginBody> {
  const response = await request.post("https://dummyjson.com/auth/login", {
    data: {
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30,
    },
  });

  expect(response.status()).toBe(200);

  const loginBody = await response.json();

  expect(loginBody.username).toBe("emilys");
  expect(loginBody.accessToken).toBeTruthy();
  expect(loginBody.refreshToken).toBeTruthy();

  return loginBody;
}

// ==================================================
// LOGIN FAILURE FUNCTION
// ==================================================

export async function loginFailure(request: APIRequestContext) {
  const response = await request.post("https://dummyjson.com/auth/login", {
    data: {
      username: "emilys",
      password: "wrongpassword",
      expiresInMins: 30,
    },
  });

  expect(response.status()).toBe(400);

  const loginBody = await response.json();
  expect(loginBody.accessToken).toBeFalsy();
  expect(loginBody.message).toBe("Invalid credentials");

  return loginBody;
}

// ==================================================
// AUTHME FUNCTION
// ==================================================

type LoginBody = {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
};

export async function authMe(request: APIRequestContext, loginBody: LoginBody) {
  const meResponse = await request.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: loginBody.accessToken,
    },
  });

  expect(meResponse.status()).toBe(200);

  const meBody = await meResponse.json();

  expect(meBody.username).toBe("emilys");

  expect(meBody.id).toBe(loginBody.id);

  return meBody;
}

// ==================================================
// AUTHME REFRESH FUNCTION
// ==================================================

type RefreshBody = {
  accessToken: string;
  refreshToken: string;
};

export async function authMeRefresh(
  request: APIRequestContext,
  refreshBody: RefreshBody,
): Promise<RefreshBody> {
  const meResponse = await request.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: refreshBody.accessToken,
    },
  });

  expect(meResponse.status()).toBe(200);

  const meBody = await meResponse.json();

  expect(meBody.username).toBe("emilys");

  return meBody;
}

// ==================================================
// TOKEN REFRESH FUNCTION
// ==================================================

export async function refresh(
  request: APIRequestContext,
  loginBody: LoginBody,
) {
  const refreshResponse = await request.post(
    "https://dummyjson.com/auth/refresh",
    {
      data: {
        refreshToken: loginBody.refreshToken,
        expiresInMins: 30,
      },
    },
  );

  expect(refreshResponse.status()).toBe(200);

  const refreshBody = await refreshResponse.json();

  expect(refreshBody.accessToken).toBeTruthy();
  expect(refreshBody.refreshToken).toBeTruthy();

  return refreshBody;
}
