import AnnouncementsTable from '@/components/AnnouncementsTable';
import ThemeToggle from '@/components/ThemeToggle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Announcement, ApiResponse } from '@/types/index'

const fetchAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const res = await fetch('https://arval-uat-euw-appservice-portalapi.azurewebsites.net/api/Announcements/5?pageNumber=1&pageSize=500');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const responseData: ApiResponse = await res.json();

    console.log('Announcements:', responseData.announcements.announcements);

    return responseData.announcements.announcements.map(item => ({
      id: item.id,
      make: item.make,
      model: item.model,
      trim: item.trim,
      salePriceGross: item.salePriceGross,
      firstRegistrationDate: item.firstRegistrationDate,
      mainImage: item.mainImage,
      mileage: item.details.mileage,
      gearbox: item.details.gearbox === "Automatique" ? "Automática" : "Manual"
    }));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

const HomePage = async () => {
  let filteredAnnouncements: Announcement[] = [];
  let errorMessage = '';

  try {
    filteredAnnouncements = await fetchAnnouncements();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 w-full max-w-[1800px] mx-auto">
      <main className="w-full flex flex-col gap-2">
        <ThemeToggle />
        <h1 className='text-3xl font-bold text-center sm:text-left'>
          Anuncios de coches
        </h1>

        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Hubo un error:</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : (
          <div className="w-full overflow-x-auto">
            <AnnouncementsTable data={filteredAnnouncements} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;