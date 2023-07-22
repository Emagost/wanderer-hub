'use client'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import React, { memo, useState } from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import useAuth from '../hooks/useAuth'
import { TCoords } from '../types/travel'
import MainButtons from '../Components/MainButtons'
import { useRouter } from 'next/navigation'

const AddTravel = () => {
  const router = useRouter()
  const [coords, setCoords] = useState<TCoords>()
  const [isAutocompleteEmpty, setIsAutocompleteEmpty] = useState({
    depart: true,
    arrive: true,
  })
  const { db, user } = useAuth()

  const handleGetCoords = (place: any, from: 'depart' | 'arrive') => {
    if (place) {
      const lat: number = place.geometry.location.lat()
      const lng: number = place.geometry.location.lng()
      setCoords(
        prevCoords =>
          ({
            ...prevCoords,
            [from]: {
              lat,
              lng,
            },
          } as TCoords),
      )
      setIsAutocompleteEmpty(prev => ({
        ...prev,
        [from]: false,
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, description, departDate, arrivesDate } = event.target as any
    if (user && !isAutocompleteEmpty.depart && !isAutocompleteEmpty.arrive) {
      const userRef = doc(db, 'users', user.uid)
      const travelsRef = collection(userRef, 'travels')
      try {
        const newTravelRef = await addDoc(travelsRef, {
          coords: coords,
          travelName: name.value,
          description: description.value,
          departDate: departDate.value,
          arrivesDate: arrivesDate.value,
        })

        const newTravelId = newTravelRef.id
        await updateDoc(newTravelRef, {
          id: newTravelId,
        })

        router.push(`/userProfile/${user.uid}`)
      } catch (error) {
        console.error('Error: ', error)
      }
    }
  }

  return (
    <section className="bg-gray-900 h-screen">
      {user && (
        <>
          <MainButtons href={`userProfile/${user?.uid}`} />
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new travel
            </h2>
            <form onSubmit={event => handleSubmit(event)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Travel name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                    placeholder="Type travel name"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="departfrom"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Depart from
                  </label>
                  <ReactGoogleAutocomplete
                    apiKey={process.env.API_KEY_GOOGLE}
                    onPlaceSelected={place => handleGetCoords(place, 'depart')}
                    options={{
                      types: ['(regions)'],
                    }}
                    placeholder="Enter a location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                  />
                  {isAutocompleteEmpty.depart && (
                    <p className="text-red-600 text-sm mt-1">
                      Please select a location for departure.
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Arriveat"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Arrive at
                  </label>
                  <ReactGoogleAutocomplete
                    apiKey={process.env.API_KEY_GOOGLE}
                    onPlaceSelected={place => handleGetCoords(place, 'arrive')}
                    options={{
                      types: ['(regions)'],
                    }}
                    placeholder="Enter a location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                  />

                  {isAutocompleteEmpty.arrive && (
                    <p className="text-red-600 text-sm mt-1">
                      Please select a location for arrival.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date from depart
                  </label>
                  <input
                    id="depart-date"
                    name="departDate"
                    placeholder="Select a date"
                    type="date"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                  />
                </div>
                <div>
                  <label
                    htmlFor="item-weight"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date from arrives
                  </label>
                  <input
                    id="arrives-date"
                    name="arrivesDate"
                    placeholder="Select a date"
                    required
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    maxLength={1000}
                    id="description"
                    name="description"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:"
                    placeholder="Tell us about your travel, you can add a differents places to visit"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-buttonPrimary hover:bg-buttonPrimaryHover rounded-lg"
              >
                Add travel
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

export default memo(AddTravel)
