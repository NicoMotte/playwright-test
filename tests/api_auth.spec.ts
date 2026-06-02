import { test, expect, APIRequestContext } from "@playwright/test";

// ==================================================
// LOGIN FUNCTION
// ==================================================

async function login(request: APIRequestContext) {
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

async function loginFailure(request: APIRequestContext) {
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

async function authMe(request: APIRequestContext, loginBody: any) {
  const meResponse = await request.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: loginBody.accessToken,
    },
  });

  expect(meResponse.status()).toBe(200);

  const meBody = await meResponse.json();

  expect(meBody.username).toBe("emilys");

  if (loginBody.id !== undefined) {
    expect(meBody.id).toBe(loginBody.id);
  }

  return meBody;
}

// ==================================================
// TOKEN REFRESH FUNCTION
// ==================================================

async function refresh(request: APIRequestContext, loginBody: any) {
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

// ==================================================
// API login success with Playwright
// ==================================================

test("API login success with Playwright", async ({ request }) => {
  await login(request);
});

// ==================================================
// API login failure with Playwright
// ==================================================

test("API login failure with Playwright", async ({ request }) => {
  await loginFailure(request);
});

// ==================================================
// API auth/me with token
// ==================================================

test("API auth/me with token", async ({ request }) => {
  const loginBody = await login(request);
  await authMe(request, loginBody);
});

// ==================================================
// API auth/me with token then token refresh
// ==================================================

test("API auth/me with token then token refresh", async ({ request }) => {
  const loginBody = await login(request);

  await authMe(request, loginBody);

  const refreshBody = await refresh(request, loginBody);

  await authMe(request, refreshBody); // Only occurrence of authMe using the body of the refresh request. Had to add if (loginBody.id !== undefined) in the authMe function. Works but not very clean
});
