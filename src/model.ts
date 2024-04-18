import { ManagedPolicyDetail, Policy } from "@aws-sdk/client-iam";

export interface ActionDetail {
  service: string
  ServiceName: string;
  Action: string;
  Description: string;
  AccessLevel: string;
  DocLink: string;
}

export interface PolicyMetadata {
  policy: Policy;
  document: any
}

export interface PolicyNode {
  policy: Policy;
  services: string[];
  actions: string[];
  document: any
}

export interface ServiceDetail {
  ServiceShortName: string;
  ServiceName: string;
  Actions: string;
  ARNFormat: string;
  ARNRegex: string;
  conditionKeys: string;
  HasResource: string;
  DocLink: string;
}
