"use client";

import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Same-origin requests — works on :3080 Docker and production without rebuild.
  plugins: [organizationClient()],
});
