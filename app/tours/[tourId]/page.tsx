import { notFound } from 'next/navigation';

import TourInfoSection from "@/components/shared/sections/tourInfoSection";
import TourMainSection from "@/components/shared/sections/tourMainSection";
import { PrevPage } from "@/components/shared/prevPage";

import dataTours from "@/data/dataTours";

interface Params {
  params: {
    tourId: string;
  };
}

export async function generateStaticParams() {
  return dataTours.map((tour) => ({
    tourId: tour.page.toLowerCase(),
  }));
}

export default async function TourDetails({ params }: Params) {
  const { tourId } = params;
  const tour = dataTours.find((tour) => tour.page.toLowerCase() === tourId);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <TourMainSection tour={tour} />
      <TourInfoSection tour={tour} />
      <PrevPage />
    </>
  );
}