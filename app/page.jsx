import AnnouncementsTable from '@/components/AnnouncementsTable'
import ThemeToggle from '@/components/ThemeToggle';

const HomePage = async () => {
  const res = await fetch('https://arval-uat-euw-appservice-portalapi.azurewebsites.net/api/Announcements/5?pageNumber=1&pageSize=500', { next: { revalidate: 3600 } });
  const responseData = await res.json();

  const filteredAnnouncements = responseData.announcements.announcements.map(item => ({
    id: item.id,
    make: item.make,
    model: item.model,
    trim: item.trim,
    salePriceGross: item.salePriceGross,
    firstRegistrationDate: item.firstRegistrationDate,
    mileage: item.details.mileage,
    gearbox: item.details.gearbox
  }));

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 w-full max-w-[1800px] mx-auto">
      <main className="w-full flex flex-col gap-2">
        <ThemeToggle />
        <h1 className='text-3xl font-bold text-center sm:text-left'>
          Nuestros coches
        </h1>
        <div className="w-full overflow-x-auto">
          <AnnouncementsTable data={filteredAnnouncements} />
        </div>
      </main>
    </div>
  );
}


export default HomePage