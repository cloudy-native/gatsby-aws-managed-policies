import {
  ActionDetail,
  ManagedPolicy,
  ServiceDetail,
} from '../model';

export function ensureArray(value: any) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export function servicesForPolicyStatement(statement): string[] {
  const services: string[] = [];

  if (statement.Action) {
    statement.Action.forEach(action => {
      services.push(action.split(':')[0]);
    });
  }

  if (statement.NotAction) {
    statement.NotAction.forEach(action=> {
      services.push(action.split(':')[0]);
    });
  }

  return [...new Set(services)]
}

export function servicesForPolicyDocument(document: any[]) {
  const services = document.map((statement) =>
    servicesForPolicyStatement(statement)
  );

  return [...new Set(services.flat())];
}

export function actionsForPolicyStatement(statement): string[] {
  const actions: string[] = [];

  if (statement.Action) {
    statement.Action.forEach(action => {
      actions.push(action);
    });
  }

  if (statement.NotAction) {
    statement.NotAction.forEach(action => {
      actions.push(action);
    });
  }

  return [...new Set(actions)];
}

export function actionsForPolicyDocument(document: any[]): string[] {
  const actions = document.map((statement) =>
    actionsForPolicyStatement(statement)
  );

  return [...new Set(actions.flat())];
}
