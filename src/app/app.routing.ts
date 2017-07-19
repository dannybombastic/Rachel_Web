import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { RetiroComponent } from "./retiros/retiro.component";
import { SemanaComponent } from "./semanario/semanario.component";
import { AppComponent } from "./app.component";

export const appRoutes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "retiro", component: RetiroComponent },
  { path: "semanario", component: SemanaComponent },
  { path: "**", component: HomeComponent } // por error
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
