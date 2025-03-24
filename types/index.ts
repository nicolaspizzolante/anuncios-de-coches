export interface Announcement {
  id: string;
  make: string;
  model: string;
  trim: string;
  salePriceGross: number;
  firstRegistrationDate: string;
  mainImage: string;
  mileage: number;
  gearbox: "Automática" | "Manual";
}

export interface AnnouncementsTableProps {
  data: Announcement[]
}

export interface ApiResponse {
  announcements: {
    announcements: Array<{
      id: string;
      make: string;
      model: string;
      trim: string;
      salePriceGross: number;
      firstRegistrationDate: string;
      mainImage: string,
      details: {
        mileage: number;
        gearbox: string;
      };
    }>;
  };
}