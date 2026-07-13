import { describe, expect, it } from "vitest";
import { moveApplicationStatus } from "../../src/applicationStatus";

describe("moveApplicationStatus", () => {
  it("permet de passer de draft à sent", () => {
    expect(moveApplicationStatus("draft", "sent")).toBe("sent");
  });

  it("permet de passer de sent à interview", () => {
    expect(moveApplicationStatus("sent", "interview")).toBe("interview");
  });

  it("permet de passer de interview à rejected", () => {
    expect(moveApplicationStatus("interview", "rejected")).toBe("rejected");
  });

  it("interdit de passer directement de draft à interview", () => {
    expect(() => moveApplicationStatus("draft", "interview")).toThrow(
      "Application must be sent before interview",
    );
  });

  it("interdit de modifier une candidature rejetée", () => {
    expect(() => moveApplicationStatus("rejected", "sent")).toThrow(
      "A rejected application cannot be changed",
    );
  });
});
