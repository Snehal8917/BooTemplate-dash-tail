import {
  Book,
  ClipBoard,
  DashBoard,
  Graph,
  Cars,
  User,
  Employees,
  Diamond,
  ClipBoard2,
  TaskList,
  Files,
} from "@/components/svg";

export const menusConfig = {
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: "menu",
      },

      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
        // role: ["superAdmin", "company", "employee"],
      },
      {
        title: "Reports",
        icon: Graph,
        href: "/reports",
        // role: ["company"],
      },
      {
        title: "Invoice",
        icon: Files,
        // role: ["company", "employee"],
        child: [
          {
            title: "Create Invoice",
            href: "/create-invoice",
            icon: ClipBoard,
            // role: ["company", "employee"],
          },
          {
            title: "Invoice Details",
            href: "/invoice-details",
            icon: ClipBoard,
            // role: ["company", "employee"],
          },
          {
            title: "Invoice List",
            href: "/invoice-list",
            icon: ClipBoard,
            // role: ["company", "employee"],
          },
        ],
      },
    ],
  },
};

// export const menusCompanyConfig = {
//   sidebarNav: {
//     company: [
//       {
//         isHeader: true,
//         title: "menu",
//       },
//       {
//         title: "Dashboard",
//         icon: DashBoard,
//         href: "/dashboard",
//       },
//       {
//         title: "Employees",
//         icon: Graph,
//         href: "/employee-list",
//       },
//       {
//         title: "Job Card",
//         icon: ClipBoard,
//         href: "/jobcard-list",
//       },
//       {
//         title: "Customers",
//         icon: ClipBoard,
//         href: "/customer-list",
//       },
//       {
//         title: "Insurance Companies",
//         icon: DashBoard,
//         href: "/insurance-list",
//       },
//       {
//         title: "Car",
//         icon: Graph,
//         href: "/car-lists",
//       },
//     ],
//   },
// };

// export const menusAdminConfig = {
//   sidebarNav: {
//     admin: [
//       {
//         isHeader: true,
//         title: "menu",
//       },
//       {
//         title: "Dashboard",
//         icon: DashBoard,
//         href: "/dashboard",
//       },
//       {
//         title: "Companies",
//         icon: Graph,
//         href: "/admin-company-list",
//       },
//     ],
//   },
// };
