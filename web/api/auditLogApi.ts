import { type AuditLogInterfacePaginate } from "~/interfaces/auditLog.interface";

export const getAuditLogs = async (page: number = 1): Promise<AuditLogInterfacePaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<AuditLogInterfacePaginate>(`${config.public.apiUrl}/audit_logs?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as AuditLogInterfacePaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
