export type VpsPlan = {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  savePercent: number;
  ram: string;
  disk: string;
  specs: string;
};

export const vpsPlans: VpsPlan[] = [
  {
    id: "vps-4gb",
    name: "Windows 4GB VPS",
    originalPrice: 18,
    price: 10,
    savePercent: 44,
    ram: "4GB",
    disk: "40GB",
    specs: `CPU – 2 vCore
RAM – 4GB
Bandwidth – 2TB
Disk Space – 40GB
- Dedicated IP
- Remote Desktop Access
- Windows Server
- Setup Time 24 to 48 Hours
- Location - US & UK
- Non-Refundable VPS`,
  },
  {
    id: "vps-8gb",
    name: "Windows 8GB VPS",
    originalPrice: 32,
    price: 20,
    savePercent: 38,
    ram: "8GB",
    disk: "60GB",
    specs: `CPU – 4 vCores
RAM – 8GB
Bandwidth – 5TB
Disk Space – 60GB
- Dedicated IP
- Remote Desktop Access
- Windows Server
- Setup Time 24 to 48 Hours
- Location - US & UK
- Non-Refundable VPS`,
  },
  {
    id: "vps-16gb",
    name: "Windows 16GB VPS",
    originalPrice: 45,
    price: 30,
    savePercent: 33,
    ram: "16GB",
    disk: "120GB",
    specs: `CPU – 6 vCores
RAM – 16GB
Bandwidth – 5TB
Disk Space – 120GB
- Dedicated IP
- Remote Desktop Access
- Windows Server
- Setup Time 24 to 48 Hours
- Location - US & UK
- Non-Refundable VPS`,
  },
  {
    id: "vps-32gb",
    name: "Windows 32GB VPS",
    originalPrice: 60,
    price: 45,
    savePercent: 25,
    ram: "32GB",
    disk: "240GB",
    specs: `CPU – 8 vCores
RAM – 32GB
Bandwidth – 10TB
Disk Space – 240GB
- Dedicated IP
- Remote Desktop Access
- Windows Server
- Setup Time 24 to 48 Hours
- Location - US & UK
- Non-Refundable VPS`,
  },
];

export const vpsPlansById = Object.fromEntries(
  vpsPlans.map((plan) => [plan.id, plan])
) as Record<string, VpsPlan>;
