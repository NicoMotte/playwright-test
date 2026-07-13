export type ApplicationStatus = "draft" | "sent" | "interview" | "rejected";

export function moveApplicationStatus(
  currentStatus: ApplicationStatus,
  nextStatus: ApplicationStatus,
): ApplicationStatus {
  if (currentStatus === "rejected") {
    throw new Error("A rejected application cannot be changed");
  }

  if (currentStatus === "draft" && nextStatus === "interview") {
    throw new Error("Application must be sent before interview");
  }

  return nextStatus;
}
