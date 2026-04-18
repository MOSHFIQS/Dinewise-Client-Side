import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const statsServerService = {
     getAdminStats: () =>
          apiFetchServerMain("/stats/admin", {
               method: "GET",
          }),

     getChefStats: () =>
          apiFetchServerMain("/stats/chef", {
               method: "GET",
          }),

     getCustomerStats: () =>
          apiFetchServerMain("/stats/customer", {
               method: "GET",
          }),
};
