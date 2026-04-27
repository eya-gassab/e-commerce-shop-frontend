import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

const config: Record<OrderStatus, { label: string; className: string }> = {
  PENDING:    { label: "En attente",   className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  PAID:       { label: "Payé",         className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  PROCESSING: { label: "En cours",     className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  SHIPPED:    { label: "Expédié",      className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
  DELIVERED:  { label: "Livré",        className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  CANCELLED:  { label: "Annulé",       className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  REFUNDED:   { label: "Remboursé",    className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = config[status] ?? config.PENDING;
  return <Badge className={className}>{label}</Badge>;
}
