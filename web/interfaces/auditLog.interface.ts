import type { Links, Meta } from "./pagination.interface";
import type { UserInterface } from "./user.interface";

export interface AuditLogInterface {
  id: number;
  user: UserInterface;
  action: string;
  entity_type: string;
  entity_id: number;
  color: string;
  icon: string;
  details: string;
  date: string;
  time: string;
}

export interface AuditLogInterfacePaginate {
  data: AuditLogInterface[];
  links: Links;
  meta: Meta;
}
