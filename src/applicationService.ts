import {
  moveApplicationStatus,
  type ApplicationStatus,
} from "./applicationWorkflow";

export type Application = {
  id: string;
  company: string;
  status: ApplicationStatus;
};

const applications: Application[] = [];

export function createApplication(id: string, company: string): Application {
  const application: Application = {
    id,
    company,
    status: "draft",
  };

  applications.push(application);

  return application;
}

export function changeApplicationStatus(
  id: string,
  nextStatus: ApplicationStatus,
): Application {
  const application = applications.find((item) => item.id === id);

  if (!application) {
    throw new Error(`Application ${id} not found`);
  }

  const newStatus = moveApplicationStatus(application.status, nextStatus);

  application.status = newStatus;

  return application;
}

export function clearApplications(): void {
  applications.length = 0;
}
