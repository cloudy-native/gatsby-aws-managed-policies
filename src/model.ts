import { Policy, Statement } from "@aws-sdk/client-iam";

export interface ActionDetail {
  ServiceName: string;
  Action: string;
  Description: string;
  AccessLevel: string;
  DocLink: string;
}

// export interface Policy {
//   PolicyName: string;
//   PolicyId: string;
//   Arn: string;
//   Path: string;
//   DefaultVersionId: string;
//   AttachmentCount: number;
//   PermissionsBoundaryUsageCount: number;
//   IsAttachable: boolean;
//   Description: string;
//   CreateDate: string;
//   UpdateDate: string;
//   Tags: string[];
// }

// export interface Statement {
//   Sid?: string
//   Effect: string;
//   Action?: string[];
//   NotAction?: string[];
//   Resource?: string[];
//   NotResource?: string[];
//   Condition?: any;
// }

export interface ManagedPolicy {
  policy: Policy;
  document: Statement[];
}

export interface PolicyPageNode {
  managedPolicy: ManagedPolicy;
  services: string[];
  actions: string[];
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
