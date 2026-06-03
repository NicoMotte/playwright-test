import { test } from "@playwright/test";
import {
  login,
  loginFailure,
  authMe,
  authMeRefresh,
  refresh,
} from "../../helpers/api_auth_helpers";

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

  await authMeRefresh(request, refreshBody);
});
